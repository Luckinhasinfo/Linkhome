const express = require('express');
const router = express.Router();
const controller = require('../Controller/cadastrar_novo_imovel_Controller');
const multer = require('multer');
const upload = multer({ dest: 'imagens/' });
const app = express();
app.post('/', upload.single('foto_imovel'), (req, res) => {
               res.json(req.file);
          })

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