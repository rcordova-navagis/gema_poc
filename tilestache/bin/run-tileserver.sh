#!/usr/bin/env bash

venv/bin/gunicorn -w 2 --preload -b 127.0.0.1:8011 "TileStache:WSGITileServer('/var/www/geocore/tilestache/conf/tilestache/osmroads.cfg')" --log-level=DEBUG --timeout=540
