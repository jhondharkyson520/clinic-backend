#!/bin/sh

echo "Aguardando o banco de dados iniciar..."
until nc -z postgres_consult 5432; do
  sleep 2
done

echo "Banco de dados pronto! Rodando as migrações..."
npx prisma migrate dev

echo "Iniciando a aplicação..."
exec node dist/src/server.js
