
import re


def validate_email(email):
    email = email.strip().lower()

    pattern = r"^[^@\s]+@[^@\s]+\.[^@\s]+$"

    if not email:
        return False

    return bool(re.match(pattern, email))


def validate_password(password):
    return isinstance(password, str) and len(password) >= 6


def validate_required_fields(data, fields):
    for field in fields:
        value = data.get(field)

        if value is None:
            return False

        if isinstance(value, str) and not value.strip():
            return False

    return True


def validate_terms(value):
    return value is True or value == "true" or value == 1
