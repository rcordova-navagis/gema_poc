# pull official base image
FROM python:3.6.10

# set work directory
WORKDIR /apps/api

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN apt-get update -y \
    && apt-get install -y libpq-dev gcc python3-dev postgresql-client

# install dependencies
RUN pip install --upgrade pip
COPY ./requirements/development.txt /apps/api/requirements.txt
RUN pip install -r requirements.txt

# copy project
COPY . /apps/api

# run entrypoint.sh
ENTRYPOINT ["/apps/api/entrypoint.sh"]