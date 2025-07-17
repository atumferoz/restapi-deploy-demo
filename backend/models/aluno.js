const mongoose = require('mongoose');

const AlunoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  apelido: { type: String, required: true },
  idade: { type: Number }, // optional
  curso: { type: mongoose.Schema.Types.ObjectId, ref: 'Curso', required: true },
  anoCurricular: { type: Number, required: true, min: 1 }
});

module.exports = mongoose.model('Aluno', AlunoSchema);
