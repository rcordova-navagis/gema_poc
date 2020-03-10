#!/usr/bin/python3
# -*- coding: utf-8 -*-

import os
import sys

PROJECT_ROOT = os.path.abspath(os.path.dirname(os.path.dirname(__file__)))

if (sys.platform == 'win32') or (sys.platform == 'cygwin'):
    prefix = 'set'
else:
    prefix = 'export'
    
filenames = []
for root, dirs, files in os.walk(PROJECT_ROOT, topdown=True):
    if 'settings' in dirs:
        for file in os.listdir(os.path.join(root, 'settings')):
            if file not in ['__init__.py', '__pycache__', 'base.py']:
                print(
                    '{0} DJANGO_SETTINGS_MODULE={1}.settings.{2}'.format(
                        prefix, 
                        os.path.basename(root),
                        os.path.splitext(file)[0]
                    )
                )
