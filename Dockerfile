# Use a imagem base do Node.js
FROM node:alpine

# Crie o diretório de trabalho
WORKDIR /usr/app

# Copie os arquivos package.json e package-lock.json
COPY package*.json ./

# Instale dependências globais e do projeto
RUN npm install -g prisma && npm install

# Copie o restante dos arquivos da aplicação
COPY . .

# Gere o cliente Prisma
RUN npx prisma generate

# Exponha a porta da aplicação
EXPOSE 3333

# Comando para iniciar a aplicação, incluindo a migração do Prisma
CMD ["sh", "-c", "npx prisma migrate dev --name init && npm start"]
