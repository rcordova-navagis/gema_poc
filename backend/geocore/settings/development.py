from .base import *

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME'  : os.path.join(DJANGO_ROOT, 'db.sqlite3')
    }
}

DEBUG = bool(os.environ.get('DJANGO_DEBUG', True))

EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

INSTALLED_APPS += [
    'debug_toolbar',
    'django.contrib.admindocs',
]

INTERNAL_IPS = [
    '127.0.0.1',
    'localhost'
]

MIDDLEWARE += [
    'debug_toolbar.middleware.DebugToolbarMiddleware',
]
