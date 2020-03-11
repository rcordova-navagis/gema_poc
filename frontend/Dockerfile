FROM node

WORKDIR /var/www/geocore/frontend
COPY package.json /var/www/geocore/frontend

RUN npm install

EXPOSE 3000
CMD ["npm", "start"]