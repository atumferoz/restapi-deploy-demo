const mongoose = require('mongoose');

const AlunoSchema = new mongoose.Schema({
  nome: String,
  apelido: String,
  curso: String,
  anoCurricular: Number
});

module.exports = mongoose.model('Aluno', AlunoSchema);
