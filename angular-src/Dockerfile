FROM node:10

RUN mkdir /home/node/client

WORKDIR /home/node/client

COPY package.json /home/node/client
COPY . /home/node/client

RUN npm install --no-bin-links

RUN npm install -g @angular/cli 

EXPOSE 4200

CMD ["npm", "start"]