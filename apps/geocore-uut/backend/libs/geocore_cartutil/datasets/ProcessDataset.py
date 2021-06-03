from .DatasetFactory import DatasetFactory


class ProcessDataset:
    def __init__(self, dataset_id, dataset_queue_id, dataset_queue_name, sourcefilepath, db_creds_dict, logfile):
        self.dataset_id = dataset_id
        self.dataset_queue_id = dataset_queue_id
        self.dataset_queue_name = dataset_queue_name
        self.sourcefilepath = sourcefilepath
        self.DB_DICT = db_creds_dict
        self.logfile = logfile

    def start(self):
        # determine datasource type
        dataset_class = DatasetFactory.get_dataset_source_class(self.sourcefilepath)

        dataset_driver_obj = dataset_class(self.dataset_id, self.dataset_queue_id, self.dataset_queue_name, self.sourcefilepath, self.DB_DICT, self.logfile)

        return dataset_driver_obj.ingest()
