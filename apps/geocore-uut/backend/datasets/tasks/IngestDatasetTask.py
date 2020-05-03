from celery import task
from libs.geocore_cartutil import ProcessDataset
from django.conf import settings
from django_tilestache.models import Layer
from ..models import Datasets, DatasetQueues


PROJECTION_SPHERICAL_MERCATOR = '900913'


class IngestDatasetTask:
    def __init__(self):
        pass

    @task(bind=True)
    def get_task(self, dataset_id, dataset_queue_id, dataset_queue_name, sourcefilepath):
        print("Starting IngestDatasetTask source_filepath={sourcefilepath} dataset_id={dataset_id} dataset_queue_name={dataset_queue_name} dataset_queue_id={dataset_queue_id}".format(sourcefilepath=sourcefilepath, dataset_id=dataset_id, dataset_queue_name=dataset_queue_name, dataset_queue_id=dataset_queue_id))

        database_dict = settings.DATABASES['default']
        ProcessDataset(dataset_id, dataset_queue_id, dataset_queue_name, sourcefilepath, database_dict).start()

        layer = Layer.objects.create(
            **{
                "name": dataset_queue_name,
                "provider": {
                    "class": "TileStache.Goodies.VecTiles:Provider",
                    "kwargs": {
                        "clip": False,
                        "dbinfo": {
                            "host": database_dict['HOST'],
                            "port": database_dict['PORT'],
                            "database": database_dict['NAME'],
                            "user": database_dict['USER'],
                            "password": database_dict['PASSWORD']
                        },
                        "queries": [
                            "SELECT ST_Transform(geom, {spmerc}) AS __geometry__, * FROM {dataset_queue_name}".format(dataset_queue_name=dataset_queue_name, spmerc=PROJECTION_SPHERICAL_MERCATOR)
                        ]
                    }
                }
            }
        )

        ds = Datasets.objects.get(pk=dataset_id)
        if ds:
            ds.tilestache_layer_id = layer.pk
            ds.save()

        dsq = DatasetQueues.objects.get(pk=dataset_queue_id)
        if dsq:
            dsq.progress = 100
            dsq.save()

        # determine what type of datasource. csv,xlsx,shape,kml,kmz,etc..
            # get the appropriate driver
        # during ogr2ogr data needed:
            # do a cleanup of columns first like removing trailing and leading spaces
            # filesource path
            # db connection
            # table name (doesnt need to exist but we need to create a table name first before proceeding and save it on dataset_queues table)
            # geom column name, (lat, lon)
            # create vrt file for the definition


        # read sourcefile insert dataset_columns
        # insert dataset_data on a temp table
        # start transfer data to main table (dataset_data)
        # create the layer record to django_tilestache_layer
        # if dataset is type of point then do clustering ProcessCluster