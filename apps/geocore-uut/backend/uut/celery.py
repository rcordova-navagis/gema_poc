from __future__ import absolute_import
import os
from celery import Celery, bootsteps
from django.conf import settings
import kombu

DEBUG = bool(os.environ.get('DEBUG', True))

environment = 'development' if DEBUG is True else 'production'

# set the default Django settings module for the 'celery' program.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', "uut.settings.{environment}".format(environment=environment))

MY_CELERY_BROKER_URL = "amqp://{user}:{password}@{host}:5672".format(user=os.environ.get('RABBITMQ_DEFAULT_USER', 'guest'), password=os.environ.get('RABBITMQ_DEFAULT_PASS', 'guest'), host=os.environ.get('RABBITMQ_HOST', 'localhost'))
# print("FROM celery.py MY_CELERY_BROKER_URL={url}".format(url=MY_CELERY_BROKER_URL))

app = Celery('geocore', broker=MY_CELERY_BROKER_URL, backend=os.environ.get('CELERY_RESULT_BACKEND', 'rpc://'))

app.config_from_object('django.conf:settings')
app.autodiscover_tasks(lambda: settings.INSTALLED_APPS)


# setting publisher
with app.pool.acquire(block=True) as conn:
    exchange = kombu.Exchange(
        name='myexchange',
        type='direct',
        durable=True,
        channel=conn,
    )
    exchange.declare()

    queue = kombu.Queue(
        name='myqueue',
        exchange=exchange,
        routing_key='mykey',
        channel=conn,
        message_ttl=600,
        queue_arguments={
            'x-queue-type': 'classic'
        },
        durable=True
    )
    queue.declare()


# setting consumer
class MyConsumerStep(bootsteps.ConsumerStep):
    def get_consumers(self, channel):
        return [kombu.Consumer(channel,
                               queues=[queue],
                               callbacks=[self.handle_message],
                               accept=['json'])]

    def handle_message(self, body, message):
        print('MyConsumerStep Received message: {0!r}'.format(body))
        message.ack()


app.steps['consumer'].add(MyConsumerStep)

