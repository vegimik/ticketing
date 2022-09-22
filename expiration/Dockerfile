FROM node:alpine

WORKDIR /expiration
COPY package.json /expiration
RUN npm install --only=prod
COPY . .

CMD ["npm", "start"]