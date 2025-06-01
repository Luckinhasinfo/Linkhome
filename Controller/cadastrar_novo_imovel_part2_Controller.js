const db = require('../banco_dados/bd_config');

// Lista todos os imóveis
exports.listar = (req, res) => {
    db.query('SELECT * FROM dados_imovel', (erro, resultado) => {
        if (erro) return res.status(500).json({ erro: 'Erro ao buscar imóveis.' });
        res.status(200).json(resultado);
    });
};

// Busca um imóvel por ID
exports.buscarPorId = (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM dados_imovel WHERE id = ?', [id], (erro, resultado) => {
        if (erro) return res.status(500).json({ erro: 'Erro ao buscar imóvel.' });
        if (resultado.length === 0) return res.status(404).json({ mensagem: 'Imóvel não encontrado.' });
        res.status(200).json(resultado[0]);
    });
};

// Cadastra um novo imóvel
exports.cadastrar = (req, res) => {
    const { comodos, camas, banheiros, quartos, valorProprietario } = req.body;

    if (
        comodos === undefined ||
        camas === undefined ||
        banheiros === undefined ||
        quartos === undefined ||
        valorProprietario === undefined
    ) {
        return res.status(400).json({ erro: 'Todos os campos são obrigatórios.' });
    }

    const sql = `
        INSERT INTO dados_imovel (comodos, camas, banheiros, quartos, valor_proprietario)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [comodos, camas, banheiros, quartos, valorProprietario],
        (erro, resultado) => {
            if (erro) {
                console.error('Erro ao cadastrar imóvel:', erro);
                return res.status(500).json({ erro: 'Erro ao cadastrar imóvel.' });
            }
            res.status(201).json({ mensagem: 'Imóvel cadastrado com sucesso!', id: resultado.insertId });
        }
    );
};

// Atualiza um imóvel
exports.atualizar = (req, res) => {
    const id = req.params.id;
    const { comodos, camas, banheiros, quartos, valorProprietario } = req.body;
    if (
        comodos === undefined ||
        camas === undefined ||
        banheiros === undefined ||
        quartos === undefined ||
        valorProprietario === undefined
    ) {
        return res.status(400).json({ erro: 'Todos os campos são obrigatórios.' });
    }

    const sql = `
        UPDATE dados_imovel
        SET comodos = ?, camas = ?, banheiros = ?, quartos = ?, valor_proprietario = ?
        WHERE id = ?
    `;
    db.query(sql, [comodos, camas, banheiros, quartos, valorProprietario, id], (erro, resultado) => {
        if (erro) return res.status(500).json({ erro: 'Erro ao atualizar imóvel.' });
        if (resultado.affectedRows === 0) return res.status(404).json({ mensagem: 'Imóvel não encontrado.' });
        res.status(200).json({ mensagem: 'Imóvel atualizado com sucesso.' });
    });
};

// Exclui um imóvel
exports.excluir = (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM dados_imovel WHERE id = ?', [id], (erro, resultado) => {
        if (erro) return res.status(500).json({ erro: 'Erro ao excluir imóvel.' });
        if (resultado.affectedRows === 0) return res.status(404).json({ mensagem: 'Imóvel não encontrado.' });
        res.status(200).json({ mensagem: 'Imóvel excluído com sucesso.' });
    });
};