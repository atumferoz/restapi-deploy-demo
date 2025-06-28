const express = require('express');
const router = express.Router();
const Aluno = require('../models/aluno');

// GET todos os alunos
router.get('/', async (req, res) => {
  const alunos = await Aluno.find();
  res.json(alunos);
});

// POST novo aluno
router.post('/', async (req, res) => {
  const novo = new Aluno(req.body);
  const guardado = await novo.save();
  res.status(201).json(guardado);
});

// PUT editar aluno
router.put('/:id', async (req, res) => {
  try {
    const atualizado = await Aluno.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!atualizado) {
      return res.status(404).json({ error: 'Aluno não encontrado' });
    }

    res.json(atualizado);
  } catch (err) {
    console.error('Erro na atualização:', err.message);
    res.status(400).json({ error: 'Erro ao atualizar aluno', detalhe: err.message });
  }
});


// DELETE remover aluno
router.delete('/:id', async (req, res) => {
  await Aluno.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

module.exports = router;
