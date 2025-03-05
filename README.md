# Clinic Backend

## Descrição

O **Clinic Backend** é uma API robusta e escalável para o gerenciamento de clínicas médicas. A aplicação permite o cadastro de pacientes, agendamentos e controle financeiro, além de oferecer um gerenciamento eficiente de consultas. O sistema prioriza segurança, desempenho e boas práticas de desenvolvimento.

## Funcionalidades

- Autenticação e autorização seguras utilizando JWT.
- Cadastro e gerenciamento de pacientes e médicos.
- Agendamento, consulta e cancelamento de consultas médicas.
- Controle de financeiro mensal, anual e pagamentos em atraso.
- Integração com banco de dados PostgreSQL.
- Arquitetura em camadas (Layered Architecture) seguindo princípios de boas práticas.

## Tecnologias Utilizadas

- **Node.js**
- **Express.js**
- **TypeScript**
- **Prisma ORM**
- **PostgreSQL**
- **Docker**

## Estrutura do Projeto

- `src/controllers/` - Contém a lógica dos endpoints da API.
- `src/middleware/` - Middlewares para interceptar requisições, como autenticação ou validação.
- `src/prisma/` - Configuração do Prisma ORM.
- `src/services/` - Implementação das regras de negócio.
- `src/routes.ts` - Definição das rotas da aplicação.
- `src/server.ts` - Ponto de entrada da aplicação.

## Instalação e Execução

1. Clone o repositório:
   ```bash
   git clone https://github.com/jhondharkyson520/clinic-backend.git
   ```
2. Acesse a pasta do projeto:
   ```bash
   cd clinic-backend
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Crie um arquivo `.env` e adicione as seguintes variáveis:
   ```plaintext
   DATABASE_URL=postgresql://user:password@localhost:5432/clinic?schema=public

   JWT_SECRET=SUA-CHAVE

   POSTGRES_USER=SEU-USER

   POSTGRES_PASSWORD=SUA-SENHA

   POSTGRES_DB=clinic
   ```
   A chave JWT Secret pode ser gerada no MD5 Hash Generator: 
   https://www.md5hashgenerator.com/

5. Execute as migrações do Prisma:
   ```bash
   npx prisma migrate dev
   ```
6. Inicie a aplicação:
   ```bash
   npm run dev
   ```

## Instalação e Execução usando Docker

1. Clone o repositório:
   ```bash
   git clone https://github.com/jhondharkyson520/clinic-backend.git
   ```
2. Acesse a pasta do projeto:
   ```bash
   cd clinic-backend
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Crie um arquivo `.env` e adicione as seguintes variáveis:
   ```plaintext
   DATABASE_URL=postgresql://user:password@localhost:5432/clinic?schema=public

   JWT_SECRET=SUA-CHAVE

   POSTGRES_USER=SEU-USER

   POSTGRES_PASSWORD=SUA-SENHA

   POSTGRES_DB=clinic
   ```
   A chave JWT Secret pode ser gerada no MD5 Hash Generator: 
   https://www.md5hashgenerator.com/

5. Execute as migrações do Prisma:
   ```bash
   npx prisma migrate dev
   ```
6. Faça o download e instale o Docker em:   

   https://www.docker.com/
  
7. Execute o seguinte comando:
   ```bash
   docker-compose up --build -d
   ```

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Licença

Este projeto está licenciado sob a licença MIT.