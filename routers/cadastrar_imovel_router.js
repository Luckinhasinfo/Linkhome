const express = require('express');
const router = express.Router();
const controller = require('../Controller/cadastrar_imovel_Controller');
const multer = require('multer');
const path = require('path');

//configuraçao do multer para salvar as imagens na pasta la tlg
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

router.post('/upload', upload.array('fotos_imovel'), (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ erro: 'Nenhuma imagem enviada.' });
    }
    // Caminhos pro  s alvar no banco (path ai é caminhho)
    const caminhos = req.files.map(f => path.join('imagens_imoveis', f.filename));
    res.status(200).json({ mensagem: 'Imagens enviadas com sucesso!', files: caminhos });
});
module.exports = router;


