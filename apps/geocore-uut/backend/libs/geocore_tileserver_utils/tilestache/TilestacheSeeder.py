from sys import stderr
from TileStache import getTile, Config
from TileStache.Core import KnownUnknown
from TileStache.Config import buildConfiguration
from ModestMaps.Geo import Location
from .TilestacheUtils import TilestacheUtils

try:
    from json import dump as json_dump
    from json import load as json_load
except ImportError:
    from simplejson import dump as json_dump
    from simplejson import load as json_load

DEFAULT_VALUES = {
    'extension': 'png',
    'progressfile': None,
    'verbose': True,
    'padding': 0,
    'outputdirectory': None,
    'tile_list': None,
    'error_list': None,
    'mbtiles_output': None,
    's3_output': None,
    'mbtiles_input': None,
    'tile_list': None,
    'error_list': None,
    'enable_retries': 2,
    'ignore_cached': True,
    'callback': None,
}


class TilestacheSeeder:
    """
        example option parameter:
        {
            'layer': 'osmpoints',
            'extension': 'pbf',
            'bbox': '22.024546 144.711914 1.999106 102.897949',
            'zooms': '1 2 3 4 5',
            'config': {
                'cache': {
                    'name': 'Redis',
                    'host': 'geocore-redis',
                    'port': 6379,
                    'db': 0,
                    'key prefix': 'geocore'
                },
                'layers': {
                    'osmpoints': {
                        'allowed origin': '*',
                        'provider': {
                            'class':'TileStache.Goodies.VecTiles:Provider',
                            'kwargs': {
                                'dbinfo': {
                                    'host':'geocore-pgdb',
                                    'port':'5432',
                                    'database':'gemapocdb',
                                    'user':'geocoreuser',
                                    'password':'mYge0cor3'
                                 },
                                'queries': [
                                    'SELECT way AS __geometry__, osm_id, name AS road_name FROM planet_osm_point'
                                 ]
                             }
                         }
                     }
                }
            }
        }
    """
    def __init__(self, options):
        self.options = options

    def assign_default_value(self, options):
        for key, default_value in DEFAULT_VALUES.items():
            if key not in options or options[key] is None:
                options[key] = default_value
        return options

    def get_bbox(self, bbox):
        lat1, lon1, lat2, lon2 = bbox
        south, west = min(lat1, lat2), min(lon1, lon2)
        north, east = max(lat1, lat2), max(lon1, lon2)
        return {'south': south, 'north': north, 'east': east, 'west': west}

    def validate_bbox(self, bbox_dict):
        if not (-90.0 < bbox_dict['south'] < 90.0) or not (-90.0 < bbox_dict['north'] < 90.0):
            raise KnownUnknown(
                'Latitude must be a value between -90 and 90 '
                '(Hint: Maybe you did long/lat instead of lat/long?).'
            )
        if not (-180.0 < bbox_dict['west'] < 180.0) or not (-180.0 < bbox_dict['east'] < 180.0):
            raise KnownUnknown(
                'Longitude must be a value between -180 and 180.'
            )

    def get_coordinates(self, options, coords_options):
        if options['tile_list']:
            return TilestacheUtils.listCoordinates(options['tile_list'])
        elif options['mbtiles_input']:
            return TilestacheUtils.tilesetCoordinates(options['mbtiles_input'])

        return TilestacheUtils.generateCoordinates(coords_options['ul'], coords_options['lr'], coords_options['zooms'], coords_options['padding'])

    def start_seed(self):
        print("TilestacheSeeder run seed")

        options = self.assign_default_value(self.options)

        config = buildConfiguration(options['config'])
        layer = config.layers[options['name']]

        bbox = self.get_bbox(options['bbox'])

        self.validate_bbox(bbox)

        northwest = Location(bbox['north'], bbox['west'])
        southeast = Location(bbox['south'], bbox['east'])
        ul = layer.projection.locationCoordinate(northwest)
        lr = layer.projection.locationCoordinate(southeast)

        coordinates = self.get_coordinates(options, {'ul': ul, 'lr': lr, 'zooms': options['zooms'], 'padding': options['padding']})
        ignore_cached = options['ignore_cached']
        extension = options['extension']
        verbose = options['verbose']

        for (offset, count, coord) in coordinates:
            path = '%s/%d/%d/%d.%s' % (layer.name(), coord.zoom, coord.column, coord.row, options['extension'])
            progress = {"tile": path,
                        "offset": offset + 1,
                        "total": count}
            #
            # Fetch a tile.
            #
            attempts = options['enable_retries']
            rendered = False

            while not rendered:
                if verbose:
                    print('%(offset)d of %(total)d...' % progress, end=' ', file=stderr)
                    # print("{offset} of {total}...".format(offset=progress['offset'], total=progress['total']))

                try:
                    mimetype, content = getTile(layer, coord, extension, ignore_cached)
                    if mimetype and 'json' in mimetype and options['callback']:
                        js_path = '%s/%d/%d/%d.js' % (layer.name(), coord.zoom, coord.column, coord.row)
                        js_body = '%s(%s);' % (options['callback'], content)
                        js_size = len(js_body) / 1024
                        layer.config.cache.save(js_body, layer, coord, 'JS')
                        print('%s (%dKB)' % (js_path, js_size), end=' ', file=stderr)
                    elif options['callback']:
                        print('(callback ignored)', end=' ', file=stderr)
                except:
                    #
                    # Something went wrong: try again? Log the error?
                    #
                    attempts -= 1

                    if verbose:
                        print('Failed %s, will try %s more.' % (progress['tile'], ['no', 'once', 'twice'][attempts]), file=stderr)

                    if attempts == 0:
                        if not options['error_list']:
                            raise

                        fp = open(options['error_list'], 'a')
                        fp.write('%(zoom)d/%(column)d/%(row)d\n' % coord.__dict__)
                        fp.close()
                        break
                else:
                    #
                    # Successfully got the tile.
                    #
                    rendered = True
                    progress['size'] = '%dKB' % (len(content) / 1024)

                    if verbose:
                        print('%(tile)s (%(size)s)' % progress, file=stderr)

            if options['progressfile']:
                fp = open(options['progressfile'], 'w')
                json_dump(progress, fp)
                fp.close()