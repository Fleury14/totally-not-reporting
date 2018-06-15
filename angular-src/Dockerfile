FROM node:10

RUN mkdir /home/node/client

WORKDIR /home/node/client

COPY package.json /home/node/client

RUN npm install

EXPOSE 4200

CMD ["npm", "start"]