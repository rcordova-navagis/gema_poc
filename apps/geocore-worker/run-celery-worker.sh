#!/bin/sh

# wait for RabbitMQ server to start
sleep 5

# run Celery worker for our project myproject with Celery configuration stored in Celeryconf
#su -m myuser -c "celery worker -A geocore -c 3 --loglevel=info"
#celery -A geocore worker -c 2 --loglevel=info
celery worker -c 2 --loglevel=info --broker amqp://geocoreamqp:mYge0cor3@geocore-rabbitmq:5672/ --result-backend rpc://
