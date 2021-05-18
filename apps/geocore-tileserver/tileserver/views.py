import json
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
# from rest_framework.authentication import SessionAuthentication, BasicAuthentication
# from rest_framework.permissions import IsAuthenticated
from django.conf import settings
from django_tilestache.models import Layer
from tileserver.commandbus import commandbus
from .SeedTilestacheLayer import SeedTilestacheLayerCommand


def save_layer(layer_name, provider):
    return Layer.objects.create(
        **{
            "name": layer_name,
            "allowed_origin": "*",
            "provider": provider
        }
    )


class SeedLayerView(APIView):
    def post(self, request, layer_name):
        print("POST SeedLayerView layer_name={layer_name}".format(layer_name=layer_name))
        return Response("SeedLayerView request layer_name={layer_name}".format(layer_name=layer_name))

    def get(self, request, layer_name):
        print("GET SeedLayerView layer_name={layer_name}".format(layer_name=layer_name))
        # print(request.query_params)
        layer_dict = {}
        # try:
        layer_dict = commandbus.execute(SeedTilestacheLayerCommand(layer_name, request.query_params, settings.TILESTACHE_CACHE))
        # except Exception as err:
        #     return Response(str(err), status=status.HTTP_400_BAD_REQUEST)

        return Response("SeedLayerView request layer: {layer_name}".format(layer_name=layer_name))


class CreateTileView(APIView):
    # authentication_classes = (SessionAuthentication, BasicAuthentication)
    # permission_classes = (IsAuthenticated,)

    def post(self, request, layer_name):
        provider = request.data.get('provider', None)

        prov = provider.replace("'", '"')
        # print("LAYER: {layer} PROVIDER: {provider}".format(layer=layer_name, provider=prov))

        _provider = json.loads(prov)

        if not isinstance(_provider, dict):
            return Response("Invalid Layer params layer={layer}".format(layer=layer_name))

        save_layer(layer_name, _provider)

        return Response("CreateTileView request layer={layer}".format(layer=layer_name))

