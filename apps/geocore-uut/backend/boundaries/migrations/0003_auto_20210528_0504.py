# Generated by Django 3.0.4 on 2021-05-27 21:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('boundaries', '0002_auto_20210527_2229'),
    ]

    operations = [
        migrations.AddField(
            model_name='boundarybarangays',
            name='type',
            field=models.CharField(default='barangay', max_length=20),
        ),
        migrations.AddField(
            model_name='boundarycountries',
            name='type',
            field=models.CharField(default='country', max_length=20),
        ),
        migrations.AddField(
            model_name='boundarymunicipalities',
            name='type',
            field=models.CharField(default='municipality', max_length=20),
        ),
        migrations.AddField(
            model_name='boundaryprovinces',
            name='type',
            field=models.CharField(default='province', max_length=20),
        ),
        migrations.AddField(
            model_name='boundaryregions',
            name='type',
            field=models.CharField(default='region', max_length=20),
        ),
    ]
