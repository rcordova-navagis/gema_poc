FROM node:12

WORKDIR /apps/cluster

COPY package.json package.json

RUN npm install

COPY . .

EXPOSE 8083

RUN npm install -g nodemon

CMD [ "nodemon", "index.js" ]