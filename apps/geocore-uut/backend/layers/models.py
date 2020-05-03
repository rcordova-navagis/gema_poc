from django.db import models
from django.contrib.auth.models import User
from datasets.models import Datasets


STATUS_TYPES = (
    ('A', 'active'),
    ('I', 'inactive')
)


class Categories(models.Model):
    class Meta:
        db_table = 'categories'

    parent_id = models.ForeignKey('self', db_column='parent_id', blank=True, null=True, db_index=True, on_delete=models.SET_NULL)
    name = models.CharField(max_length=100)
    status = models.CharField(max_length=50)


# class LayerStyles(models.Model):
#     class Meta:
#         db_table = 'layer_styles'
#     GEOM_TYPES = (
#         ('point', 'Point'),
#         ('linestring', 'Linestring'),
#         ('polygon', 'Polygon'),
#         ('multigeometry', 'Multigeometry')
#     )
#     geom_type = models.CharField(max_length=30, choices=GEOM_TYPES, blank=False, null=False)
#     icon = models.CharField(blank=True, null=True)
#     status = models.CharField(max_length=50)


class Layers(models.Model):
    class Meta:
        db_table = 'layers'

    LAYER_TYPES = (
        ('csv', 'csv'),
        ('excel', 'excel'),
        ('kml', 'kml'),
        ('kmz', 'kmz'),
        ('shapefile', 'shapefile'),
        ('geotiff', 'geotiff'),
        ('geojson', 'geojson')
    )

    category = models.ForeignKey(Categories, db_column='category_id', blank=True, null=True, on_delete=models.SET_NULL, related_name='layers')
    dataset = models.ForeignKey(Datasets, db_column='dataset_id', blank=True, null=True, on_delete=models.SET_NULL)
    name = models.CharField(max_length=100, blank=False, null=False, db_index=True)
    code = models.CharField(max_length=50)
    type = models.CharField(max_length=30,  blank=True, null=True, choices=LAYER_TYPES)
    creator = models.ForeignKey(User, db_column='created_by', blank=True, null=True, on_delete=models.SET_NULL, related_name='creator')
    created_date = models.DateTimeField(blank=False, null=False, editable=False, auto_now_add=True)
    publisher = models.ForeignKey(User, db_column='published_by', blank=True, null=True, on_delete=models.SET_NULL, related_name='publisher')
    published_date = models.DateTimeField(blank=True, null=True, editable=False)
    status = models.CharField(max_length=10, choices=STATUS_TYPES)
