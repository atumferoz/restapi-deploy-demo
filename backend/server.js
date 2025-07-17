require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const alunosRoutes = require('./routes/alunoRoutes');
const cursoRoutes = require('./routes/cursoRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./docs/swagger.json');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB conectado'))
  .catch(err => console.error('❌ Erro de conexão:', err));

mongoose.connection.on('connected', () => {
  console.log('🔌 DB conectado:', mongoose.connection.name);
});

app.use('/aluno', alunosRoutes);
app.use('/curso', cursoRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.get('/', (req, res) => res.send('✅ API ativa! Use /aluno ou /curso ou /api-docs para documentação.'));

app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
