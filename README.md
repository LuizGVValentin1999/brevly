# Brev.ly - Encurtador de URLs

<img src="./web/public/logo.svg" alt="Brev.ly Logo" width="80" />

## 📖 Descrição

O **Brev.ly** é uma aplicação FullStack de encurtador de URLs desenvolvida como parte do **Desafio Fase 1** da Pós-Graduação da Rocketseat.
Seu objetivo é oferecer uma solução prática para criar, listar, remover e gerenciar links encurtados, além de redirecionar URLs e gerar relatórios de acessos.

---

## 🛠 Tecnologias Utilizadas

- **Frontend (web/):**

  - Vite + React
  - TypeScript
  - TailwindCSS
  - Axios
- **Backend (server/):**

  - Node.js
  - Fastify
  - Prisma ORM
  - PostgreSQL
  - Zod (validação)
- **DevOps:**

  - Docker
  - Docker Compose

---

## 📂 Estrutura do Projeto

```
📦 brev.ly
 ┣ 📂 server    # API Node.js (Fastify) 
 ┣ 📂 web       # Aplicação Frontend React
 ┣ 📜 README.md # Este arquivo
```

- `server/`: Implementa a API REST para criação, listagem, deleção de links e redirecionamento via rotas.
- `web/`: Frontend que permite o usuário interagir com o encurtador de links de maneira prática e intuitiva.

---

## 🖥️ Funcionalidades

- ✅ Encurtar novos links
- ✅ Listar links já cadastrados
- ✅ Deletar links
- ✅ Redirecionar links encurtados
- ✅ Gerar relatório de acessos por link

---

## 🚀 Como Rodar o Projeto

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/brev.ly.git
cd brev.ly
```

### 2. Configure as variáveis de ambiente

Crie arquivos `.env` para o **server** e para o **web**:

- `server/.env`:

```env
PORT=3333
CORS_ORIGINS=http://localhost:5173

DATABASE_URL=postgresql://docker:docker@localhost:5432/brevly

NODE_ENV=development

CLOUDFLARE_ACCOUNT_ID=
CLOUDFLARE_ACCESS_KEY_ID=
CLOUDFLARE_SECRET_ACCESS_KEY=
CLOUDFLARE_BUCKET=brevly
CLOUDFLARE_PUBLIC_URL=
```

- `web/.env`:

```env
VITE_SERVER_URL=http://localhost:3333
```

### 3. Suba os serviços com Docker

```bash
docker-compose up --build
```

Isso irá levantar:

- Banco de Dados PostgreSQL
- API Fastify


### 3.1 Suba o front

```bash
cd ./web
npm i 
npm run build
npm run start
```


### 4. Acesse

- Frontend: [http://localhost:5173](http://localhost:3000)
- API: [http://localhost:3333](http://localhost:3333)

---

## 🧪 Scripts Disponíveis

### Frontend (`web/`)

```bash
# Instalar dependências
npm install

# Rodar o projeto
npm run dev
```

### Backend (`server/`)

```bash
# Instalar dependências
npm install

# Rodar o servidor
npm run dev
```

---

## 📈 Deploy

- O backend pode ser deployado utilizando serviços como **Render**, **Railway** ou **AWS ECS**.
- O frontend pode ser hospedado em **Vercel**, **Netlify** ou servidores com **Docker**.

---

## 🎨 Layout

Você pode acessar o protótipo do Figma [clicando aqui](https://www.figma.com/community/file/1477335071553579816/encurtador-de-links).

---


## ✨ Agradecimentos

Projeto desenvolvido durante a Pós-graduação em Fullstack Developer da **Rocketseat** 🚀💜

---

<p align="center">
  Feito com 💜 por <strong>GUGA</strong>
</p>
