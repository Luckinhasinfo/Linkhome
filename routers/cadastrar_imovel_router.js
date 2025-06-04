const express = require('express');
const router = express.Router();
const controller = require('../Controller/cadastrar_novo_imovel_Controller');
const multer = require('multer');
const path = require('path');

// Configuração do multer para salvar as imagens na pasta 'imagens'
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../imagens_imoveis'));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

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

// ROTA PARA UPLOAD DE IMAGEM
router.post('/upload', upload.array('fotos_imovel'), (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ erro: 'Nenhuma imagem enviada.' });
    }
    res.status(200).json({ mensagem: 'Imagens enviadas com sucesso!', files: req.files.map(f => f.filename) });
});
module.exports = router;