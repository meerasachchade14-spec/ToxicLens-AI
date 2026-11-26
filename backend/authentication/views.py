
import json
from datetime import datetime, timezone

from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from pymongo.errors import DuplicateKeyError

from .mongo import (
    get_users,
    get_pending_registrations,
    get_password_resets,
)
from .validators import (
    normalize_email,
    validate_register_fields,
    validate_login_fields,
    is_valid_email,
)
from .email_service import send_otp_email
from .utils import (
    generate_otp,
    hash_otp,
    check_otp,
    otp_expiry,
    is_expired,
    hash_password,
    verify_password,
    create_jwt,
)


def response(message, status=200, **extra):
    return JsonResponse(
        {"message": message, **extra},
        status=status,
    )


def get_request_data(request):
    try:
        return json.loads(request.body.decode("utf-8"))
    except (json.JSONDecodeError, UnicodeDecodeError):
        return None


def require_post(request):
    if request.method != "POST":
        return response("Method not allowed", 405)
    return None


# --------------------------------------------------
# REGISTER
# --------------------------------------------------

@csrf_exempt
def register(request):
    method_error = require_post(request)
    if method_error:
        return method_error

    data = get_request_data(request)
    if data is None:
        return response("Invalid request data", 400)

    valid, error = validate_register_fields(data)
    if not valid:
        return response(error, 400)

    name = data["name"].strip()
    email = normalize_email(data["email"])
    password = data["password"]

    # Admin email is reserved.
    if email == settings.ADMIN_EMAIL:
        return response(
            "This email is reserved for admin",
            403,
        )

    users = get_users()

    # Prevent duplicate registration, regardless of name/password.
    if users.find_one({"email": email}):
        return response(
            "This email is already registered",
            409,
        )

    otp = generate_otp()

    pending = {
        "name": name,
        "email": email,
        "password_hash": hash_password(password),
        "otp_hash": hash_otp(otp),
        "expires_at": otp_expiry(),
        "attempts": 0,
        "created_at": datetime.now(timezone.utc),
    }

    get_pending_registrations().replace_one(
        {"email": email},
        pending,
        upsert=True,
    )

    try:
        send_otp_email(email, otp, "registration")

    except Exception as exc:
        get_pending_registrations().delete_one(
            {"email": email}
        )

        print("Registration email error:", str(exc))

        return response(
            "Unable to send OTP email. Please try again.",
            500,
        )

    return response(
        "Registration OTP sent successfully",
        200,
        email=email,
    )


# --------------------------------------------------
# VERIFY REGISTRATION OTP
# --------------------------------------------------

@csrf_exempt
def verify_register_otp(request):
    method_error = require_post(request)
    if method_error:
        return method_error

    data = get_request_data(request)
    if data is None:
        return response("Invalid request data", 400)

    email = normalize_email(data.get("email", ""))
    otp = data.get("otp", "").strip()

    if not email or not otp:
        return response("Please fill out all fields", 400)

    if len(otp) != 6 or not otp.isdigit():
        return response("OTP must be 6 digits", 400)

    pending_collection = get_pending_registrations()
    pending = pending_collection.find_one(
        {"email": email}
    )

    if not pending:
        return response(
            "Registration not found. Please register again.",
            404,
        )

    if is_expired(pending.get("expires_at")):
        pending_collection.delete_one({"email": email})
        return response("OTP expired. Please register again.", 400)

    if pending.get("attempts", 0) >= settings.OTP_MAX_ATTEMPTS:
        pending_collection.delete_one({"email": email})
        return response(
            "Too many incorrect attempts. Please register again.",
            429,
        )

    if not check_otp(otp, pending["otp_hash"]):
        pending_collection.update_one(
            {"email": email},
            {"$inc": {"attempts": 1}},
        )
        return response("Incorrect OTP", 400)

    users = get_users()

    user = {
        "name": pending["name"],
        "email": email,
        "password_hash": pending["password_hash"],
        "role": "user",
        "verified": True,
        "created_at": datetime.now(timezone.utc),
    }

    try:
        users.insert_one(user)

    except DuplicateKeyError:
        pending_collection.delete_one({"email": email})
        return response(
            "This email is already registered",
            409,
        )

    pending_collection.delete_one({"email": email})

    return response(
        "Email verified and registration successful",
        201,
    )


# --------------------------------------------------
# LOGIN
# --------------------------------------------------

@csrf_exempt
def login(request):
    method_error = require_post(request)
    if method_error:
        return method_error

    data = get_request_data(request)
    if data is None:
        return response("Invalid request data", 400)

    valid, error = validate_login_fields(data)
    if not valid:
        return response(error, 400)

    email = normalize_email(data["email"])
    password = data["password"]

    user = get_users().find_one({"email": email})

    if not user:
        return response(
            "Account not found. Please register.",
            404,
        )

    if not user.get("verified", False):
        return response(
            "Please verify your email before logging in",
            403,
        )

    if not verify_password(
        password,
        user.get("password_hash", ""),
    ):
        return response("Incorrect password", 401)

    token = create_jwt(user)

    return response(
        "Login successful",
        200,
        token=token,
        user={
            "id": str(user["_id"]),
            "name": user["name"],
            "email": user["email"],
            "role": user.get("role", "user"),
        },
    )


# --------------------------------------------------
# FORGOT PASSWORD - SEND OTP
# --------------------------------------------------

@csrf_exempt
def forgot_password(request):
    method_error = require_post(request)
    if method_error:
        return method_error

    data = get_request_data(request)
    if data is None:
        return response("Invalid request data", 400)

    email = normalize_email(data.get("email", ""))

    if not email:
        return response("Please fill out all fields", 400)

    if not is_valid_email(email):
        return response("Please enter a valid email address", 400)

    user = get_users().find_one({"email": email})

    if not user:
        return response("Account not found", 404)

    otp = generate_otp()

    reset_record = {
        "email": email,
        "otp_hash": hash_otp(otp),
        "expires_at": otp_expiry(),
        "attempts": 0,
        "verified": False,
        "created_at": datetime.now(timezone.utc),
    }

    get_password_resets().replace_one(
        {"email": email},
        reset_record,
        upsert=True,
    )

    try:
        send_otp_email(email, otp, "password_reset")

    except Exception as exc:
        get_password_resets().delete_one(
            {"email": email}
        )

        print("Password reset email error:", str(exc))

        return response(
            "Unable to send OTP email. Please try again.",
            500,
        )

    return response(
        "Password reset OTP sent successfully",
        200,
        email=email,
    )


# --------------------------------------------------
# VERIFY FORGOT PASSWORD OTP
# --------------------------------------------------

@csrf_exempt
def verify_reset_otp(request):
    method_error = require_post(request)
    if method_error:
        return method_error

    data = get_request_data(request)
    if data is None:
        return response("Invalid request data", 400)

    email = normalize_email(data.get("email", ""))
    otp = data.get("otp", "").strip()

    if not email or not otp:
        return response("Please fill out all fields", 400)

    if len(otp) != 6 or not otp.isdigit():
        return response("OTP must be 6 digits", 400)

    resets = get_password_resets()
    reset = resets.find_one({"email": email})

    if not reset:
        return response(
            "Reset request not found. Please request OTP again.",
            404,
        )

    if is_expired(reset.get("expires_at")):
        resets.delete_one({"email": email})
        return response("OTP expired. Please request a new OTP.", 400)

    if reset.get("attempts", 0) >= settings.OTP_MAX_ATTEMPTS:
        resets.delete_one({"email": email})
        return response(
            "Too many incorrect attempts. Please request a new OTP.",
            429,
        )

    if not check_otp(otp, reset["otp_hash"]):
        resets.update_one(
            {"email": email},
            {"$inc": {"attempts": 1}},
        )
        return response("Incorrect OTP", 400)

    resets.update_one(
        {"email": email},
        {"$set": {"verified": True}},
    )

    return response("OTP verified successfully")


# --------------------------------------------------
# RESET PASSWORD
# --------------------------------------------------

@csrf_exempt
def reset_password(request):
    method_error = require_post(request)
    if method_error:
        return method_error

    data = get_request_data(request)
    if data is None:
        return response("Invalid request data", 400)

    email = normalize_email(data.get("email", ""))
    password = data.get("password", "")
    confirm_password = data.get("confirmPassword", "")

    if not email or not password or not confirm_password:
        return response("Please fill out all fields", 400)

    if len(password) < 6:
        return response(
            "Password must be at least 6 characters",
            400,
        )

    if password != confirm_password:
        return response("Passwords do not match", 400)

    resets = get_password_resets()
    reset = resets.find_one({"email": email})

    if not reset or not reset.get("verified"):
        return response(
            "Please verify your OTP first",
            403,
        )

    if is_expired(reset.get("expires_at")):
        resets.delete_one({"email": email})
        return response(
            "OTP expired. Please request a new OTP.",
            400,
        )

    result = get_users().update_one(
        {"email": email},
        {"$set": {"password_hash": hash_password(password)}},
    )

    if result.matched_count == 0:
        resets.delete_one({"email": email})
        return response("Account not found", 404)

    resets.delete_one({"email": email})

    return response("Password reset successful")
