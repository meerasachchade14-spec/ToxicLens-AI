import os, django, traceback

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'toxiclens_backend.settings')
import django
django.setup()

from authentication.email_service import send_otp_email

try:
    print('Sending test OTP email...')
    ok = send_otp_email('meera.ldrp.7@gmail.com', '123456', 'registration')
    print('Result:', ok)
except Exception as e:
    print('Exception raised:')
    traceback.print_exc()
