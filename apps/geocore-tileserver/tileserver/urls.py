"""tileserver URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.urls import include
from django_tilestache import urls as django_tilestache_urls
from . import views


urlpatterns = [
    url(r'^tilestache/layers/(?P<layer_name>[-\w]+)', views.CreateTileView.as_view(), name='tilestache-layer'),

    url(r'^', include(django_tilestache_urls))
]
