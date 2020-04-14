from rest_framework.views import APIView
from rest_framework.response import Response
# from rest_framework.authentication import SessionAuthentication, BasicAuthentication
# from rest_framework.permissions import IsAuthenticated
from django_tilestache.models import Layer
import json


def save_layer(layer_name, provider):
    return Layer.objects.create(
        **{
            "name": layer_name,
            "allowed_origin": "*",
            "provider": provider
        }
    )


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

