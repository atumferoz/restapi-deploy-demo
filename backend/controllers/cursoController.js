const Curso = require('../models/curso');

exports.listarCursos = async (req, res) => {
  try {
    const cursos = await Curso.find();
    res.json(cursos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.criarCurso = async (req, res) => {
  try {
    const curso = new Curso(req.body);
    const salvo = await curso.save();
    res.status(201).json(salvo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.apagarCurso = async (req, res) => {
  try {
    await Curso.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
