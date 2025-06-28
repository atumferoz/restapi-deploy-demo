const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const alunosRoutes = require('./routes/alunoRoutes');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Atlas ligado"))
  .catch((err) => console.error("❌ Erro na ligação:", err));

app.use('/alunos', alunosRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor na porta ${PORT}`);
});
