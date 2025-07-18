# 📚 Gestão de Alunos

Sistema completo para gestão de alunos e cursos, com interface web e backend RESTful.

---

## 📌 Funcionalidades

- 👨‍🎓 CRUD de Alunos
- 🧑‍🏫 Cadastro e visualização de Cursos
- 🔍 Pesquisa por nome, apelido ou curso
- 🗂️ Associação entre aluno e curso
- 🌐 Consumo e implementação de API REST com MongoDB
- 📄 Documentação Swagger

---

## 🚀 Tecnologias

- **Frontend**: HTML, CSS, JavaScript (Fetch API)
- **Backend**: Node.js + Express.js
- **Banco de Dados**: MongoDB Atlas
- **Deploy**:
  - Frontend: [Vercel](https://vercel.com)
  - Backend: [Render](https://render.com)
- **Outros**: JSON Server, Swagger UI

---

## 🧠 Estrutura do Projeto

/frontend
├── index.html
├── style.css
└── script.js

/backend
├── models/
├── routes/
├── controllers/
├── docs/swagger.json
├── server.js
└── .env

/mock-data
└── bd.json (dados de teste para JSON Server)




---

## 🛠️ Instruções de Deploy

### 🔧 Backend (Render)

1. Crie conta em [Render](https://render.com)
2. Novo Web Service → conecte seu repositório
3. Configure:
   - Runtime: `Node`
   - Start command: `node server.js`
   - Environment Variable:  
     - `MONGO_URI`: URI do MongoDB Atlas
4. Clique em **Deploy**

🔗 Exemplo: `https://restapi-deploy-demo-vsf8.onrender.com`

---

### 💻 Frontend (Vercel)

1. Suba a pasta `/frontend` para um repositório Git
2. Vá para [vercel.com](https://vercel.com)
3. Novo projeto → selecione seu repositório
4. Deploy automático

🔗 Exemplo: `https://restapi-deploy-demo-mari.vercel.app/`

⚠️ **Importante**: No `script.js`, defina:
```js
const urlBase = "https://restapi-deploy-demo-vsf8.onrender.com";


🧪 Como Testar
🔹 Swagger

Acesse:

https://restapi-deploy-demo-vsf8.onrender.com/api-docs

    Interface interativa

    Testes de endpoints GET, POST, PUT, DELETE


Postman

Importe manualmente:

    Endpoint base: https://restapi-deploy-demo-vsf8.onrender.com

    Teste:

        GET /aluno

        POST /aluno

        GET /curso

        POST /curso


 Testes Locais (opcional)
Backend:

cd backend
npm install
npm start

Frontend:

Abra index.html no navegador ou use Vite/Live Server


💬 Autoria

Desenvolvido por [Mariama Kamara nº32242] — Trabalho Prático #1: Consumo e Implementação de APIs RESTful
📅 Ano letivo: 2025
✅ Objetivos do Projeto

✔️ Consolidar uso de Express.js + MongoDB
✔️ Praticar Fetch API no front
✔️ Criar API RESTful real + documentação Swagger
✔️ Realizar deploy front e back
✔️ Utilizar JSON Server para testes iniciais
🏁 Resultado Esperado

    Interface responsiva, backend funcional com MongoDB Atlas, deploys ativos e documentação acessível via Swagger.


## 🌐 Links de Produção

- Front-end (Vercel): https://restapi-deploy-demo-mari.vercel.app/
- Back-end (Render): https://restapi-deploy-demo-vsf8.onrender.com