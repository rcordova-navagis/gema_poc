from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from django.http import JsonResponse, HttpResponse
from rest_framework.views import APIView
from uut.commandbus import commandbus
from django.conf import settings
from uut.ActionResolver import ActionResolver

from .ManageCategories.CreateCategoryCommand import CreateCategoryCommand
from .ManageLayers.CreateLayerCommand import CreateLayerCommand
from datasets.ManageDatasets.CreateDatasetCommand import CreateDatasetCommand
from .SeedTilestacheLayer import SeedTilestacheLayerCommand

from uut.tasks import tasks

import logging

logger = logging.getLogger('uut')


class SeedLayerView(APIView):
    def post(self, request, layer_name):
        print("POST SeedLayerView layer_name={layer_name}".format(layer_name=layer_name))
        return Response("SeedLayerView request layer_name={layer_name}".format(layer_name=layer_name))

    def get(self, request, layer_name):
        print("GET SeedLayerView layer_name={layer_name}".format(layer_name=layer_name))
        # print(request.query_params)
        layer_dict = {}
        # try:
        layer_dict = commandbus.execute(SeedTilestacheLayerCommand(
            layer_name,
            request.query_params,
            settings.TILESTACHE_CACHE
        ))
        # except Exception as err:
        #     return Response(str(err), status=status.HTTP_400_BAD_REQUEST)
        return Response("SeedLayerView request layer: {layer_name}".format(layer_name=layer_name))


@api_view(["POST"])
def add_category(request):
    print("add_category data={data}".format(data=request.data))
    category_dict = commandbus.execute(CreateCategoryCommand(request.data))
    return JsonResponse(category_dict, status=status.HTTP_201_CREATED)


class LayersView(APIView):
    def get(self, request):
        ActionResolver([
            {'action': 'warm_tilestache', 'params': {'zooms': [1,2], 'table': 'dasda', 'dataset_id': 1}},
            {'action': 'do_cluster', 'params': {'zooms': [1,2], 'table': 'sdfg', 'dataset_id': 1}}
        ]).run_actions()
        # tasks.publish_message({'hello': 'world'})
        # logger.warning("Test!!")
        # name = request.GET['name']
        #
        # fileh = logging.FileHandler("{name}.log".format(name=name), 'a')
        # formatter = logging.Formatter('%(asctime)s - %(name)s - %(message)s')
        # fileh.setFormatter(formatter)
        # log = logging.getLogger(name)
        # log.addHandler(fileh)
        #
        # # log = logging.getLogger()
        # resp = "LAYERS GET name={name}".format(name=name)
        # log.warning(resp)
        return HttpResponse('layers view')


    def post(self, request):
        data = {'user_id': 2}
        data.update(request.data.dict())

        print("add_layer data={data}".format(data=data))

        layer = commandbus.execute(CreateLayerCommand(data))

        if 'sourcefile' in request.FILES:
            file = request.FILES['sourcefile']
            dataset = commandbus.execute(CreateDatasetCommand(file, data['user_id']))
            layer.dataset_id = dataset.pk
            layer.save()

        return HttpResponse('LAYERS POST')
