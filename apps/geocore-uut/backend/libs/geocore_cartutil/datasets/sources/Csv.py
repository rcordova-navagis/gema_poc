import os
import pandas as pd
import geopandas
import stat
import logging
from django.utils.text import slugify
from ...utils.PointHelper import PointHelper


# TODO extract all this to a configuration or constants
DEFAULT_PROJECTION = "EPSG:4326"
LATITUDE_NAMES = ['latitude', 'lat', 'x']
LONGITUDE_NAMES = ['longitude', 'lng', 'lon', 'y']


class Csv:
    def __init__(self, dataset_id, dataset_queue_id, dataset_queue_name, sourcefilepath, db_creds_dict, logfile):
        self.dataset_id = dataset_id
        self.dataset_queue_id = dataset_queue_id
        self.dataset_queue_name = dataset_queue_name
        self.sourcefilepath = sourcefilepath
        self.DB_DICT = db_creds_dict
        self.DB_CONN_STRING = self.get_db_conn_string(db_creds_dict)
        self.logger = self.create_logger(logfile)
        print("CSV dataset_id={dataset_id}, dataset_queue_id={dataset_queue_id}, sourcefilepath={sourcefilepath} dataset_queue_name={dataset_queue_name}".format(dataset_id=dataset_id, dataset_queue_id=dataset_queue_id, sourcefilepath=sourcefilepath, dataset_queue_name=dataset_queue_name))

    def create_logger(self, logfile):
        fileh = logging.FileHandler(logfile, 'a')
        formatter = logging.Formatter('%(asctime)s - %(name)s: %(message)s')
        fileh.setFormatter(formatter)
        log = logging.getLogger(self.dataset_queue_name)
        log.addHandler(fileh)
        return log

    def get_db_conn_string(self, db_creds_dict):
        return "PG:\"dbname={dbname} host={dbhost} port={dbport} user={dbuser} password={dbpassword}\"".format(dbname=db_creds_dict['NAME'], dbhost=db_creds_dict['HOST'], dbport=db_creds_dict['PORT'], dbuser=db_creds_dict['USER'], dbpassword=db_creds_dict['PASSWORD'])

    def clean_columns(self, raw_columns):
        cleaned_cols = {}
        for col in raw_columns:
            cleaned_cols[col] = slugify(col, allow_unicode=True).replace('-','_')
        return cleaned_cols

    def get_geom_columns(self, cleaned_cols_dict):
        geom_cols = {'LATITUDE': None, 'LONGITUDE': None}
        for raw_col, cleaned_col in cleaned_cols_dict.items():
            if cleaned_col.lower() in LATITUDE_NAMES:
                geom_cols['LATITUDE'] = cleaned_col
            elif cleaned_col.lower() in LONGITUDE_NAMES:
                geom_cols['LONGITUDE'] = cleaned_col
        return geom_cols

    def create_sourcefilename(self, postfix_title="_tmp"):
        filename, ext = os.path.splitext(os.path.basename(self.sourcefilepath))
        dir = os.path.dirname(self.sourcefilepath)
        newfilename = filename + postfix_title if postfix_title is not None else filename
        return {
            'filename': newfilename,
            'dir': dir
        }

    def get_new_sourcefilename(self, ext=None, postfix_title="_tmp"):
        _filename, _ext = os.path.splitext(os.path.basename(self.sourcefilepath))
        new_filename_dict = self.create_sourcefilename(postfix_title)
        if ext is None:
            ext = _ext
        return os.path.join(new_filename_dict['dir'], new_filename_dict['filename']+ext)

    def create_vrt_file(self, dataset_name, sourcefilename):
        vrt_str = """<OGRVRTDataSource> 
            <OGRVRTLayer name="{dataset_name}"> 
                <SrcLayer>{dataset_name}</SrcLayer>
                <SrcDataSource relativeToVRT="1">{sourcefilename}</SrcDataSource> 
                <GeometryField encoding="WKT" name="geom" field="geometry">
                    <GeometryType>wkbPoint</GeometryType>
                    <SRS>{projection}</SRS>
                </GeometryField>
            </OGRVRTLayer> 
        </OGRVRTDataSource>""".format(dataset_name=dataset_name, sourcefilename=sourcefilename, projection=DEFAULT_PROJECTION)
        vrt_filepath = self.get_new_sourcefilename('.vrt', None)
        file = open(vrt_filepath, "w")
        file.write(vrt_str)
        file.close()
        return vrt_filepath

    def ingest_ogr(self, tablename, vrt_filepath):
        ogr_cmd = "ogr2ogr -f \"PostGreSQL\" {db_con} {vrt_filepath} -nln {tablename}".format(
            db_con=self.DB_CONN_STRING,
            vrt_filepath=vrt_filepath,
            tablename=tablename
        )
        print("ogr command: {ogr_cmd}".format(ogr_cmd=ogr_cmd))
        os.system(ogr_cmd)

    def ingest(self):
        df = pd.read_csv(self.sourcefilepath, engine='python')
        # TODO: add method to check geom type, right now csv is fixed for Point

        # add row_no column
        df['row_no'] = df.reset_index().index + 1

        # save this to dataset_columns
        raw_columns = list(df.columns)

        # clean headers and update csv
        cleaned_cols_dict = self.clean_columns(raw_columns)

        # rename cols from cleaned one and return new  version
        df.rename(columns=cleaned_cols_dict, inplace=True)

        # get lat,lng columns
        geom_cols = self.get_geom_columns(cleaned_cols_dict)
        # TODO: add geom_columns to dataset_columns table

        if geom_cols['LATITUDE'] is None or geom_cols['LONGITUDE'] is None:
            raise Exception('No Latitude/Longitude field found on csv file.')

        rows_with_invalid_latlng = []
        # add validation and log rows with issue
        for index, row in df.iterrows():
            validate_coords = PointHelper.validate_latlng(row[geom_cols['LATITUDE']], row[geom_cols['LONGITUDE']])
            if validate_coords is not True:
                message = "row={row_no} error({message})".format(row_no=row['row_no'], message=validate_coords)
                self.logger.info(message)
                rows_with_invalid_latlng.append(row['row_no'])
                # TODO: insert error on dataset_queue_errors

        # TODO: update  dataset_queue has_errors to true if rows_with_invalid_latlng len > 0

        # create new csv
        filtered_df = df.query('row_no not in @rows_with_invalid_latlng', inplace=False)
        filtered_df['geometry'] = df.apply(lambda row: "POINT({lon} {lat})".format(lat=row[geom_cols['LATITUDE']], lon=row[geom_cols['LONGITUDE']]), axis=1)

        os.remove(self.sourcefilepath)
        new_sourcefilepath = self.sourcefilepath

        filtered_df.to_csv(new_sourcefilepath)
        os.chmod(new_sourcefilepath, stat.S_IRWXU | stat.S_IRWXG | stat.S_IRWXO)

        while True:
            if os.path.isfile(new_sourcefilepath):
                print("PATH EXISTS "+new_sourcefilepath)
                break

        # create vrtfile
        vrt_filepath = self.create_vrt_file(self.dataset_queue_name, os.path.basename(new_sourcefilepath))
        # ingest data using ogr2ogr
        self.ingest_ogr(self.dataset_queue_name, vrt_filepath)

        # TODO: publish event or update data_queues table progress here