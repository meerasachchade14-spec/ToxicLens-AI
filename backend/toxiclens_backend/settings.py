
import os
from pathlib import Path
from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent.parent

load_dotenv(BASE_DIR / ".env")

SECRET_KEY = os.getenv("DJANGO_SECRET_KEY", "development-secret-key-change-me")

DEBUG = os.getenv("DEBUG", "True").lower() == "true"

ALLOWED_HOSTS = ["localhost", "127.0.0.1"]

INSTALLED_APPS = [
    "django.contrib.contenttypes",
    "django.contrib.auth",
    "corsheaders",
    "authentication",
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
]

ROOT_URLCONF = "toxiclens_backend.urls"

TEMPLATES = []

WSGI_APPLICATION = "toxiclens_backend.wsgi.application"

# MongoDB is used for application data.
# Django's built-in database is not used for user accounts.

DATABASES = {}

CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

CORS_ALLOW_CREDENTIALS = True

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# Email configuration - Gmail SMTP
EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_HOST = "smtp.gmail.com"
EMAIL_PORT = 587
EMAIL_USE_TLS = True

EMAIL_HOST_USER = os.getenv("EMAIL_HOST_USER", "")
EMAIL_HOST_PASSWORD = os.getenv("EMAIL_HOST_PASSWORD", "")
DEFAULT_FROM_EMAIL = os.getenv(
    "DEFAULT_FROM_EMAIL",
    EMAIL_HOST_USER
)

# MongoDB
MONGO_URI = os.getenv(
    "MONGO_URI",
    "mongodb://localhost:27017"
)

MONGO_DATABASE = os.getenv(
    "MONGO_DATABASE",
    "toxiclens_ai"
)

# Admin email used for sending OTPs and reserved from user registration.
ADMIN_EMAIL = os.getenv(
    "ADMIN_EMAIL",
    "meera.ldrp.7@gmail.com"
).strip().lower()

# JWT
JWT_SECRET = os.getenv(
    "JWT_SECRET",
    SECRET_KEY
)

JWT_ACCESS_MINUTES = 60

# OTP
OTP_EXPIRY_MINUTES = 5
