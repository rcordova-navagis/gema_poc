from __future__ import absolute_import, unicode_literals
from celery import task
from uut.celery import app


@task
def publish_message(message):
    with app.producer_pool.acquire(block=True) as producer:
        producer.publish(
            message,
            exchange='myexchange',
            routing_key='mykey',
        )
