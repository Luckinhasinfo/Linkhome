const express = require('express');
const router = express.Router();
const controller = require('../Controller/cadastrar_novo_imovel_part3_Controller');

// Listar todos os imóveis
router.get('/', controller.listar);

// Buscar imóvel por ID
router.get('/:id', controller.buscarPorId);

module.exports = router;