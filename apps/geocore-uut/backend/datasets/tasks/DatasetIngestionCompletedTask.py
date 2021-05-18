from celery import task
from ..models import Datasets, DatasetQueues
from ..services import link_dataset_queue, transfer_dataset_queue_data
from layers.services import add_tilestache_layer


class DatasetIngestionCompletedTask:
    @task(bind=True)
    def get_task(self, dataset_id, dataset_queue_id, dataset_queue_name):
        # TODO: extract below to a pubsub style when processdataset task has completed or progress = 100 then do below
        layer = add_tilestache_layer(dataset_queue_name)

        ds = Datasets.objects.get(pk=dataset_id)
        if ds:
            ds.tilestache_layer_id = layer.pk
            ds.save()

        dsq = DatasetQueues.objects.get(pk=dataset_queue_id)
        if dsq:
            dsq.progress = 100
            dsq.save()

            link_dataset_queue(dataset_queue_name, dataset_queue_id)

            transfer_dataset_queue_data(dataset_id, dataset_queue_name)

            # TODO: insert columns to dataset_queue_columns
