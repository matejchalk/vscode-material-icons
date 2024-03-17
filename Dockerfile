FROM node:20-slim

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . ./

RUN npm run app:build

EXPOSE 3000

CMD [ "npm", "run", "app:run" ]
