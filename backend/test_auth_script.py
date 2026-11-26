import os, sys
sys.path.append('C:/Users/meera/ToxicLens-AI/backend')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'toxiclens_backend.settings')
import django
django.setup()
from authentication.views import login, forgot_password, verify_reset_otp, reset_password
from authentication.mongo import get_users, get_password_resets
from authentication.utils import hash_password, generate_otp, hash_otp, otp_expiry
from authentication.validators import normalize_email
from django.utils import timezone

class DummyRequest:
    def __init__(self, body_dict, method='POST'):
        import json
        self.body = json.dumps(body_dict).encode('utf-8')
        self.method = method

def resp_content(resp):
    return resp.content.decode()

# Clean up any prior test data
get_users().delete_many({'email': {'$regex': '^testuser'} })
get_password_resets().delete_many({'email': {'$regex': '^testuser'} })

# Create a verified test user
email = 'testuser@example.com'
user = {
    'name': 'Test User',
    'email': normalize_email(email),
    'password_hash': hash_password('secret123'),
    'role': 'user',
    'verified': True,
    'created_at': timezone.now()
}
get_users().insert_one(user)
print('Created test user')

# Successful login
req = DummyRequest({'email': email, 'password': 'secret123'})
print('Login success:', resp_content(login(req)))

# Wrong password
req_wrong = DummyRequest({'email': email, 'password': 'wrongpass'})
print('Login wrong password:', resp_content(login(req_wrong)))

# Unregistered email
req_unreg = DummyRequest({'email': 'nosuch@example.com', 'password': 'any'})
print('Login unregistered:', resp_content(login(req_unreg)))

# Missing fields
req_missing = DummyRequest({'email': email})
print('Login missing fields:', resp_content(login(req_missing)))

# Forgot password - initiate OTP
req_fp = DummyRequest({'email': email})
print('Forgot password initiate:', resp_content(forgot_password(req_fp)))
# Retrieve OTP hash from DB and set a known otp for testing
reset_rec = get_password_resets().find_one({'email': normalize_email(email)})
known_otp = '555555'
reset_rec['otp_hash'] = hash_otp(known_otp)
reset_rec['expires_at'] = otp_expiry()
reset_rec['verified'] = False
reset_rec['attempts'] = 0
get_password_resets().replace_one({'email': normalize_email(email)}, reset_rec, upsert=True)
# Verify OTP - wrong
print('Verify wrong OTP:', resp_content(verify_reset_otp(DummyRequest({'email': email, 'otp': '111111'}))))
# Verify OTP - correct
print('Verify correct OTP:', resp_content(verify_reset_otp(DummyRequest({'email': email, 'otp': known_otp}))))
# Reset password
new_pass = 'newpass123'
print('Reset password response:', resp_content(reset_password(DummyRequest({'email': email, 'password': new_pass, 'confirmPassword': new_pass}))))
# Login with new password
print('Login with new password:', resp_content(login(DummyRequest({'email': email, 'password': new_pass}))))
