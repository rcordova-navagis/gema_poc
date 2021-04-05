from django.http import HttpResponse
from django.contrib.auth.models import User
from rest_framework import serializers, viewsets, routers


def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")


# Serializers define the API representation.
class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'is_staff']


# ViewSets define the view behavior.
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
