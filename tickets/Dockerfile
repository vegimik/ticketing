FROM node:alpine

WORKDIR /tickets
COPY package.json /tickets
RUN npm install --only=prod
COPY . .

CMD ["npm", "start"]