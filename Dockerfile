# Use a imagem base do Node.js
FROM node:alpine

WORKDIR /usr/app

COPY package*.json ./

RUN npm install -g prisma && npm install

COPY . .

RUN npx prisma generate

EXPOSE 3335

CMD ["sh", "-c", "npx prisma migrate dev --name init && npm start"]
