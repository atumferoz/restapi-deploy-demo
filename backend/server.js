require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const alunoRoutes = require('./routes/alunoRoutes');
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

app.use('/aluno', alunoRoutes);
app.use('/curso', cursoRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.get('/', (req, res) => res.send('🎉 API ativa. Use /aluno, /curso ou /api-docs.'));

app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
