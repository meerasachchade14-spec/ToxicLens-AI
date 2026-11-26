
from django.conf import settings
from django.core.mail import send_mail


def send_otp_email(email, otp, purpose):
    if purpose == "registration":
        subject = "ToxicLens AI - Verify Your Email"
        message = (
            f"Hello,\n\n"
            f"Your ToxicLens AI registration verification code is:\n\n"
            f"{otp}\n\n"
            f"This OTP is valid for "
            f"{settings.OTP_EXPIRY_MINUTES} minutes.\n\n"
            f"If you did not request this code, ignore this email.\n\n"
            f"Regards,\nToxicLens AI Team"
        )

    elif purpose == "password_reset":
        subject = "ToxicLens AI - Password Reset OTP"
        message = (
            f"Hello,\n\n"
            f"Your password reset verification code is:\n\n"
            f"{otp}\n\n"
            f"This OTP is valid for "
            f"{settings.OTP_EXPIRY_MINUTES} minutes.\n\n"
            f"If you did not request a password reset, ignore this email.\n\n"
            f"Regards,\nToxicLens AI Team"
        )

    else:
        raise ValueError("Invalid email purpose")

    result = send_mail(
        subject,
        message,
        settings.DEFAULT_FROM_EMAIL,
        [email],
        fail_silently=False,
    )

    return result == 1
