const express = require('express');
const router = express.Router();
const controller = require('../Controller/info_imovel_Controller');


// Listar todos os imóveis
router.get('/', controller.listar);

// Buscar imóvel por ID
router.get('/:id', controller.buscarPorId);

// Cadastrar novo imóvel
router.post('/', controller.cadastrar);

// Atualizar imóvel
router.put('/:id', controller.atualizar);

// Excluir imóvel
router.delete('/:id', controller.excluir);

module.exports = router;