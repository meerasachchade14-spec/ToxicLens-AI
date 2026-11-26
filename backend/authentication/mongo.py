
from pymongo import MongoClient
from pymongo.errors import DuplicateKeyError
from django.conf import settings

_client = None
_db = None


def get_db():
    global _client, _db

    if _db is None:
        _client = MongoClient(
            settings.MONGO_URI,
            serverSelectionTimeoutMS=5000,
        )

        # Verify that MongoDB is reachable.
        _client.admin.command("ping")

        _db = _client[settings.MONGO_DATABASE]

        # One account per email.
        _db.users.create_index("email", unique=True)

        # One active registration OTP record per email.
        _db.pending_registrations.create_index(
            "email", unique=True
        )

        # One active password reset record per email.
        _db.password_resets.create_index(
            "email", unique=True
        )

    return _db


def get_users():
    return get_db()["users"]


def get_pending_registrations():
    return get_db()["pending_registrations"]


def get_password_resets():
    return get_db()["password_resets"]


def close_connection():
    global _client, _db

    if _client is not None:
        _client.close()

    _client = None
    _db = None
