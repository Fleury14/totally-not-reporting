FROM node:8

RUN mkdir /home/node/server

WORKDIR /home/node/server

ENV PATH /home/node/server/node_modules/.bin$PATH

COPY package.json /home/node/server
COPY . /home/node/server

RUN npm install -g nodemon

RUN npm install -g ts-node typescript

RUN npm install --no-bin-links

CMD ["npm", "run", "watch"];