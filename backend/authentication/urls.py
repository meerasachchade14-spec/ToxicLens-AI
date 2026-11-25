
from django.urls import path

from authentication.views import (
    register,
    verify_register_otp,
    login,
    forgot_password,
    verify_reset_otp,
    reset_password,
)

urlpatterns = [
    path("register/", register, name="register"),

    path(
        "verify-register-otp/",
        verify_register_otp,
        name="verify-register-otp",
    ),

    path("login/", login, name="login"),

    path(
        "forgot-password/",
        forgot_password,
        name="forgot-password",
    ),

    path(
        "verify-reset-otp/",
        verify_reset_otp,
        name="verify-reset-otp",
    ),

    path(
        "reset-password/",
        reset_password,
        name="reset-password",
    ),
]
