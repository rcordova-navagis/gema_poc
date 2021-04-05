from libs.commander import Command
from .CreateCategoryCommandHandler import CreateCategoryCommandHandler
from .CreateCategoryValidator import CreateCategoryValidator


class CreateCategoryCommand(Command):
    def __init__(self, data):
        self.data = data

    def validator(self):
        return CreateCategoryValidator

    def handler(self):
        return CreateCategoryCommandHandler
