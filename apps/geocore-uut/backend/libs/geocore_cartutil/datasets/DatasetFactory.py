from .sources.constants import DATASOURCE_EXCEL_TYPES, DATASOURCE_KML_TYPES
from .sources.Csv import Csv
from .sources.Excel import Excel
from .sources.Kml import Kml
import os


class DatasetFactory:

    @staticmethod
    def get_datasource_type_by_ext(sourcefilepath):
        filename, ext = os.path.splitext(os.path.basename(sourcefilepath))
        return ext

    @staticmethod
    def get_dataset_source_class(sourcefilepath):
        type = DatasetFactory.get_datasource_type_by_ext(sourcefilepath)

        if type in DATASOURCE_EXCEL_TYPES:
            return Excel
        elif type in DATASOURCE_KML_TYPES:
            return Kml
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

