# pull the base image
FROM node:alpine

# set the working direction
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./

COPY package-lock.json ./
RUN npm install
RUN mkdir -p node_modules/.cache && chmod -R 777 node_modules/.cache

# add app
COPY . ./

# start app
CMD ["npm", "start"]