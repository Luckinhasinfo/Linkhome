const db = require('../banco_dados/bd_config');

// Listar todos os imóveis
exports.listar = (req, res) => {
    db.query('SELECT * FROM cadastrar_novo_imovel', (erro, resultado) => {
        if (erro) return res.status(500).json({ erro: 'Erro ao buscar imóveis.' });
        res.status(200).json(resultado);
    });
};

// Buscar imóvel por ID
exports.buscarPorId = (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM cadastrar_novo_imovel WHERE id_imovel = ?', [id], (erro, resultado) => {
        if (erro) return res.status(500).json({ erro: 'Erro ao buscar imóvel.' });
        if (resultado.length === 0) return res.status(404).json({ mensagem: 'Imóvel não encontrado.' });
        res.status(200).json(resultado[0]);
    });
};

// Cadastrar novo imóvel (recebe req.body e req.file)
exports.cadastrar = (req, res) => {
    const { imovel_cep, imovel_bairro, imovel_numero, imovel_logradouro } = req.body;
    const caminho_imagem = req.file ? req.file.path : null;

    if (!imovel_cep || !imovel_bairro || !imovel_numero || !imovel_logradouro || !caminho_imagem) {
        return res.status(400).json({ erro: 'Todos os campos são obrigatórios, inclusive a imagem.' });
    }

    const sql = `
        INSERT INTO cadastrar_novo_imovel (imovel_cep, imovel_bairro, imovel_numero, imovel_logradouro, caminho_imagem)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [imovel_cep, imovel_bairro, imovel_numero, imovel_logradouro, caminho_imagem],
        (erro, resultado) => {
            if (erro) return res.status(500).json({ erro: 'Erro ao cadastrar imóvel.' });
            res.status(201).json({ mensagem: 'Imóvel cadastrado com sucesso!', id: resultado.insertId });
        }
    );
};

// Atualizar imóvel
exports.atualizar = (req, res) => {
    const id = req.params.id;
    const { imovel_cep, imovel_bairro, imovel_numero, imovel_logradouro } = req.body;
    const caminho_imagem = req.file ? req.file.path : null;

    let sql, params;
    if (caminho_imagem) {
        sql = `
            UPDATE cadastrar_novo_imovel
            SET imovel_cep = ?, imovel_bairro = ?, imovel_numero = ?, imovel_logradouro = ?, caminho_imagem = ?
            WHERE id_imovel = ?
        `;
        params = [imovel_cep, imovel_bairro, imovel_numero, imovel_logradouro, caminho_imagem, id];
    } else {
        sql = `
            UPDATE cadastrar_novo_imovel
            SET imovel_cep = ?, imovel_bairro = ?, imovel_numero = ?, imovel_logradouro = ?
            WHERE id_imovel = ?
        `;
        params = [imovel_cep, imovel_bairro, imovel_numero, imovel_logradouro, id];
    }

    db.query(
        sql,
        params,
        (erro, resultado) => {
            if (erro) return res.status(500).json({ erro: 'Erro ao atualizar imóvel.' });
            res.status(200).json({ mensagem: 'Imóvel atualizado com sucesso!' });
        }
    );
};

// Excluir imóvel
exports.excluir = (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM cadastrar_novo_imovel WHERE id_imovel = ?', [id], (erro, resultado) => {
        if (erro) return res.status(500).json({ erro: 'Erro ao excluir imóvel.' });
        res.status(200).json({ mensagem: 'Imóvel excluído com sucesso!' });
    });
};