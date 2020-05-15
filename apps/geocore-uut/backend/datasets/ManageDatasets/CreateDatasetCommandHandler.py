from libs.commander import Command, CommandHandler
from ..models import Datasets, DatasetQueues
from ..tasks.IngestDatasetTask import IngestDatasetTask
from datetime import datetime


class CreateDatasetCommandHandler(CommandHandler):
    def handle(self, command: Command):
        print(command.__class__.__name__, ' handle function just executed')

        current_time = datetime.now()
        timestamp = current_time.strftime('%Y%m%d%H%M%S')

        # create dataset_queues record
        dataset_queue = DatasetQueues(
            name="dataset_{uploader_id}_{timestamp}".format(uploader_id=command.uploader_user_id, timestamp=timestamp),
            uploaded_date=current_time,
            uploader_id=command.uploader_user_id
        )
        dataset_queue.sourcefile = command.file
        dataset_queue.save()

        # create dataset record
        dataset = Datasets.objects.create(dataset_queue_id=dataset_queue.pk)
        dataset.save()

        # start parsing and ingest process
        IngestDatasetTask().get_task.apply_async(args=[dataset.pk, dataset_queue.pk, dataset_queue.name, dataset_queue.sourcefile.path])

        return dataset
