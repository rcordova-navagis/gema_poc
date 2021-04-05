from libs.commander import Command
from .CreateDatasetCommandHandler import CreateDatasetCommandHandler
from .CreateDatasetValidator import CreateDatasetValidator


class CreateDatasetCommand(Command):
    def __init__(self, file, uploader_user_id):
        self.file = file
        self.uploader_user_id = uploader_user_id

    def validator(self):
        return CreateDatasetValidator

    def handler(self):
        return CreateDatasetCommandHandler
