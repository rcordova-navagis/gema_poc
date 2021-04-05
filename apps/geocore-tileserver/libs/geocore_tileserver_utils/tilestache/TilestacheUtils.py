from sys import stderr, path, version
from ModestMaps.Core import Coordinate
from TileStache import MBTiles
from os.path import realpath, dirname

try:
    from urllib.parse import urlparse
    from urllib.request import urlopen
except ImportError:
    from urlparse import urlparse
    from urllib import urlopen

try:
    from json import dump as json_dump
    from json import load as json_load
except ImportError:
    from simplejson import dump as json_dump
    from simplejson import load as json_load

PY2 = bool(version.startswith('2.'))

TILESTACHE_DEFAULT_ALLOWED_ORIGIN = '*'
TILESTACHE_LAYER_OPTIONS_DEFAULT_VALUES = {
    'write_cache': True,
}

TILESTACHE_LAYER_OPTIONS = [
    ('projection', 'projection'),
    ('metatile', 'metatile'),
    ('cache_lifespan', 'cache lifespan'),
    ('write_cache', 'write cache'),
    ('bounds', 'bounds'),
    ('preview', 'preview'),
    ('max_cache_age', 'maximum cache age'),
    ('tile_height', 'tile height'),
    ('redirects', 'redirects'),
    ('state_lock_timeout', 'stale lock timeout'),
]


class TilestacheUtils:

    @staticmethod
    def get_layer_option(layer_tilestache_model, tilestache_cache_dict):
        layer_options = {
            'provider': layer_tilestache_model.provider,
            'allowed origin': layer_tilestache_model.allowed_origin if layer_tilestache_model.allowed_origin is not None else TILESTACHE_DEFAULT_ALLOWED_ORIGIN,
        }

        for option in TILESTACHE_LAYER_OPTIONS:
            key, name = option
            if hasattr(layer_tilestache_model, key) and getattr(layer_tilestache_model, key) is not None:
                layer_options[name] = getattr(layer_tilestache_model, key)
            elif (not hasattr(layer_tilestache_model, key) or getattr(layer_tilestache_model, key) is None) and key in TILESTACHE_LAYER_OPTIONS_DEFAULT_VALUES:
                layer_options[name] = TILESTACHE_LAYER_OPTIONS_DEFAULT_VALUES[key]

        options = {
            'cache': tilestache_cache_dict,
            'layers': {
                layer_tilestache_model.name: layer_options
            }
        }

        return options

    @staticmethod
    def generateCoordinates(ul, lr, zooms, padding):
        """ Generate a stream of (offset, count, coordinate) tuples for seeding.

            Flood-fill coordinates based on two corners, a list of zooms and padding.
        """
        # start with a simple total of all the coordinates we will need.
        count = 0

        for zoom in zooms:
            ul_ = ul.zoomTo(zoom).container().left(padding).up(padding)
            lr_ = lr.zoomTo(zoom).container().right(padding).down(padding)

            rows = lr_.row + 1 - ul_.row
            cols = lr_.column + 1 - ul_.column

            count += int(rows * cols)

        # now generate the actual coordinates.
        # offset starts at zero
        offset = 0

        for zoom in zooms:
            ul_ = ul.zoomTo(zoom).container().left(padding).up(padding)
            lr_ = lr.zoomTo(zoom).container().right(padding).down(padding)

            range_ = xrange if PY2 else range

            for row in range_(int(ul_.row), int(lr_.row + 1)):
                for column in range_(int(ul_.column), int(lr_.column + 1)):
                    coord = Coordinate(row, column, zoom)

                    yield (offset, count, coord)

                    offset += 1

    @staticmethod
    def listCoordinates(filename):
        """ Generate a stream of (offset, count, coordinate) tuples for seeding.

            Read coordinates from a file with one Z/X/Y coordinate per line.
        """
        coords = (line.strip().split('/') for line in open(filename, 'r'))
        coords = (map(int, (row, column, zoom)) for (zoom, column, row) in coords)
        coords = [Coordinate(*args) for args in coords]

        count = len(coords)

        for (offset, coord) in enumerate(coords):
            yield (offset, count, coord)

    @staticmethod
    def tilesetCoordinates(filename):
        """ Generate a stream of (offset, count, coordinate) tuples for seeding.

            Read coordinates from an MBTiles tileset filename.
        """
        coords = MBTiles.list_tiles(filename)
        count = len(coords)

        for (offset, coord) in enumerate(coords):
            yield (offset, count, coord)

    @staticmethod
    def parseConfig(configpath):
        """ Parse a configuration file and return a raw dictionary and dirpath.

            Return value can be passed to TileStache.Config.buildConfiguration().
        """
        if urlparse(configpath).scheme in ('', 'file'):
            with open(urlparse(configpath).path) as file:
                config_dict = json_load(file)
        else:
            config_dict = json_load(urlopen(configpath))

        scheme, host, path, p, q, f = urlparse(configpath)

        if scheme == '':
            scheme = 'file'
            path = realpath(path)

        dirpath = '%s://%s%s' % (scheme, host, dirname(path).rstrip('/') + '/')

        return config_dict, dirpath