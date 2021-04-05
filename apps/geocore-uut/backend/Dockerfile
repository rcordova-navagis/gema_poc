# pull official base image
FROM python:3.6.10-buster

# set work directory
WORKDIR /apps/uut

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install psycopg2 dependencies
RUN apt-get update -y \
    && apt-get install -y libpq-dev gcc python3-dev postgresql-client software-properties-common && rm -rf /var/lib/apt/lists/*
    #musl-dev jpeg-dev zlib-dev libjpeg

#RUN apt-get install -y g++ gdal-bin python-gdal python3-gdal libgdal-dev libgdal1i
#RUN add-apt-repository ppa:ubuntugis/ppa
RUN apt-get update -y
RUN apt-get install -y gdal-bin python-gdal python3-gdal

ENV CPLUS_INCLUDE_PATH "/usr/include/gdal"
ENV C_INCLUDE_PATH "/usr/include/gdal"
#ENV GDAL_LIBRARY_PATH="/usr/lib/libgdal.so"

# install dependencies
RUN pip install --upgrade pip
COPY ./requirements/development.txt /apps/uut/requirements.txt
RUN pip install -r requirements.txt

# copy project
COPY . /apps/uut

# run entrypoint.sh
ENTRYPOINT ["/apps/uut/entrypoint.sh"]