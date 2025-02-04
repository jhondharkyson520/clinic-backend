FROM node:alpine AS builder
WORKDIR /usr/src/consultbackend
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npx prisma generate
RUN npm run build


FROM node:alpine
WORKDIR /usr/src/consultbackend
COPY --from=builder /usr/src/consultbackend/package.json /usr/src/consultbackend/package-lock.json ./
RUN npm install --omit=dev
COPY --from=builder /usr/src/consultbackend/dist ./dist
COPY --from=builder /usr/src/consultbackend/prisma ./prisma


EXPOSE 3335

CMD ["node", "entrypoint.sh", "dist/server.js"]
