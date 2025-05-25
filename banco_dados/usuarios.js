const express = require('express');
const router = express.Router();
const arquivo_controle = require('UsuariosController');

router.get('/', arquivo_controle.listar);
router.get('/:id', arquivo_controle.buscarPorId);
router.post('/', arquivo_controle.cadastrar);
router.put('/:id', arquivo_controle.atualizar);
router.delete('/:id', arquivo_controle.excluir);

module.exports = router;
