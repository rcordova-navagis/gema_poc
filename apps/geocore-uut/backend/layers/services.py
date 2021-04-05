from django_tilestache.models import Layer
from django.conf import settings

PROJECTION_SPHERICAL_MERCATOR = '900913'
database_dict = settings.DATABASES['default']


def add_tilestache_layer(dataset_queue_name):
    return Layer.objects.create(
        **{
            "name": dataset_queue_name,
            "provider": {
                "class": "TileStache.Goodies.VecTiles:Provider",
                "kwargs": {
                    "clip": False,
                    "dbinfo": {
                        "host": database_dict['HOST'],
                        "port": database_dict['PORT'],
                        "database": database_dict['NAME'],
                        "user": database_dict['USER'],
                        "password": database_dict['PASSWORD']
                    },
                    "queries": [
                        "SELECT ST_Transform(geom, {spmerc}) AS __geometry__, * FROM {dataset_queue_name}".format(dataset_queue_name=dataset_queue_name, spmerc=PROJECTION_SPHERICAL_MERCATOR)
                    ]
                }
            }
        }
    )