#!/bin/sh

# wait for RabbitMQ server to start
sleep 10

# run Celery worker for our project myproject with Celery configuration stored in Celeryconf
#su -m myuser -c "celery worker -A geocore -c 3 --loglevel=info"
celery worker -A uut.celery -c 2 --loglevel=info
