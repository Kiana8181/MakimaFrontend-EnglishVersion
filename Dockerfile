From node:18.12-alpine3.17


WORKDIR /usr/src/app

COPY . .

EXPOSE 3000

RUN npm install --force

CMD [ "npm", "start" ] 