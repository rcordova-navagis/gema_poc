import os
from rest_framework.views import APIView
from django.http import JsonResponse, HttpResponse
from django.conf import settings
from django.core.files.storage import default_storage
from zipfile import ZipFile
from django.db import connection
from .models import BoundaryCountries, BoundaryRegions, BoundaryProvinces, BoundaryMunicipalities, BoundaryBarangays
from .serializers import CountrySerializer
from django.core.cache import cache
from .constants import BARANGAY_TABLE_NAME_SOURCE, CACHE_BOUNDARY_HIERARCHY


class BoundariesView(APIView):

    def extract_zip(self, filepath):
        filename, ext = os.path.splitext(os.path.basename(filepath))
        dir = os.path.dirname(filepath)

        zipObj = ZipFile(filepath, 'r')

        extract_dir = os.path.join(dir, filename)

        print("EXTRACT DIR: {0}".format(extract_dir))

        zipObj.extractall(extract_dir)
        zipObj.close()

        shapefile = [f for f in zipObj.namelist() if '.shp' in f.lower()][0]

        return os.path.join(dir, filename, os.path.basename(shapefile))


    def ingest_to_ogr(self, shapefile, tablename):
        db_creds_dict = settings.DATABASES['default']
        db_con_str = "PG:\"dbname={dbname} host={dbhost} port={dbport} user={dbuser} password={dbpassword}\"".format(dbname=db_creds_dict['NAME'], dbhost=db_creds_dict['HOST'], dbport=db_creds_dict['PORT'], dbuser=db_creds_dict['USER'], dbpassword=db_creds_dict['PASSWORD'])

        ogr_cmd = "ogr2ogr -f \"PostGreSQL\" {db_con} {shapefile} -nlt PROMOTE_TO_MULTI -nln {tablename} -lco GEOMETRY_NAME=geom".format(
            db_con=db_con_str,
            shapefile=shapefile,
            tablename=tablename
        )

        print("ogr command: {ogr_cmd}".format(ogr_cmd=ogr_cmd))
        os.system(ogr_cmd)

        cursor = connection.cursor()
        if tablename not in connection.introspection.table_names():
            raise Exception("BARANGAY SOURCE DOESNT EXIST")


    def post(self, request):
        if 'sourcefile' not in request.FILES:
            return HttpResponse('Error: boundaries view post', status=401)

        f = request.FILES['sourcefile']
        save_path = os.path.join(settings.MEDIA_ROOT, 'uploads/uut/boundaries', f.name)

        if default_storage.exists(save_path):
            default_storage.delete(save_path)

        path = default_storage.save(save_path, f)

        # extract zipfile
        shapefile_path = self.extract_zip(path)

        # ingest shapefile to table using ogr2ogr
        self.ingest_to_ogr(shapefile_path, BARANGAY_TABLE_NAME_SOURCE)

        # fill in boundaries table
        # start with country -> region -> prov -> mun -> brgy
        # make sure to associate the tables on parent_id
        return HttpResponse(shapefile_path)


    def get_barangays(self, mun_id):
        return BoundaryBarangays.objects.filter(parent_id=mun_id).values('id', 'psgc_ph', 'name', 'parent_id', 'type').all()


    def get_municipalities(self, prov_id):
        municipalities = BoundaryMunicipalities.objects.filter(parent_id=prov_id).values('id', 'psgc_ph', 'name', 'parent_id', 'type').all()
        for item in municipalities:
            item['children'] = self.get_barangays(item['id'])
        return municipalities


    def get_provinces(self, reg_id):
        provinces = BoundaryProvinces.objects.filter(parent_id=reg_id).values('id', 'psgc_ph', 'name', 'parent_id', 'type').all()
        for item in provinces:
            item['children'] = self.get_municipalities(item['id'])
        return provinces


    def get_regions(self, cty_id):
        regions = BoundaryRegions.objects.filter(parent_id=cty_id).values('id', 'psgc_ph', 'name', 'parent_id', 'type').all()
        for item in regions:
            item['children'] = self.get_provinces(item['id'])
        return regions


    def get_country(self):
        country = BoundaryCountries.objects.values('id', 'psgc_ph', 'name', 'type').first()
        country['children'] = self.get_regions(country['id'])
        return country


    def get_boundary_hierarchy(self):
        country = self.get_country()
        serializer = CountrySerializer(country, many=False)
        return JsonResponse(serializer.data, safe=False)


    def get(self, request):
        hierarchy = cache.get(CACHE_BOUNDARY_HIERARCHY)
        if hierarchy is None:
            hierarchy = self.get_boundary_hierarchy()
            cache.set(CACHE_BOUNDARY_HIERARCHY, hierarchy, timeout=None)
        return hierarchy
