#!/usr/bin/env python
""" Caches tiles to Google Cloud Storage.

Requires boto (2.0+):
  http://pypi.python.org/pypi/boto

Example configuration:

  "cache": {
    "name": "TileStache.Goodies.Caches.GoogleCloud:Cache",
    "kwargs": {
      "bucket": "<bucket name>",
      "access": "<access key>",
      "secret": "<secret key>"
    }
  }

cache parameters:

  bucket
    Required bucket name for GS. If it doesn't exist, it will be created.

  access
    Required access key ID for your GS account.

  secret
    Required secret access key for your GS account.

"""
from time import time
from mimetypes import guess_type
import os
import io

# URI scheme for Google Cloud Storage.
GOOGLE_STORAGE = 'gs'
# URI scheme for accessing local files.
LOCAL_FILE = 'file'

# try:
from boto3.session import Session
from botocore.client import Config
from botocore.handlers import set_list_objects_encoding_type_url
from botocore.exceptions import ClientError
# except ImportError:
#     # at least we can build the documentation
#     pass

def tile_key(layer, coord, format):
    """ Return a tile key string.
    """
    name = layer.name()
    tile = '%(zoom)d/%(column)d/%(row)d' % coord.__dict__
    ext = format.lower()

    return str('%(name)s/%(tile)s.%(ext)s' % locals())

class Cache:
    """
    """
    def __init__(self, bucket, access, secret, basedir):
        print("==INIT FROM GCS== bucket: {0} access: {1} secret: {2}".format(bucket, access, secret))
        session = Session(aws_access_key_id=access, aws_secret_access_key=secret, region_name="asia-east1")
        session.events.unregister('before-parameter-build.s3.ListObjects', set_list_objects_encoding_type_url)

        self.bucket_name = bucket
        self.basedir = basedir
        self.s3 = session.resource('s3', endpoint_url='https://storage.googleapis.com', config=Config(signature_version='s3v4'))
        self.bucket = self.s3.Bucket(bucket)
        # config = boto3.config
        #
        # if 'Credentials' in config.sections():
        #     config.remove_section('Credentials')
        #
        # config.add_section('Credentials')
        # config.set('Credentials', 'gs_access_key_id', access)
        # config.set('Credentials', 'gs_secret_access_key', secret)
        #
        # uri = boto3.storage_uri('', GOOGLE_STORAGE)
        #
        #
        # for b in uri.get_all_buckets():
        #     if b.name == bucket:
        #         self.bucket = b
        #TODO: create bucket if not found

    def get_key_path(self, key):
        return os.path.join(self.basedir, key)

    def lock(self, layer, coord, format):
        """ Acquire a cache lock for this tile.

            Returns nothing, but blocks until the lock has been acquired.
        """
        key_name = self.get_key_path(tile_key(layer, coord, format)) + '-lock'
        due = time() + layer.stale_lock_timeout
        while time() < due:
            # if not self.bucket.get_key(key_name+'-lock'):
            #     break
            try:
                self.s3.Object(self.bucket_name, key_name).load()
            except ClientError:
                break

            _sleep(.2)
        self.bucket.put_object(Key=key_name, Body='locked.', ContentType='text/plain')
        # key = self.bucket.new_key(key_name+'-lock')
        # key.set_contents_from_string('locked.', {'Content-Type': 'text/plain'})

    def unlock(self, layer, coord, format):
        """ Release a cache lock for this tile.
        """
        key_name = self.get_key_path(tile_key(layer, coord, format)) + '-lock'
        try:
            self.bucket.delete_object(Key=key_name)
            # self.bucket.delete_key(key_name+'-lock')
        except:
            pass

    def remove(self, layer, coord, format):
        """ Remove a cached tile.
        """
        key_name = self.get_key_path(tile_key(layer, coord, format))
        self.bucket.delete_object(Key=key_name)
        # self.bucket.delete_key(key_name)

    def read(self, layer, coord, format):
        """ Read a cached tile.
        """
        print("==READING FROM GCS==")
        key_name = self.get_key_path(tile_key(layer, coord, format))
        # key = self.bucket.get_key(key_name)
        try:
            bytes_buffer = io.BytesIO()
            self.bucket.download_fileobj(Key=key_name, Fileobj=bytes_buffer)
            byte_value = bytes_buffer.getvalue()

            # if key is None:
            #     return None

            if byte_value is None:
                return None

            if layer.cache_lifespan:
                t = timegm(strptime(key.last_modified, '%a, %d %b %Y %H:%M:%S %Z'))

                if (time() - t) > layer.cache_lifespan:
                    return None

            # return key.get_contents_as_string()
            # data = json.loads(obj['Body'].read().decode('utf-8'))
            data = byte_value.decode() #python3, default decoding is utf-8
            return data
        except:
            return None

    def save(self, body, layer, coord, format):
        """ Save a cached tile.
        """
        print("==WRITING FROM GCS==")
        key_name = self.get_key_path(tile_key(layer, coord, format))
        # key = self.bucket.new_key(key_name)

        content_type, encoding = guess_type('example.'+format)
        headers = content_type and {'Content-Type': content_type} or {}
        content = content_type if content_type else 'text/plain'
        self.bucket.put_object(Key=key_name, Body=body, ContentType=content)
        # key.set_contents_from_string(body, headers, policy='public-read')
