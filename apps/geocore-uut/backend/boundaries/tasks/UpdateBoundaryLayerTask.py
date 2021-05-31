import os
from celery import task
from django.conf import settings


def create_log_folder():
    if not os.path.exists(settings.LOG_DIR):
        try:
            os.makedirs(settings.LOG_DIR)
        except OSError as exc: # Guard against race condition
            pass


class UpdateBoundaryLayerTask:
    @task(bind=True)
    def get_task(self, dataset_id, dataset_queue_id, dataset_queue_name, sourcefilepath):
        print("Starting UpdateBoundaryLayerTask source_filepath={sourcefilepath} dataset_id={dataset_id} dataset_queue_name={dataset_queue_name} dataset_queue_id={dataset_queue_id}".format(sourcefilepath=sourcefilepath, dataset_id=dataset_id, dataset_queue_name=dataset_queue_name, dataset_queue_id=dataset_queue_id))

        create_log_folder()

        LOG_FILE = os.path.join(settings.LOG_DIR, "{name}.log".format(name=dataset_queue_name))

        # do_actions = ProcessDataset(dataset_id, dataset_queue_id, dataset_queue_name, sourcefilepath, settings.DATABASES['default'], LOG_FILE).start()
        # DatasetIngestionCompletedTask().get_task.apply_async(args=[dataset_id, dataset_queue_id, dataset_queue_name])
        # ActionResolver(do_actions).run_actions()
