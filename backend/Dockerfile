# Use an official Python runtime as a parent image
FROM python:3.6

# Adding backend directory to make absolute filepaths consistent across services
WORKDIR /var/www/geocore/backend

# Install Python dependencies
COPY requirements/base.txt /var/www/geocore/backend
RUN pip3 install --upgrade pip -r requirements.txt

# Add the rest of the code
COPY . /var/www/geocore/backend

# Make port 8000 available for the app
EXPOSE 8080

# Be sure to use 0.0.0.0 for the host within the Docker container,
# otherwise the browser won't be able to find it
CMD python3 manage.py runserver 0.0.0.0:8080