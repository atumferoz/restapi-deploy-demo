const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/cursoController');

router.get('/', ctrl.listarCursos);
router.post('/', ctrl.criarCurso);
router.delete('/:id', ctrl.apagarCurso);

module.exports = router;
