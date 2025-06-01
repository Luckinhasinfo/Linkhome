const express = require('express');
const router = express.Router();
const loginController = require('../Controller/loginController');

// Listar todos os usuários (opcional)
router.get('/', loginController.listar);

// Buscar usuário por ID
router.get('/:id', loginController.buscarPorId);

// Realizar login
router.post('/login', loginController.login);

module.exports = router;