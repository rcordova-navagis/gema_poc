import os
from .sources.constants import DATASOURCE_EXCEL_TYPES, DATASOURCE_KML_TYPES, DATASOURCE_ZIP_TYPES
from .sources.Csv import Csv
from .sources.Excel import Excel
from .sources.Kml import Kml
from .sources.Shapefile import Shapefile
from zipfile import ZipFile


class DatasetFactory:

    @staticmethod
    def get_datasource_type_by_ext(sourcefilepath):
        filename, ext = os.path.splitext(os.path.basename(sourcefilepath))
        return ext


    @staticmethod
    def is_shapefile(sourcefilepath):
        try:
            zipObj = ZipFile(sourcefilepath, 'r')
            files = zipObj.namelist()
            zipObj.close()
            result = ['.shp' in f.lower() for f in files]
            return len(result) > 0
        except:
            return False

    @staticmethod
    def get_dataset_source_class(sourcefilepath):
        type = DatasetFactory.get_datasource_type_by_ext(sourcefilepath)

        if type in DATASOURCE_EXCEL_TYPES:
            return Excel
        elif type in DATASOURCE_KML_TYPES:
            return Kml
        elif DatasetFactory.is_shapefile(sourcefilepath):
            return Shapefile
        # elif type in constants.DATASOURCE_KMZ_TYPE:
        #     return Kmz
        # elif type in constants.DATASOURCE_SHAPEFILE_TYPE:
        #     return Shapefile
        # elif type in constants.DATASOURCE_GEOTIFF_TYPE:
        #     return Geotiff
        # elif type in constants.DATASOURCE_ZIP_TYPES:
        #     return Zip
        # elif type in constants.DATASOURCE_TARBALL_TYPES:
        #     return Tarball
        else:
            # default is csv
            return Csv

    @staticmethod
    def get_dataset_content_type(data):
        return None

    # @staticmethod
    # def process_dataset(table_name, dataset_filepath):
    #     type = DatasetFactory.get_dataset_type()
    #
    #     class_name = DatasetFactory.get_dataset_class(type)

