# pull official base image
FROM python:3.8.0-alpine

# set work directory
WORKDIR /app/api

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install psycopg2 dependencies
RUN apk update \
    && apk add postgresql-dev gcc python3-dev musl-dev

# install dependencies
RUN pip install --upgrade pip
COPY ./requirements/base.txt /app/api/requirements.txt
RUN pip install -r requirements.txt

# copy entrypoint.sh
COPY ./entrypoint.sh /app/api/entrypoint.sh

# copy project
COPY . /app/api

# run entrypoint.sh
ENTRYPOINT ["/app/api/entrypoint.sh"]