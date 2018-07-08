FROM node:latest

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY . .

RUN npm install nodemon -g --silent
RUN npm install --silent

CMD [ "npm", "start" ]