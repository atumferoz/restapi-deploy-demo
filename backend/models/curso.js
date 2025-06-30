const mongoose = require('mongoose');

const CursoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  codigo: { type: String, required: true, unique: true },
  duracao: { type: Number, required: true, min: 1 }
});

module.exports = mongoose.model('Curso', CursoSchema);
