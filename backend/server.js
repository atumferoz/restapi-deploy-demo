require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Importar rotas
const alunosRoutes = require('./routes/alunoRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Conectar ao MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Atlas conectado"))
  .catch(err => console.error("❌ Erro de conexão:", err));

// Usar rota de alunos
app.use('/alunos', alunosRoutes);

// Inicializar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor funciona na porta ${PORT}`);
});

app.get('/', (req, res) => {
  res.send('✅ API ativa! Use /alunos ou /api-docs');
});
