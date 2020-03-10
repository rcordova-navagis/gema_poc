import logging
import os
import platform
import sys

DJANGO_ROOT  = os.path.abspath(os.path.dirname(os.path.dirname(__file__)))
PROJECT_ROOT = os.path.dirname(DJANGO_ROOT)
APPS_DIR     = os.path.join(PROJECT_ROOT, 'apps')
FIXTURES_DIR = os.path.join(PROJECT_ROOT, 'fixtures')
LOG_DIR      = os.path.join(PROJECT_ROOT, 'logs')
SCRIPTS_DIR  = os.path.join(PROJECT_ROOT, 'scripts')

for directory in (APPS_DIR, FIXTURES_DIR, LOG_DIR, SCRIPTS_DIR):
    sys.path.insert(0, directory)
    
ADMINS = (
    ('John Doe', 'John.Doe@example.com'),
    ('Jane Doe', 'Jane.Doe@example.com'),
)

AUTH_PASSWORD_VALIDATORS = [
    { 'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator' },
    { 'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator' },
    { 'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator' },
    { 'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator' },
]

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]

LANGUAGE_CODE = 'en-us'

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

MEDIA_ROOT   = os.path.join(PROJECT_ROOT, 'media')

MEDIA_URL = '/media/'

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'myproject.urls'

SECRET_KEY = os.environ.get('SECRET_KEY', 't_jf1qead_154$lr@nw0w^&qizwp33powqxjn*d-h0nfu^01$5') 

SITE_ID = 1

STATIC_ROOT  = os.path.join(PROJECT_ROOT, 'assets')

STATIC_URL = '/static/'

STATICFILES_DIRS = [
    os.path.join(PROJECT_ROOT, 'static'),
]

STATICFILES_FINDERS = (
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
    'django.contrib.staticfiles.finders.DefaultStorageFinder',
)

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            os.path.join(PROJECT_ROOT, 'templates'),
        ],
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

TIME_ZONE = 'America/Chicago'

USE_I18N = True

USE_L10N = True

USE_TZ = True

WSGI_APPLICATION = 'myproject.wsgi.application'
