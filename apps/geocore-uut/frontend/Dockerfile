FROM node

USER root

WORKDIR /app/frontend

COPY . /app/frontend

RUN npm install

RUN npm rebuild node-sass

EXPOSE 3000

CMD npm start