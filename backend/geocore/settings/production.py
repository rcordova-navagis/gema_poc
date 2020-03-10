from .base import *

ALLOWED_HOSTS = [
    'example.com',
]

CSRF_COOKIE_SECURE = True

DATABASES = {
    'default': {
        'ENGINE'  : 'django.db.backends.mysql', 
        'NAME'    : os.environ.get('DATABASE_NAME', ''),
        'USER'    : os.environ.get('DATABASE_USER', ''),
        'PASSWORD': os.environ.get('DATABASE_PASSWORD', ''),
        'HOST'    : os.environ.get('DATABASE_HOST', ''),
        'PORT'    : os.environ.get('DATABASE_PORT', ''),
    }
}

DEBUG = bool(os.environ.get('DJANGO_DEBUG', False))

EMAIL_BACKEND       = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST          = os.environ.get('EMAIL_HOST', 'loalhost')
EMAIL_HOST_PASSWORD = os.environ.get('EMAIL_HOST_PASSWORD', '')
EMAIL_HOST_USER     = os.environ.get('EMAIL_HOST_USER', '')
EMAIL_PORT          = os.environ.get('EMAIL_PORT', 25)
EMAIL_USE_SSL       = os.environ.get('EMAIL_USE_SSL', False)
EMAIL_USE_TLS       = os.environ.get('EMAIL_USE_TLS', False)

SESSION_COOKIE_SECURE = True
