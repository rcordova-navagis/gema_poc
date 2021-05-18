from .base import *

ALLOWED_HOSTS = [
    'example.com',
]

CSRF_COOKIE_SECURE = True

# Database
# https://docs.djangoproject.com/en/3.0/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.environ.get('DB_NAME', 'gemapocdb'),
        'USER': os.environ.get('DB_USER', 'user'),
        'PASSWORD': os.environ.get('DB_PASSWORD', 'password'),
        'HOST': os.environ.get('DB_HOST', 'localhost'),
        'PORT': '' # os.environ.get('DB_PORT', '5432'),
    }
}

DEBUG = bool(os.environ.get('DEBUG', False))

EMAIL_BACKEND       = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST          = os.environ.get('EMAIL_HOST', 'loalhost')
EMAIL_HOST_PASSWORD = os.environ.get('EMAIL_HOST_PASSWORD', '')
EMAIL_HOST_USER     = os.environ.get('EMAIL_HOST_USER', '')
EMAIL_PORT          = os.environ.get('EMAIL_PORT', 25)
EMAIL_USE_SSL       = os.environ.get('EMAIL_USE_SSL', False)
EMAIL_USE_TLS       = os.environ.get('EMAIL_USE_TLS', False)

SESSION_COOKIE_SECURE = True
