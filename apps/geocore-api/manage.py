#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys
from dotenv import load_dotenv

BASE_DIR = os.path.dirname(os.path.realpath(__file__))


def main():
    NON_DOCKER_ENV_PATH = os.path.join(BASE_DIR, '..', '..', '.env')
    DOCKER_ENV_PATH = os.path.join(BASE_DIR, '.env')

    dotenv_path = DOCKER_ENV_PATH if os.path.exists(DOCKER_ENV_PATH) else NON_DOCKER_ENV_PATH

    load_dotenv(dotenv_path=dotenv_path)

    DEBUG = bool(os.environ.get('DEBUG', True))

    environment = 'development' if DEBUG is True else 'production'

    os.environ.setdefault('DJANGO_SETTINGS_MODULE', "api.settings.{environment}".format(environment=environment))

    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    main()
