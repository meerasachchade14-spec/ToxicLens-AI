
import json
from datetime import datetime, timezone

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings

from authentication.mongo import (
    users_collection,
    pending_registrations_collection,
    password_reset_collection,
)

from authentication.validators import (
    validate_email,
    validate_password,
    validate_required_fields,
    validate_terms,
)

from authentication.email_service import send_otp_email

from authentication.utils import (
    generate_otp,
    hash_otp,
    verify_otp,
    get_otp_expiry,
    create_access_token,
    create_user_password_hash,
    verify_user_password,
)


def get_json_data(request):
    try:
        return json.loads(request.body or "{}")
    except json.JSONDecodeError:
        return None


def error_response(message, status=400):
    return JsonResponse(
        {
            "success": False,
            "message": message,
        },
        status=status,
    )


def success_response(message, extra=None):
    response_data = {
        "success": True,
        "message": message,
    }

    if extra:
        response_data.update(extra)

    return JsonResponse(response_data)


def is_expired(expiry):
    if not expiry:
        return True

    # MongoDB may return a naive UTC datetime.
    if expiry.tzinfo is None:
        expiry = expiry.replace(tzinfo=timezone.utc)

    return datetime.now(timezone.utc) > expiry


# =========================================================
# REGISTER
# POST /api/auth/register/
# =========================================================

@csrf_exempt
def register(request):
    if request.method != "POST":
        return error_response("Method not allowed.", 405)

    data = get_json_data(request)

    if data is None:
        return error_response("Invalid request data.")

    required_fields = ["name", "email", "password", "agreeTerms"]

    if not validate_required_fields(data, required_fields):
        return error_response("Please fill out all fields.")

    name = data["name"].strip()
    email = data["email"].strip().lower()
    password = data["password"]
    agree_terms = data["agreeTerms"]

    if not name:
        return error_response("Please enter your name.")

    if not validate_email(email):
        return error_response("Please enter a valid email address.")

    if not validate_password(password):
        return error_response(
            "Password must be at least 6 characters long."
        )

    if not validate_terms(agree_terms):
        return error_response(
            "You must agree to the Terms and Conditions."
        )

    # Admin email is reserved and cannot be registered as a user.
    if email == settings.ADMIN_EMAIL:
        return error_response(
            "This email is reserved for the administrator."
        )

    # Check if this email already has an account.
    existing_user = users_collection.find_one({"email": email})

    if existing_user:
        return error_response(
            "This email is already registered."
        )

    # Generate registration OTP.
    otp = generate_otp()

    pending_data = {
        "name": name,
        "email": email,
        "password": create_user_password_hash(password),
        "otp_hash": hash_otp(otp),
        "otp_expiry": get_otp_expiry(),
        "created_at": datetime.now(timezone.utc),
    }

    # Replace an older uncompleted registration for the same email.
    pending_registrations_collection.update_one(
        {"email": email},
        {"$set": pending_data},
        upsert=True,
    )

    email_sent = send_otp_email(
        email,
        otp,
        "register",
    )

    if not email_sent:
        pending_registrations_collection.delete_one(
            {"email": email}
        )

        return error_response(
            "Unable to send OTP email. Please try again later.",
            500,
        )

    return success_response(
        "Registration OTP sent successfully. Please check your email."
    )


# =========================================================
# VERIFY REGISTRATION OTP
# POST /api/auth/verify-register-otp/
# =========================================================

@csrf_exempt
def verify_register_otp(request):
    if request.method != "POST":
        return error_response("Method not allowed.", 405)

    data = get_json_data(request)

    if data is None:
        return error_response("Invalid request data.")

    if not validate_required_fields(data, ["email", "otp"]):
        return error_response("Please enter email and OTP.")

    email = data["email"].strip().lower()
    otp = str(data["otp"]).strip()

    if len(otp) != 6 or not otp.isdigit():
        return error_response("Enter a valid 6-digit OTP.")

    pending = pending_registrations_collection.find_one(
        {"email": email}
    )

    if not pending:
        return error_response(
            "Registration not found. Please register again."
        )

    if is_expired(pending.get("otp_expiry")):
        pending_registrations_collection.delete_one(
            {"email": email}
        )

        return error_response(
            "OTP expired. Please register again."
        )

    if not verify_otp(otp, pending["otp_hash"]):
        return error_response("Incorrect OTP. Please try again.")

    # Double-check duplicate account before creating user.
    if users_collection.find_one({"email": email}):
        pending_registrations_collection.delete_one(
            {"email": email}
        )

        return error_response(
            "This email is already registered."
        )

    user_data = {
        "name": pending["name"],
        "email": pending["email"],
        "password": pending["password"],
        "role": "User",
        "is_verified": True,
        "created_at": datetime.now(timezone.utc),
    }

    users_collection.insert_one(user_data)

    pending_registrations_collection.delete_one(
        {"email": email}
    )

    return success_response(
        "Email verified successfully. Your account has been created."
    )


# =========================================================
# LOGIN
# POST /api/auth/login/
# =========================================================

@csrf_exempt
def login(request):
    if request.method != "POST":
        return error_response("Method not allowed.", 405)

    data = get_json_data(request)

    if data is None:
        return error_response("Invalid request data.")

    if not validate_required_fields(data, ["email", "password"]):
        return error_response("Please fill out all fields.")

    email = data["email"].strip().lower()
    password = data["password"]

    if not validate_email(email):
        return error_response("Please enter a valid email address.")

    user = users_collection.find_one({"email": email})

    if not user:
        return error_response(
            "This email is not registered. Please create an account."
        )

    if not verify_user_password(
        password,
        user["password"]
    ):
        return error_response("Incorrect password.")

    if not user.get("is_verified", False):
        return error_response(
            "Please verify your email before logging in."
        )

    token = create_access_token(user)

    return success_response(
        "Login successful.",
        {
            "token": token,
            "user": {
                "id": str(user["_id"]),
                "name": user["name"],
                "email": user["email"],
                "role": user.get("role", "User"),
            },
        },
    )


# =========================================================
# FORGOT PASSWORD
# POST /api/auth/forgot-password/
# =========================================================

@csrf_exempt
def forgot_password(request):
    if request.method != "POST":
        return error_response("Method not allowed.", 405)

    data = get_json_data(request)

    if data is None:
        return error_response("Invalid request data.")

    if not validate_required_fields(data, ["email"]):
        return error_response("Please enter your email address.")

    email = data["email"].strip().lower()

    if not validate_email(email):
        return error_response("Please enter a valid email address.")

    user = users_collection.find_one({"email": email})

    if not user:
        return error_response(
            "No account exists with this email address."
        )

    otp = generate_otp()

    reset_data = {
        "email": email,
        "otp_hash": hash_otp(otp),
        "otp_expiry": get_otp_expiry(),
        "verified": False,
        "created_at": datetime.now(timezone.utc),
    }

    password_reset_collection.update_one(
        {"email": email},
        {"$set": reset_data},
        upsert=True,
    )

    email_sent = send_otp_email(
        email,
        otp,
        "forgot-password",
    )

    if not email_sent:
        password_reset_collection.delete_one(
            {"email": email}
        )

        return error_response(
            "Unable to send OTP email. Please try again later.",
            500,
        )

    return success_response(
        "Password reset OTP sent to your registered email."
    )


# =========================================================
# VERIFY PASSWORD RESET OTP
# POST /api/auth/verify-reset-otp/
# =========================================================

@csrf_exempt
def verify_reset_otp(request):
    if request.method != "POST":
        return error_response("Method not allowed.", 405)

    data = get_json_data(request)

    if data is None:
        return error_response("Invalid request data.")

    if not validate_required_fields(data, ["email", "otp"]):
        return error_response("Please enter email and OTP.")

    email = data["email"].strip().lower()
    otp = str(data["otp"]).strip()

    if len(otp) != 6 or not otp.isdigit():
        return error_response("Enter a valid 6-digit OTP.")

    reset_record = password_reset_collection.find_one(
        {"email": email}
    )

    if not reset_record:
        return error_response(
            "Password reset request not found. Please request a new OTP."
        )

    if is_expired(reset_record.get("otp_expiry")):
        password_reset_collection.delete_one(
            {"email": email}
        )

        return error_response(
            "OTP expired. Please request a new OTP."
        )

    if not verify_otp(otp, reset_record["otp_hash"]):
        return error_response("Incorrect OTP. Please try again.")

    password_reset_collection.update_one(
        {"email": email},
        {"$set": {"verified": True}}
    )

    return success_response(
        "OTP verified successfully. You can now reset your password."
    )


# =========================================================
# RESET PASSWORD
# POST /api/auth/reset-password/
# =========================================================

@csrf_exempt
def reset_password(request):
    if request.method != "POST":
        return error_response("Method not allowed.", 405)

    data = get_json_data(request)

    if data is None:
        return error_response("Invalid request data.")

    if not validate_required_fields(
        data,
        ["email", "new_password"]
    ):
        return error_response("Please fill out all fields.")

    email = data["email"].strip().lower()
    new_password = data["new_password"]

    if not validate_password(new_password):
        return error_response(
            "Password must be at least 6 characters long."
        )

    reset_record = password_reset_collection.find_one(
        {"email": email}
    )

    if not reset_record:
        return error_response(
            "Please verify your OTP before resetting the password."
        )

    if not reset_record.get("verified"):
        return error_response(
            "Please verify your OTP before resetting the password."
        )

    if is_expired(reset_record.get("otp_expiry")):
        password_reset_collection.delete_one(
            {"email": email}
        )

        return error_response(
            "OTP expired. Please request a new OTP."
        )

    users_collection.update_one(
        {"email": email},
        {
            "$set": {
                "password": create_user_password_hash(new_password)
            }
        },
    )

    password_reset_collection.delete_one(
        {"email": email}
    )

    return success_response(
        "Password changed successfully. Please login with your new password."
    )
