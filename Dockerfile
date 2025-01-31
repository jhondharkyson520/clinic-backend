FROM node:alpine AS build

WORKDIR /usr/src/consultbackend

COPY package*.json ./

RUN npm install -g prisma && npm install

COPY . .

RUN npx prisma generate
RUN npm run build

FROM node:alpine
COPY --from=build /usr/src/consultbackend/dist ./dist
COPY --from=build /usr/src/consultbackend/package*.json ./
RUN npm install --production && npm cache clean --force

EXPOSE 3335

CMD ["sh", "-c", "npx prisma migrate dev --name init && npm start"]
