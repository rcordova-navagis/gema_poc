FROM ubuntu:16.04 as base

FROM base as builder

WORKDIR /apps/tileserver

RUN apt-get update -y \
    && apt-get install -y gcc wget git software-properties-common build-essential postgresql-client \
    libjpeg-dev zlib1g-dev libssl-dev libpq-dev libsqlite3-dev

RUN wget https://www.python.org/ftp/python/3.6.10/Python-3.6.10.tgz \
    && tar xzf Python-3.6.10.tgz
RUN cd Python-3.6.10 \
    && ./configure --enable-optimizations --with-ensurepip=install \
    && make -j 8 install

#RUN rm /usr/bin/python
RUN ln -s /usr/local/bin/python3.6 /usr/bin/python

RUN apt-get install -y python3-pip

RUN pip3 install --upgrade pip

# cleanup
RUN rm Python-3.6.10.tgz && rm -rf Python-3.6.10

FROM builder as builder1

RUN add-apt-repository ppa:ubuntugis/ubuntugis-unstable
RUN apt-get update
RUN apt-get install -y g++ gdal-bin python-gdal python3-gdal libgdal-dev libgdal1i

RUN add-apt-repository ppa:talaj/osm-mapnik
RUN apt-get update
RUN apt-get install -y autoconf libtool libxml2-dev libbz2-dev \
    libgeos-dev libgeos++-dev libproj-dev \
    libmapnik-dev mapnik-utils python-mapnik


FROM builder1 as serve

WORKDIR /apps/tileserver

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV PYTHONPATH "/usr/local/bin/python3"

ENV CPLUS_INCLUDE_PATH "/usr/include/gdal"
ENV C_INCLUDE_PATH "/usr/include/gdal"

COPY requirements.txt /apps/tileserver/requirements.txt

RUN pip3 install -r requirements.txt
#RUN pip3 install GDAL==$(gdal-config --version) --global-option=build_ext --global-option="-I/usr/include/gdal"

# copy project
COPY . /apps/tileserver

EXPOSE 8088

ENTRYPOINT ["/apps/tileserver/entrypoint.sh"]
