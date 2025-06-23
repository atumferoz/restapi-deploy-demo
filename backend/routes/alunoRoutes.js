const express = require('express');
const router = express.Router();
const controller = require('../controllers/alunocontroller');

router.get('/', controller.listar);
router.post('/', controller.criar);
router.put('/:id', controller.atualizar);
router.delete('/:id', controller.apagar);

module.exports = router;
