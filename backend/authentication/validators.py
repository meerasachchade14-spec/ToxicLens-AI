
import re


def normalize_email(email):
    return email.strip().lower()


def is_valid_email(email):
    pattern = r"^[^@\s]+@[^@\s]+\.[^@\s]+$"
    return bool(re.match(pattern, email))


def validate_password(password):
    if len(password) < 6:
        return False, "Password must be at least 6 characters"

    return True, ""


def validate_register_fields(data):
    name = data.get("name", "").strip()
    email = data.get("email", "").strip()
    password = data.get("password", "")
    agree_terms = data.get("agreeTerms", False)

    if not name or not email or not password:
        return False, "Please fill out all fields"

    if not isinstance(agree_terms, bool) or not agree_terms:
        return False, "Please fill out all fields"

    if not is_valid_email(email):
        return False, "Please enter a valid email address"

    if len(password) < 6:
        return False, "Password must be at least 6 characters"

    return True, ""


def validate_login_fields(data):
    email = data.get("email", "").strip()
    password = data.get("password", "")

    if not email or not password:
        return False, "Please fill out all fields"

    if not is_valid_email(email):
        return False, "Please enter a valid email address"

    return True, ""
