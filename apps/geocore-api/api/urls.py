"""geocore URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls.static import static
from django.conf.urls import url
from django.contrib import admin
from django.urls import include, path
from rest_framework import routers
from . import views
#from django_tilestache.models import Layer

# layer = Layer.objects.create(
#     **{
#         "name": "osmroads",
#         "provider": {
#             "class": "TileStache.Goodies.VecTiles:Provider",
#             "kwargs": {
#                 "clip": False,
#                 "dbinfo": {
#                     "host": "geocore-pgdb",
#                     "port": "5432",
#                     "database": "gemapocdb",
#                     "user": "geocoreuser",
#                     "password": "mYge0cor3"
#                 },
#                 "queries": [
#                     "SELECT way AS __geometry__, osm_id, name FROM planet_osm_roads"
#                 ]
#             }
#         }
#     }
# )

# layer = Layer.objects.create(
#     **{
#         "name": "roads",
#         "allowed_origin": "*",
#         "provider": {
#             "name": "vector",
#             "driver": "PostgreSQL",
#             "parameters": {
#                 "host": "geocore-pgdb",
#                 "port": "5432",
#                 "dbname": "gemapocdb",
#                 "user": "geocoreuser",
#                 "password": "mYge0cor3",
#                 "table": "planet_osm_roads"
#             }
#         }
#     }
# )

# Routers provide a way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    url(r'^', include(router.urls)),

    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]

if settings.DEBUG:
    import debug_toolbar

    urlpatterns = [
        path(r'admin/doc/', include('django.contrib.admindocs.urls')),
        path(r'__debug__/', include(debug_toolbar.urls)),
    ] + urlpatterns

    urlpatterns + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

