# # base image
# FROM node:latest

# # Create app directory
# WORKDIR /usr/src/app

# ENV PATH /usr/src/app/node_modules/.bin:$PATH

# # Install app dependencies
# # A wildcard is used to ensure both package.json AND package-lock.json are copied
# # where available (npm@5+)
# COPY package.json /usr/src/app/package.json

# RUN npm install --silent
# # If you are building your code for production
# # RUN npm install --only=production

# # Bundle app source
# COPY . .

# EXPOSE 3001

# CMD [ "npm", "start" ]

FROM node:8.11.3

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY . .

RUN npm install nodemon -g --silent
RUN npm install --silent

CMD [ "npm", "start" ]