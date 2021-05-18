# Generated by Django 3.0.4 on 2020-05-03 14:25

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('django_tilestache', '0001_initial'),
        ('datasets', '0004_datasetcolumns_raw_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='datasets',
            name='tilestache_layer',
            field=models.ForeignKey(blank=True, db_column='tilestache_layer_id', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='tilestache_layer', to='django_tilestache.Layer'),
        ),
    ]