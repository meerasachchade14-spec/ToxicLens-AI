
from pymongo import MongoClient
from django.conf import settings

client = MongoClient(
    settings.MONGO_URI,
    serverSelectionTimeoutMS=5000
)

db = client[settings.MONGO_DATABASE]

users_collection = db["users"]
pending_registrations_collection = db["pending_registrations"]
password_reset_collection = db["password_resets"]

# Prevent duplicate registered accounts.
users_collection.create_index("email", unique=True)

# One pending registration per email.
pending_registrations_collection.create_index(
    "email",
    unique=True
)

# One reset record per email.
password_reset_collection.create_index(
    "email",
    unique=True
)
