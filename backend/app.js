require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('📦 MongoDB conectado'));

app.use('/alunos', require('./routes/alunoRoutes'));
app.use('/cursos', cursosRoutes);


const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./docs/swagger.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 API ativa na porta ${PORT}`));
