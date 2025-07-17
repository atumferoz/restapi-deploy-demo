const express = require('express');
const router = express.Router();
const Curso = require('../models/curso');

// GET /cursos
router.get('/', async (req, res) => {
  const cursos = await Curso.find();
  res.json(cursos);
});

// POST /cursos
router.post('/', async (req, res) => {
  const novo = new Curso(req.body);
  const salvo = await novo.save();
  res.status(201).json(salvo);
});

// PUT /cursos/:id
router.put('/:id', async (req, res) => {
  try {
    const atualizado = await Curso.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!atualizado) return res.status(404).json({ error: 'Curso não encontrado' });

    res.json(atualizado);
  } catch (err) {
    res.status(400).json({ error: 'Erro ao atualizar curso', detalhe: err.message });
  }
});

// DELETE /cursos/:id
router.delete('/:id', async (req, res) => {
  await Curso.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

module.exports = router;
