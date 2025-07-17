const express = require('express');
const router = express.Router();
const Aluno = require('../models/aluno');

router.get('/', async (req, res) => {
  const aluno = await Aluno.find().populate('curso');
  res.json(aluno);
});

router.post('/', async (req, res) => {
  try {
    const novo = new Aluno(req.body);
    const guardado = await novo.save();
    res.status(201).json(guardado);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const atualizado = await Aluno.findByIdAndUpdate(req.params.id, req.body, {
      new: true, runValidators: true
    }).populate('curso');
    if (!atualizado) return res.status(404).json({ error: 'Aluno não encontrado' });
    res.json(atualizado);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  await Aluno.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

module.exports = router;
