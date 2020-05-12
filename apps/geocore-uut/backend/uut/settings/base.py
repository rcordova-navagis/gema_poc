import logging
import os
import platform
import sys
# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.0/howto/deployment/checklist/


DJANGO_ROOT = os.path.abspath(os.path.dirname(os.path.dirname(__file__)))

PROJECT_ROOT = os.path.dirname(DJANGO_ROOT)

BASE_DIR = PROJECT_ROOT

LOG_DIR = os.path.join(PROJECT_ROOT, 'logs')

for directory in (LOG_DIR):
    sys.path.insert(0, directory)

ALLOWED_HOSTS = os.environ.get('DJANGO_ALLOWED_HOSTS').split(' ')

ADMINS = (
    ('John Doe', 'John.Doe@example.com'),
    ('Jane Doe', 'Jane.Doe@example.com'),
)

# Password validation
# https://docs.djangoproject.com/en/3.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    { 'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator' },
    { 'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator' },
    { 'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator' },
    { 'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator' },
]

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.gis',
    # 'django_extensions',

    # extensions
    'rest_framework',
    'django_tilestache.apps.DjangoTilestacheConfig',
    # 'graphene_django',
    # 'graphene_subscriptions',

    # apps
    'layers',
    'datasets'
]

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['console'],
            'level': os.environ.get('DJANGO_LOG_LEVEL', 'INFO'),
        },
    },
}

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

REST_FRAMEWORK = {
    # Use Django's standard `django.contrib.auth` permissions,
    # or allow read-only access for unauthenticated users.
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',
    ],
}

# GRAPHENE = {
#     'MIDDLEWARE': [
#         # Others middlewares
#         'graphene_django_subscriptions.depromise_subscription',
#     ]
# }

SITE_ID = 1

ROOT_URLCONF = 'uut.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

# Internationalization
# https://docs.djangoproject.com/en/3.0/topics/i18n/
LANGUAGE_CODE = 'en-us'

SECRET_KEY = os.environ.get('SECRET_KEY', 't_jf1qead_154$lr@nw0w^&qizwp33powqxjn*d-h0nfu^01$5')

TIME_ZONE = os.environ.get('TZ', 'Asia/Manila')

USE_I18N = True

USE_L10N = True

USE_TZ = True

WSGI_APPLICATION = 'uut.wsgi.application'

# APPEND_SLASH=False

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.0/howto/static-files/
STATIC_ROOT = os.path.join(PROJECT_ROOT, 'static')
STATIC_URL = '/static/'

MEDIA_ROOT = os.path.join(PROJECT_ROOT, 'media')
MEDIA_URL = '/media/'

LOG_DIR = os.path.join(PROJECT_ROOT, 'logs')
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'console': {
            'level': 'INFO',
            'class': 'logging.StreamHandler',
        },
        'file': {
            'level': 'DEBUG',
            'class': 'logging.FileHandler',
            'filename': 'debug.log',
        },
        'uut': {
            'level': 'WARN',
            'class': 'logging.FileHandler',
            'filename': 'uut.log',
        },
    },
    'loggers': {
        'django': {
            'handlers':  ['console'],
            'level': 'INFO',
            'formatter': 'verbose',
            'propagate': True,
        },
        'uut': {
            'handlers': ['console', 'uut'],
            'level': 'WARN',
            'formatter': 'verbose',
            'propagate': True,
        },
    },
}

BROKER_URL = 'amqp://{user}:{password}@{hostname}/{vhost}/'.format(
    user=os.environ.get('RABBITMQ_DEFAULT_USER', 'guest'),
    password=os.environ.get('RABBITMQ_DEFAULT_PASS', 'guest'),
    hostname=os.environ.get('RABBITMQ_HOST', 'localhost'),
    vhost=os.environ.get('RABBIT_ENV_VHOST', '')
)
CELERY_RESULT_BACKEND = 'rpc://'
CELERY_TIMEZONE = TIME_ZONE

# TILESTACHE_CACHE = {
#     "name": "Test",
#     "verbose": "True"
# }
TILESTACHE_CACHE = {
    "name": "Redis",
    "host": "geocore-redis",
    "port": 6379,
    "db": 0,
    "key prefix": "geocore"
}
