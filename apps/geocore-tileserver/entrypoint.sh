#!/bin/sh
set -e

if [ "$DATABASE" = "postgres" ]
then
    echo "Waiting for postgres..."

    DATABASE_URL=postgres://$DB_USER:$DB_PASSWORD@$DB_HOST:$DB_PORT/$DB_NAME

    until psql $DATABASE_URL -c '\l'; do
        echo "TRYING TO CONNECT TO $DATABASE_URL"
        >&2 echo "Postgres is unavailable - sleeping"
        sleep 1
    done

    echo "PostgreSQL started"

    if [ "x$DJANGO_MANAGEPY_MIGRATE" = 'xon' ]; then
        python3 manage.py migrate
    fi
else
    python3 manage.py migrate --no-input
fi

exec "$@"
