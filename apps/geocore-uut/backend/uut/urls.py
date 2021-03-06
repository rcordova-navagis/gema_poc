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
from django.urls import include, path
from django.http import HttpResponse

UUT_API_PREFIX = 'uut/v1/'

urlpatterns = [
    url(r'^tests/', lambda request: HttpResponse("Hello World", content_type="text/plain")),

    url(UUT_API_PREFIX, include([
        path('layers', include('layers.urls', namespace='layers')),
        path('datasets', include('datasets.urls', namespace='datasets'))
    ]))
]

if settings.DEBUG:
    import debug_toolbar

    urlpatterns = [
        path(r'admin/doc/', include('django.contrib.admindocs.urls')),
        path(r'__debug__/', include(debug_toolbar.urls)),
    ] + urlpatterns

    urlpatterns + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

