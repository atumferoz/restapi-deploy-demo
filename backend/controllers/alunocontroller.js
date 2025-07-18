const Aluno = require('../models/aluno');

exports.listarAlunos = async (req, res) => {
  try {
    const alunos = await Aluno.find().populate('curso');
    res.json(alunos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.criarAluno = async (req, res) => {
  try {
    const aluno = new Aluno(req.body);
    const salvo = await aluno.save();
    res.status(201).json(salvo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.atualizarAluno = async (req, res) => {
  try {
    const atualizado = await Aluno.findByIdAndUpdate(req.params.id, req.body, {
      new: true, runValidators: true
    }).populate('curso');
    if (!atualizado) return res.status(404).json({ error: "Aluno não encontrado" });
    res.json(atualizado);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.apagarAluno = async (req, res) => {
  try {
    await Aluno.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
