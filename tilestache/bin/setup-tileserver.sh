#!/usr/bin/env bash

sudo rm /etc/nginx/sites-available/geocore.tilestache
sudo rm /etc/nginx/sites-enabled/geocore.tilestache
sudo cp /var/www/geocore/tilestache/conf/nginx/nginx.conf /etc/nginx/sites-available/geocore.tilestache
sudo ln -s /etc/nginx/sites-available/geocore.tilestache /etc/nginx/sites-enabled/geocore.tilestache
sudo /etc/init.d/nginx reload
