from libs.commander import Command, CommandHandler
from django_tilestache.models import Layer
from libs.geocore_tileserver_utils import TilestacheUtils, TilestacheSeeder


class SeedTilestacheLayerCommandHandler(CommandHandler):

    def handle(self, command: Command):
        layer = Layer.objects.filter(name=command.name).first()

        if layer is None:
            raise Layer.DoesNotExist("Cannot find layer: {layer_name}".format(layer_name=command.name))

        param_options = {
            'bbox': tuple(map(float, command.params['bbox'].split(' '))),
            'zooms': list(map(int, command.params['zooms'].split(' '))),
            'extension': command.params['extension'],
        }

        if 'padding' in command.params:
            param_options['padding'] = command.params['padding']

        config = TilestacheUtils.get_layer_option(layer, command.cache)
        print(config)

        options = {
            'config': config,
            'name': layer.name
        }

        options.update(param_options)

        return TilestacheSeeder(options).start_seed()
