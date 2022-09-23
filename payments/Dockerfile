FROM node:alpine

WORKDIR /payments
COPY package.json /payments
RUN npm install --only=prod
COPY . .

CMD ["npm", "start"]