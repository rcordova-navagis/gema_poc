import re


numregex = r'[-+]?[0-9]{0,3}(?:(?:\.[0-9]+)|(?:[0-9]+))'


class PointHelper:
    @staticmethod
    def validate_latlng(lat, lon, index=0):
        is_valid = True

        print("index: {index} lat: {lat} lng: {lng} ".format(index=index, lat=lat, lng=lon))

        if not re.search(numregex, str(lat)):
            is_valid = "lat is not valid regex: {lat}".format(lat=lat)
        elif float(lat) < -90 or float(lat) > 90:
            is_valid = "lat is out of range: {lat}".format(lat=lat)

        # if lon is None:
        # print("lon is None: {lon}".format(lon=lon))
        if not re.search(numregex, str(lon)):
            is_valid = "lon is not valid regex: {lon}".format(lon=lon)
        elif float(lon) < -180 or float(lon) > 180:
            is_valid = "lon is out of range: {lon}".format(lon=lon)

        return is_valid
