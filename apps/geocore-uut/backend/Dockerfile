FROM andrejreznik/python-gdal:stable

# set work directory
WORKDIR /apps/uut

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
#ENV GDAL_DATA "/usr/local/lib/python3.7/site-packages/fiona/gdal_data/"
ENV GDAL_DATA "/usr/local/share/gdal"

# install psycopg2 dependencies
#RUN apt-get update -y && apt-get -y install libpq-dev gcc && apt-get install -y libpq-dev gcc postgresql-client software-properties-common
RUN mkdir -p /usr/share/man/man1/ /usr/share/man/man7/
RUN apt-get update -y
RUN apt-get install -y libpq-dev postgresql-client software-properties-common && rm -rf /var/lib/apt/lists/*
#musl-dev jpeg-dev zlib-dev libjpeg

#RUN add-apt-repository ppa:ubuntugis/ppa && apt-get update -y
#RUN apt-get install -y g++ gdal-bin python-gdal python3-gdal libgdal-dev libgdal1i

#ENV CPLUS_INCLUDE_PATH "/usr/include/gdal"
#ENV C_INCLUDE_PATH "/usr/include/gdal"
#ENV GDAL_LIBRARY_PATH="/usr/lib/libgdal.so"

# install dependencies
RUN pip install --upgrade pip
COPY ./requirements/development.txt /apps/uut/requirements.txt
RUN pip install -r requirements.txt

# copy project
COPY . /apps/uut

# run entrypoint.sh
ENTRYPOINT ["/apps/uut/entrypoint.sh"]