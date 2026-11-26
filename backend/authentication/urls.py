
from django.urls import path

from . import views

urlpatterns = [
    path("register/", views.register, name="register"),
    path(
        "verify-register-otp/",
        views.verify_register_otp,
        name="verify-register-otp",
    ),
    path("login/", views.login, name="login"),
    path(
        "forgot-password/",
        views.forgot_password,
        name="forgot-password",
    ),
    path(
        "verify-reset-otp/",
        views.verify_reset_otp,
        name="verify-reset-otp",
    ),
    path(
        "reset-password/",
        views.reset_password,
        name="reset-password",
    ),
]
