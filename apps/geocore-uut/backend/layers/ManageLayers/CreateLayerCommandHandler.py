from libs.commander import Command, CommandHandler
from layers.models import Layers


class CreateLayerCommandHandler(CommandHandler):
    def handle(self, command: Command):
        # print(command.__class__.__name__, ' handle function just executed with params='+command.name)
        layer = Layers.objects.create(name=command.name, category_id=command.category_id, code=command.code, creator_id=command.user_id)
        # layer.creator_id = command.user_id
        # layer.save()
        return layer
