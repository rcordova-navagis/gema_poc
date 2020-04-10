FROM ubuntu:16.04 as base

FROM base as builder

WORKDIR /tileserver

# install psycopg2 dependencies
RUN apt-get update \
    && apt-get install -y git software-properties-common build-essential wget postgresql-client libjpeg-dev zlib1g-dev python-pip python3-pip libssl-dev libpq-dev

RUN wget https://www.python.org/ftp/python/3.6.10/Python-3.6.10.tgz \
    && tar xzf Python-3.6.10.tgz
RUN cd Python-3.6.10 \
    && ./configure --enable-optimizations \
    && make install

RUN add-apt-repository -y ppa:ubuntugis/ubuntugis-unstable
RUN apt-get update
RUN apt-get install -y g++ gdal-bin python-gdal python3-gdal libgdal-dev libgdal1i

RUN add-apt-repository -y ppa:talaj/osm-mapnik
RUN apt-get update
RUN apt-get install -y autoconf libtool libxml2-dev libbz2-dev \
    libgeos-dev libgeos++-dev libproj-dev \
    libmapnik-dev mapnik-utils python-mapnik

RUN pip3 install --upgrade pip

# cleanup
RUN rm Python-3.6.10.tgz && rm -rf Python-3.6.10

FROM builder as serve

# copy project
COPY . /tileserver

# install dependencies
RUN pip3 install -r /tileserver/requirements.txt
RUN pip3 install GDAL==$(gdal-config --version) --global-option=build_ext --global-option="-I/usr/include/gdal"

EXPOSE 8088