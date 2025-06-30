const Curso = require('../models/curso');

exports.listar = async (req, res) => {
  const cursos = await Curso.find();
  res.json(cursos);
};

exports.criar = async (req, res) => {
  const curso = new Curso(req.body);
  await curso.save();
  res.status(201).json(curso);
};

exports.atualizar = async (req, res) => {
  const curso = await Curso.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(curso);
};

exports.apagar = async (req, res) => {
  await Curso.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
};
