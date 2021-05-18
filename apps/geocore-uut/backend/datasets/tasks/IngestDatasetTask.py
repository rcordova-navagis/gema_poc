import os
from celery import task
from libs.geocore_cartutil import ProcessDataset
from django.conf import settings
from .DatasetIngestionCompletedTask import DatasetIngestionCompletedTask
from uut.ActionResolver import ActionResolver


def create_log_folder():
    if not os.path.exists(settings.LOG_DIR):
        try:
            os.makedirs(settings.LOG_DIR)
        except OSError as exc: # Guard against race condition
            pass


class IngestDatasetTask:
    @task(bind=True)
    def get_task(self, dataset_id, dataset_queue_id, dataset_queue_name, sourcefilepath):
        print("Starting IngestDatasetTask source_filepath={sourcefilepath} dataset_id={dataset_id} dataset_queue_name={dataset_queue_name} dataset_queue_id={dataset_queue_id}".format(sourcefilepath=sourcefilepath, dataset_id=dataset_id, dataset_queue_name=dataset_queue_name, dataset_queue_id=dataset_queue_id))

        create_log_folder()

        LOG_FILE = os.path.join(settings.LOG_DIR, "{name}.log".format(name=dataset_queue_name))

        do_actions = ProcessDataset(dataset_id, dataset_queue_id, dataset_queue_name, sourcefilepath, settings.DATABASES['default'], LOG_FILE).start()

        DatasetIngestionCompletedTask().get_task.apply_async(args=[dataset_id, dataset_queue_id, dataset_queue_name])

        ActionResolver(do_actions).run_actions()

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