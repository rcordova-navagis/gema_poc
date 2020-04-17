#!/bin/sh
set -e

if [ "$DATABASE" = "postgres" ]
then
    echo "Waiting for postgres..."

    DATABASE_URL=postgres://$DB_USER:$DB_PASSWORD@$DB_HOST/$DB_NAME

    until psql $DATABASE_URL -c '\l'; do
        echo "TRYING TO CONNECT TO $DATABASE_URL"
        >&2 echo "Postgres is unavailable - sleeping"
        sleep 1
    done

    echo "PostgreSQL started"

    if [ "x$DJANGO_MANAGEPY_MIGRATE" = 'xon' ]; then
#        python manage.py flush --no-input
        python manage.py migrate
        python manage.py collectstatic --no-input --clear
    fi
else
    python manage.py flush --no-input
    python manage.py migrate --no-input
    python manage.py collectstatic --no-input --clear
fi

exec "$@"
