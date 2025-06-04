const db = require('../banco_dados/bd_config');


// Lista todos os imóveis
exports.listar = (req, res) => {
    db.query('SELECT * FROM imoveis', (erro, resultado) => {
        if (erro) return res.status(500).json({ erro: 'Erro ao buscar imóveis.' });
        res.status(200).json(resultado);
    });
};

// Busca imóvel por ID
exports.buscarPorId = (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM imoveis WHERE id = ?', [id], (erro, resultado) => {
        if (erro) return res.status(500).json({ erro: 'Erro ao buscar imóvel.' });
        if (resultado.length === 0) return res.status(404).json({ mensagem: 'Imóvel não encontrado.' });
        res.status(200).json(resultado[0]);
    });
};