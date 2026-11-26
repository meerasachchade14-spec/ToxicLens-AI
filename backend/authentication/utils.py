
import secrets
from datetime import datetime, timedelta, timezone

import jwt

from django.conf import settings
from django.contrib.auth.hashers import make_password, check_password


def generate_otp():
    # Secure 6-digit OTP, including possible leading zeroes.
    return f"{secrets.randbelow(1000000):06d}"


def hash_otp(otp):
    return make_password(otp)


def check_otp(otp, hashed_otp):
    return check_password(otp, hashed_otp)


def otp_expiry():
    return datetime.now(timezone.utc) + timedelta(
        minutes=settings.OTP_EXPIRY_MINUTES
    )


def is_expired(expiry):
    if expiry is None:
        return True

    if expiry.tzinfo is None:
        expiry = expiry.replace(tzinfo=timezone.utc)

    return datetime.now(timezone.utc) > expiry


def hash_password(password):
    return make_password(password)


def verify_password(password, hashed_password):
    return check_password(password, hashed_password)


def create_jwt(user):
    now = datetime.now(timezone.utc)

    payload = {
        "user_id": str(user["_id"]),
        "email": user["email"],
        "role": user.get("role", "user"),
        "iat": now,
        "exp": now + timedelta(
            minutes=settings.JWT_EXPIRY_MINUTES
        ),
    }

    return jwt.encode(
        payload,
        settings.JWT_SECRET,
        algorithm=settings.JWT_ALGORITHM,
    )
