const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/alunocontroller');

router.get('/', ctrl.listarAlunos);
router.post('/', ctrl.criarAluno);
router.put('/:id', ctrl.atualizarAluno);
router.delete('/:id', ctrl.apagarAluno);

module.exports = router;
