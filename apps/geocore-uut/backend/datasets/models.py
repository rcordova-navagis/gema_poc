from django.db import models
from django.contrib.gis.db import models as gismodels
from django.contrib.auth.models import User
from django.contrib.postgres.fields import JSONField
from datetime import datetime
import os
from django.utils.deconstruct import deconstructible
from django_tilestache.models import Layer


@deconstructible
class DatasetUploadPath(object):
    def __call__(self, instance, filename):
        ext = filename.split('.')[-1]
        timestamp = datetime.now().strftime('%Y%m%d%H%M%S')
        filename = "dataset_{uploader_id}_{timestamp}.{ext}".format(uploader_id=instance.uploader.id, timestamp=timestamp, ext=ext)
        return os.path.join('uploads/uut/datasets', filename)


dataset_upload_path = DatasetUploadPath()


class DatasetQueues(models.Model):
    class Meta:
        db_table = 'dataset_queues'

    FILE_TYPES = (
        ('csv', 'CSV'),
        ('xls', 'Excel'),
        ('xlsx', 'Excel'),
        ('kml', 'KML'),
        ('kmz', 'KMZ'),
        ('shp', 'Shapefile'),
        ('zip', 'Zipfile'),
        ('tiff', 'GeoTIFF'),
        ('json', 'GeoJSON'),
        ('geojson', 'GeoJSON')
    )

    name = models.CharField(max_length=100, blank=True, null=True)
    uploader = models.ForeignKey(User, db_column='uploaded_by', blank=True, null=True, on_delete=models.SET_NULL, related_name='uploader')
    uploaded_date = models.DateTimeField(blank=False, null=False, editable=False, auto_now_add=True)
    sourcefile = models.FileField(upload_to=dataset_upload_path, blank=True, null=True)
    progress = models.IntegerField(blank=False, null=False, default=0)
    has_errors = models.BooleanField(default=False)
    status = models.CharField(max_length=10, default='A')


class DatasetQueueErrors(models.Model):
    class Meta:
        db_table = 'dataset_queue_errors'
        unique_together = (('dataset_queue_id', 'row_no'),)

    dataset_queue = models.ForeignKey(DatasetQueues, db_column='dataset_queue_id', blank=True, null=True, on_delete=models.CASCADE)
    row_no = models.IntegerField(blank=False, null=False, primary_key=True)
    error = models.TextField(blank=False, null=False)


class Datasets(models.Model):
    class Meta:
        db_table = 'datasets'

    dataset_queue = models.ForeignKey(DatasetQueues, db_column='dataset_queue_id', blank=True, null=True, on_delete=models.SET_NULL, related_name='dataset_queue')
    tilestache_layer = models.ForeignKey(Layer, db_column='tilestache_layer_id', blank=True, null=True, on_delete=models.SET_NULL, related_name='tilestache_layer')


class DatasetColumns(models.Model):
    class Meta:
        db_table = 'dataset_columns'
        unique_together = (('dataset_id', 'col_no'),)

    dataset = models.ForeignKey(Datasets, db_column='dataset_id', blank=True, null=True, on_delete=models.CASCADE)
    col_no = models.IntegerField(blank=False, null=False)
    raw_name = models.CharField(max_length=100, blank=False, null=False, db_index=True)
    name = models.CharField(max_length=100, blank=False, null=False, db_index=True)
    is_geom = models.BooleanField(default=False)
    is_pk = models.BooleanField(default=False)


# class DatasetColumnInfowindow(models.Model):
#     dataset = models.ForeignKey(Datasets, db_column='dataset_id', blank=True, null=True, on_delete=models.CASCADE)
#     col_no = models.IntegerField(blank=False, null=False)
#     group_id = models.ForeignKey(UserGroups, db_column='group_id', blank=True, null=True, on_delete=models.CASCADE)


class DatasetData(models.Model):
    class Meta:
        db_table = 'dataset_data'
        unique_together = (('dataset_id', 'row_no'),)

    dataset = models.ForeignKey(Datasets, db_column='dataset_id', blank=True, null=True, on_delete=models.CASCADE)
    row_no = models.IntegerField(blank=False, null=False)
    data_pk = models.CharField(max_length=100, blank=True, null=True)
    geom = gismodels.GeometryField(srid=4326, blank=True, null=True)
    data = JSONField(blank=True, null=True)


# class Upload(models.Model):
#     upload_file = models.FileField()
#     upload_date = models.DateTimeField(auto_now_add=True)
