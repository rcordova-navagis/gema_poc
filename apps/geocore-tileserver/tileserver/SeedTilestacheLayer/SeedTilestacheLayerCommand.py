from libs.commander import Command
from .SeedTilestacheLayerCommandHandler import SeedTilestacheLayerCommandHandler
from .SeedTilestacheLayerValidator import SeedTilestacheLayerValidator


class SeedTilestacheLayerCommand(Command):
    def __init__(self, layer_name, params, cache):
        self.name = layer_name
        self.params = params
        self.cache = cache

    def validator(self):
        return SeedTilestacheLayerValidator

    def handler(self):
        return SeedTilestacheLayerCommandHandler
