const mongoose = require('mongoose');

const CursoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  codigo: { type: String, required: true, unique: true },
  duracao: { type: Number } // opcional
});

module.exports = mongoose.model('Curso', CursoSchema);
