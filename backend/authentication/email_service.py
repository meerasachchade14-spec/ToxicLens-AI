
from django.conf import settings
from django.core.mail import send_mail


def send_otp_email(to_email, otp, purpose):
    if purpose == "register":
        subject = "ToxicLens AI - Verify Your Email"
        message = f"""
Hello,

Thank you for registering with ToxicLens AI.

Your email verification OTP is:

{otp}

This OTP is valid for {settings.OTP_EXPIRY_MINUTES} minutes.

If you did not request this verification, please ignore this email.

Regards,
ToxicLens AI Team
"""
    else:
        subject = "ToxicLens AI - Password Reset OTP"
        message = f"""
Hello,

You requested to reset your ToxicLens AI account password.

Your password reset OTP is:

{otp}

This OTP is valid for {settings.OTP_EXPIRY_MINUTES} minutes.

If you did not request a password reset, please ignore this email.

Regards,
ToxicLens AI Team
"""

    try:
        send_mail(
            subject=subject,
            message=message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[to_email],
            fail_silently=False,
        )

        return True

    except Exception as error:
        print("Email sending error:", error)
        return False
