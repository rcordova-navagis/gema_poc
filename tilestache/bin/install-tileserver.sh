#!/usr/bin/env bash

# https://yabukurosawa.wordpress.com/2017/03/21/installing-tilestache-on-ubuntu-16-04-lts/
sudo apt-get -y update
sudo apt-get -y install libjpeg-dev zlib1g-dev python-dev python-setuptools tilestache libapache2-mod-wsgi
sudo apt-get -y install proj-bin gdal-bin python-gdal libgdal-dev libproj-dev

