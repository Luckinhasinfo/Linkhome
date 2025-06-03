const db = require('../banco_dados/bd_config');

// Lista todos os imóveis
exports.listar = (req, res) => {
    db.query('SELECT * FROM info_adicional', (erro, resultado) => {
        if (erro) return res.status(500).json({ erro: 'Erro ao buscar imóveis.' });
        res.status(200).json(resultado);
    });
};

// Busca um imóvel por ID
exports.buscarPorId = (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM info_adicional WHERE id = ?', [id], (erro, resultado) => {
        if (erro) return res.status(500).json({ erro: 'Erro ao buscar imóvel.' });
        if (resultado.length === 0) return res.status(404).json({ mensagem: 'Imóvel não encontrado.' });
        res.status(200).json(resultado[0]);
    });
};

// Cadastra um novo imóvel
exports.cadastrar = (req, res) => {
    const { freezer, fogao, televisao, garagem, ar_condicionado, wifi, maquina_de_lavar, geladeira } = req.body;

    if (
        freezer === undefined ||
        fogao === undefined ||
        televisao === undefined ||
        wifi === undefined ||
        maquina_de_lavar === undefined ||
        geladeira === undefined ||
        garagem === undefined || 
        ar_condicionado === undefined

    ) {
        return res.status(400).json({ erro: 'Todos os campos são obrigatórios.' });
    }

    const sql = `
        INSERT INTO info_adicional (freezer, fogao, televisao, garagem, ar_condicionado, wifi, maquina_de_lavar, geladeira)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [freezer, fogao, televisao, garagem, ar_condicionado, wifi, maquina_de_lavar, geladeira],
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
    const {freezer, fogao, televisao, garagem, ar_condicionado, wifi, maquina_de_lavar, geladeira} = req.body;
    if (
        freezer === undefined ||
        fogao === undefined ||
        televisao === undefined ||
        wifi === undefined ||
        maquina_de_lavar === undefined ||
        geladeira === undefined
    ) {
        return res.status(400).json({ erro: 'Todos os campos são obrigatórios.' });
    }

    const sql = `
        UPDATE info_adicional
        SET freezer = ?, fogao = ?, televisao = ?, wifi = ?, maquina_de_lavar = ?, geladeira = ?
        WHERE id = ?
    `;
    db.query(sql, [freezer, fogao, televisao, wifi, maquina_de_lavar,geladeira, id], (erro, resultado) => {
        if (erro) return res.status(500).json({ erro: 'Erro ao atualizar imóvel.' });
        if (resultado.affectedRows === 0) return res.status(404).json({ mensagem: 'Imóvel não encontrado.' });
        res.status(200).json({ mensagem: 'Imóvel atualizado com sucesso.' });
    });
};

// Exclui um imóvel
exports.excluir = (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM info_adicional WHERE id = ?', [id], (erro, resultado) => {
        if (erro) return res.status(500).json({ erro: 'Erro ao excluir imóvel.' });
        if (resultado.affectedRows === 0) return res.status(404).json({ mensagem: 'Imóvel não encontrado.' });
        res.status(200).json({ mensagem: 'Imóvel excluído com sucesso.' });
    });
};