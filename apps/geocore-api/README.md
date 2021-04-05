## What is Django-Blueprint?
A project template designed for the Django 2.0+ framework, that allows any developer to kickstart a new project, getting up and running quickly and more efficiently, by eliminating lengthy project setup and configuration.

## Prerequisites
* [Python 3.4+](https://www.python.org/downloads/)
* [PIP](https://pip.pypa.io/en/stable/quickstart/) - Python Package Manager
* [VENV](https://docs.python.org/3/library/venv.html) - Virtual Environment

## Usage
*From an activated virtual environment*
```
(venv) $ pip install django

(venv) $ django-admin.py startproject --template=https://github.com/SquirrelBrain/django-blueprint/archive/master.zip --extension=py,html project_name

(venv) $ cd project_name

(venv) $ pip install -r requirements/development.txt

(venv) $ python3 scripts/set_env.py

(venv) $ python3 manage.py migrate --run-syncdb

(venv) $ python3 manage.py createsuperuser

(venv) $ python3 manage.py runserver 0.0.0.0:8000
```
Login to your [instance](http://localhost:8000/admin)

## License & Copyright
Copyright (c) 2018 Justin Keith. Licensed under the [MIT LICENSE](LICENSE.md).