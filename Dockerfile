FROM node:alpine AS build
RUN apk add --no-cache openssl

WORKDIR /usr/src/clinica
COPY package*.json ./
RUN npm install -g npm@11.1.0
RUN npm i --save-dev prisma@latest
RUN npm i @prisma/client@latest
COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:alpine
WORKDIR /usr/src/clinica
COPY --from=build /usr/src/clinica/dist ./dist
COPY --from=build /usr/src/clinica/node_modules ./node_modules
COPY --from=build /usr/src/clinica/package*.json ./
COPY --from=build /usr/src/clinica/prisma ./prisma
COPY --from=build /usr/src/clinica/entrypoint.sh ./
RUN apk add --no-cache openssl
RUN npm i --save-dev prisma@latest
RUN npm i @prisma/client@latest
RUN chmod +x entrypoint.sh
EXPOSE 4000
CMD ["sh", "entrypoint.sh"]
