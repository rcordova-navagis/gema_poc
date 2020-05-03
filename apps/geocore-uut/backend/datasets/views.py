# from django.shortcuts import render
from django.http import HttpResponse
from .tasks.IngestDatasetTask import IngestDatasetTask
# from celery import shared_task


def index(request):
    return HttpResponse('Datasets Index', content_type='text/plain')


def new_dataset(request):
    layer_id = request.data['layer_id']

    print("new_dataset layer_id={layer_id}".format(layer_id=layer_id))

    # IngestDatasetTask().get_task.apply_async(args=[layer_id])

    return HttpResponse('New Dataset View', content_type='text/plain')
