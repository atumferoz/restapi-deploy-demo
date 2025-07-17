const express = require('express');
const router = express.Router();
const Curso = require('../models/curso');

router.get('/', async (req, res) => {
  const curso = await Curso.find();
  res.json(curso);
});

router.post('/', async (req, res) => {
  try {
    const novo = new Curso(req.body);
    const salvo = await novo.save();
    res.status(201).json(salvo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  await Curso.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

module.exports = router;
