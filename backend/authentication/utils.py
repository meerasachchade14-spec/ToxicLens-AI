
import random
import jwt

from datetime import datetime, timedelta, timezone
from django.conf import settings
from django.contrib.auth.hashers import make_password, check_password


def generate_otp():
    return str(random.randint(100000, 999999))


def hash_otp(otp):
    return make_password(otp)


def verify_otp(otp, hashed_otp):
    return check_password(otp, hashed_otp)


def get_otp_expiry():
    return datetime.now(timezone.utc) + timedelta(
        minutes=settings.OTP_EXPIRY_MINUTES
    )


def create_access_token(user):
    now = datetime.now(timezone.utc)

    payload = {
        "user_id": str(user["_id"]),
        "email": user["email"],
        "role": user.get("role", "User"),
        "iat": now,
        "exp": now + timedelta(
            minutes=settings.JWT_ACCESS_MINUTES
        ),
    }

    return jwt.encode(
        payload,
        settings.JWT_SECRET,
        algorithm="HS256"
    )


def create_user_password_hash(password):
    return make_password(password)


def verify_user_password(password, password_hash):
    return check_password(password, password_hash)
