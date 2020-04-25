# pull official base image
FROM python:3.6.10

# set work directory
WORKDIR /apps/uut

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install psycopg2 dependencies
RUN apt-get update -y \
    && apt-get install -y libpq-dev gcc python3-dev postgresql-client
    #musl-dev jpeg-dev zlib-dev libjpeg

#RUN apt-get install -y geos \
#            proj \
#            gdal \
#            binutils \
#            && ln -s /usr/lib/libproj.so.15 /usr/lib/libproj.so \
#            && ln -s /usr/lib/libgdal.so.26 /usr/lib/libgdal.so \
#            && ln -s /usr/lib/libgeos_c.so.1 /usr/lib/libgeos_c.so

#ENV GDAL_LIBRARY_PATH="/usr/lib/libgdal.so"

# install dependencies
RUN pip install --upgrade pip
COPY ./requirements/development.txt /apps/uut/requirements.txt
RUN pip install -r requirements.txt

# copy project
COPY . /apps/uut

# run entrypoint.sh
ENTRYPOINT ["/apps/uut/entrypoint.sh"]