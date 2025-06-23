const Aluno = require('../models/aluno');

exports.listar = async (req, res) => {
  const alunos = await Aluno.find();
  res.json(alunos);
};

exports.criar = async (req, res) => {
  const aluno = new Aluno(req.body);
  await aluno.save();
  res.status(201).json(aluno);
};

exports.atualizar = async (req, res) => {
  const aluno = await Aluno.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(aluno);
};

exports.apagar = async (req, res) => {
  await Aluno.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
};
