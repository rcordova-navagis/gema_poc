from django.db import models
from django.contrib.gis.db import models as gismodels


class BoundaryCountries(models.Model):
    class Meta:
        db_table = 'boundaries_countries'

    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=256, null=True)
    type = models.CharField(max_length=20, null=False, default="country")
    psgc_ph = models.CharField(max_length=20, null=True)
    geom = gismodels.GeometryField(srid=4326, null=True)

    @property
    def children(self):
        return []


class BoundaryRegions(models.Model):
    class Meta:
        db_table = 'boundaries_regions'

    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=256, null=True)
    type = models.CharField(max_length=20, null=False, default="region")
    reg_code = models.CharField(max_length=20, null=True)
    reg_name = models.CharField(max_length=256, null=True)
    psgc_ph = models.CharField(max_length=20, null=True)
    geom = gismodels.GeometryField(srid=4326, null=True)
    parent = models.ForeignKey(BoundaryCountries, db_column='parent_id', null=True, db_index=True, on_delete=models.CASCADE)


class BoundaryProvinces(models.Model):
    class Meta:
        db_table = 'boundaries_provinces'

    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=256, null=True)
    type = models.CharField(max_length=20, null=False, default="province")
    reg_code = models.CharField(max_length=20, null=True)
    pro_code = models.CharField(max_length=20, null=True)
    reg_name = models.CharField(max_length=256, null=True)
    pro_name = models.CharField(max_length=256, null=True)
    psgc_ph = models.CharField(max_length=20, null=True)
    geom = gismodels.GeometryField(srid=4326, null=True)
    parent = models.ForeignKey(BoundaryRegions, db_column='parent_id', null=True, db_index=True, on_delete=models.CASCADE)


class BoundaryMunicipalities(models.Model):
    class Meta:
        db_table = 'boundaries_municipalities'

    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=256, null=True)
    type = models.CharField(max_length=20, null=False, default="municipality")
    pro_code = models.CharField(max_length=20, null=True)
    mun_code = models.CharField(max_length=20, null=True)
    reg_code = models.CharField(max_length=20, null=True)
    pro_name = models.CharField(max_length=256, null=True)
    reg_name = models.CharField(max_length=256, null=True)
    mun_name = models.CharField(max_length=256, null=True)
    psgc_ph = models.CharField(max_length=20, null=True)
    geom = gismodels.GeometryField(srid=4326, null=True)
    parent = models.ForeignKey(BoundaryProvinces, db_column='parent_id', null=True, db_index=True, on_delete=models.CASCADE)


class BoundaryBarangays(models.Model):
    class Meta:
        db_table = 'boundaries_barangays'

    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=256, null=True)
    type = models.CharField(max_length=20, null=False, default="barangay")
    pro_code = models.CharField(max_length=20, null=True)
    mun_code = models.CharField(max_length=20, null=True)
    reg_code = models.CharField(max_length=20, null=True)
    bgy_code = models.CharField(max_length=20, null=True)
    pro_name = models.CharField(max_length=256, null=True)
    reg_name = models.CharField(max_length=256, null=True)
    mun_name = models.CharField(max_length=256, null=True)
    bgy_name = models.CharField(max_length=256, null=True)
    psgc_ph = models.CharField(max_length=20, null=True)
    geom = gismodels.GeometryField(srid=4326, null=True)
    parent = models.ForeignKey(BoundaryMunicipalities, db_column='parent_id', blank=True, null=True, db_index=True, on_delete=models.CASCADE)
