from rest_framework.decorators import api_view
from rest_framework import status
from django.http import JsonResponse, HttpResponse
from rest_framework.views import APIView
from uut.commandbus import commandbus

from .ManageCategories.CreateCategoryCommand import CreateCategoryCommand
from .ManageLayers.CreateLayerCommand import CreateLayerCommand
from datasets.ManageDatasets.CreateDatasetCommand import CreateDatasetCommand


@api_view(["POST"])
def add_category(request):
    print("add_category data={data}".format(data=request.data))
    category_dict = commandbus.execute(CreateCategoryCommand(request.data))
    return JsonResponse(category_dict, status=status.HTTP_201_CREATED)


class LayersView(APIView):
    def get(self, request):
        return HttpResponse('LAYERS GET ')

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
