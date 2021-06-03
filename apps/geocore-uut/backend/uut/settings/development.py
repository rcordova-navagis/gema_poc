from .base import *

# Database
# https://docs.djangoproject.com/en/3.0/ref/settings/#databases

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.sqlite3',
#         'NAME'  : os.path.join(DJANGO_ROOT, 'db.sqlite3')
#     }
# }

DATABASES = {
    'default': {
        # 'ENGINE': 'django.db.backends.postgresql',
        'ENGINE': 'django.contrib.gis.db.backends.postgis',
        'NAME': os.environ.get('DB_NAME', 'gemapocdb'),
        'USER': os.environ.get('DB_USER', 'user'),
        'PASSWORD': os.environ.get('DB_PASSWORD', 'password'),
        'HOST': os.environ.get('DB_HOST', 'localhost'),
        'PORT': os.environ.get('DB_PORT', '5432')
    }
}

DEBUG = bool(os.environ.get('DEBUG', True))

EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

INSTALLED_APPS += [
    'corsheaders',
    'debug_toolbar',
    'django.contrib.admindocs',
]

INTERNAL_IPS = [
    '127.0.0.1',
    'localhost'
]

MIDDLEWARE += [
    'debug_toolbar.middleware.DebugToolbarMiddleware',
    'corsheaders.middleware.CorsMiddleware'
]

CORS_ORIGIN_ALLOW_ALL = True
CORS_ALLOW_CREDENTIALS = True
# CORS_ORIGIN_WHITELIST = [
#     'http://localhost:3030',
# ]
# CORS_ORIGIN_REGEX_WHITELIST = [
#     'http://localhost:3030',
# ]

# tilestache_config = {
#     "cache": {
#         "name": "Disk",
#         "dirs": "portable",
#         "gzip": [
#             "xml"
#         ],
#         "path": "/tmp/stache",
#         "umask": "0000"
#     },
#     "layers": {
#         "osm_roads": {
#             "allowed origin": "*",
#             "provider": {
#                 "class": "TileStache.Goodies.VecTiles:Provider",
#                 "kwargs": {
#                     "clip": False,
#                     "dbinfo": {
#                         "database": "gemapocdb",
#                         "host": "geocore-pgdb",
#                         "password": "mYge0cor3",
#                         "user": "geocoreuser"
#                     },
#                     "queries": [
#                         "SELECT ST_Transform(way, 900913) AS __geometry__, osm_id as geomId, name as roadName FROM planet_osm_roads"
#                     ]
#                 }
#             }
#         }
#     }
# }
