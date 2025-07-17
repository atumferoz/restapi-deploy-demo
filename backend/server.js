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

// Middlewares
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('📦 MongoDB conectado'))
  .catch(err => console.error('❌ Falha na conexão com MongoDB:', err));

mongoose.connection.on('connected', () => {
  console.log('🔌 Connected to DB:', mongoose.connection.name);
});

// Routes
app.use('/alunos', alunosRoutes);
app.use('/cursos', cursoRoutes); // plural for consistency

// Swagger Docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// Default Route
app.get('/', (req, res) => {
  res.send('✅ API ativa! Use /alunos ou /api-docs');
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
