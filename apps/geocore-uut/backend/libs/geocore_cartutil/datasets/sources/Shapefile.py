import os
import logging
from zipfile import ZipFile


class Shapefile:
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
                <SrcDataSource>{sourcefilename}</SrcDataSource> 
            </OGRVRTLayer> 
        </OGRVRTDataSource>""".format(dataset_name=dataset_name, sourcefilename=sourcefilename)
        vrt_filepath = self.get_new_sourcefilename('.vrt', None)
        file = open(vrt_filepath, "w")
        file.write(vrt_str)
        file.close()
        return vrt_filepath

    def ingest_ogr(self, tablename, shapefile):
        ogr_cmd = "ogr2ogr -f \"PostGreSQL\" {db_con} {shapefile} -nlt PROMOTE_TO_MULTI -nln {tablename} -lco GEOMETRY_NAME=geom".format(
            db_con=self.DB_CONN_STRING,
            shapefile=shapefile,
            tablename=tablename
        )
        print("ogr command: {ogr_cmd}".format(ogr_cmd=ogr_cmd))
        os.system(ogr_cmd)

    def extract_zip(self):
        print(self.sourcefilepath)
        new_filename_dict = self.create_sourcefilename(None)
        print(new_filename_dict)

        zipObj = ZipFile(self.sourcefilepath, 'r')

        extract_dir = os.path.join(new_filename_dict['dir'], new_filename_dict['filename'])
        print("EXTRACT DIR: {0}".format(extract_dir))

        zipObj.extractall(extract_dir)
        zipObj.close()

        shapefile = [f for f in zipObj.namelist() if '.shp' in f.lower()][0]

        return os.path.join(new_filename_dict['dir'], new_filename_dict['filename'], os.path.basename(shapefile))

    def ingest(self):
        shapefile = self.extract_zip()
        print("SHAPEFILE: {0}".format(shapefile))

        # create vrtfile
        #vrt_filepath = self.create_vrt_file(self.dataset_queue_name, shapefile)

        # ingest data using ogr2ogr
        self.ingest_ogr(self.dataset_queue_name, shapefile)

        return [
            {'action': 'warm_tilestache', 'params': {'zooms': [1,2], 'table': self.dataset_queue_name, 'dataset_id': self.dataset_id}}
        ]
