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
from django.conf.urls import url
from django.urls import path
from django.http import HttpResponse
from . import views

app_name = 'layers'

urlpatterns = [
    url(r'tilestache/seed/(?P<layer_name>[-\w]+)', views.SeedLayerView.as_view(), name='tilestache-seed-layer'),

    url(r'categories', views.add_category, name='add_category'),
    url(r'', views.LayersView.as_view(), name='layers')
    # url('', lambda request: HttpResponse("Layers Index", content_type="text/plain")),
]
