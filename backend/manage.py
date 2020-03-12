#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys
from dotenv import load_dotenv


def main():
    load_dotenv(dotenv_path='./../.env')

    DEBUG = bool(os.environ.get('DEBUG', True))

    environment = 'development' if DEBUG is True else 'production'

    os.environ.setdefault('DJANGO_SETTINGS_MODULE', "geocore.settings.{environment}".format(environment=environment))

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
