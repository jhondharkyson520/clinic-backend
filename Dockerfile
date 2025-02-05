FROM node:alpine AS builder
WORKDIR /usr/src/consultbackend
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npx prisma generate
RUN npm run build


FROM node:alpine
WORKDIR /usr/src/consultbackend
COPY --from=builder /usr/src/consultbackend/package.json ./
COPY --from=builder /usr/src/consultbackend/node_modules ./node_modules
COPY --from=builder /usr/src/consultbackend/dist ./dist
COPY --from=builder /usr/src/consultbackend/prisma ./prisma


EXPOSE 3335

CMD ["sh", "entrypoint.sh"]
