from libs.commander import Command
from .CreateLayerCommandHandler import CreateLayerCommandHandler
from .CreateLayerValidator import CreateLayerValidator
from datetime import datetime


def create_layer_code(user_id):
    return 'layer_'+str(user_id)+'_'+datetime.now().strftime('%Y%m%d%H%M%S')


class CreateLayerCommand(Command):
    def __init__(self, data):
        self.name = data['name']
        self.category_id = int(data['category_id'])
        self.code = create_layer_code(data['user_id'])
        self.user_id = int(data['user_id'])

    def handler(self):
        return CreateLayerCommandHandler

    def validator(self):
        return CreateLayerValidator
