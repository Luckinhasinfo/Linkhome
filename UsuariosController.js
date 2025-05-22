const db = require('../db');

// Lista todos os usuários
exports.listar = (req, res) => {
    db.query('SELECT * FROM usuarios', (erro, resultado) => {
        if (erro) return res.status(500).json({ erro: 'Erro ao buscar usuários.' });
        res.status(200).json(resultado);
    });
};

// Busca um único usuário
exports.buscarPorId = (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM usuarios WHERE id = ?', [id], (erro, resultado) => {
        if (erro) return res.status(500).json({ erro: 'Erro ao buscar usuário.' });
        if (resultado.length === 0) return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
        res.status(200).json(resultado[0]);
    });
};

// Cadastra um novo usuário
exports.cadastrar = (req, res) => {
    const { nome, email } = req.body;
    if (!nome || !email) return res.status(400).json({ erro: 'Nome e email são obrigatórios.' });

    const sql = 'INSERT INTO usuarios (nome, email) VALUES (?, ?)';
    db.query(sql, [nome, email], (erro, resultado) => {
        if (erro) return res.status(500).json({ erro: 'Erro ao cadastrar usuário.' });
        res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso!', id: resultado.insertId });
    });
};

// Atualiza um usuário
exports.atualizar = (req, res) => {
    const id = req.params.id;
    const { nome, email } = req.body;
    if (!nome || !email) return res.status(400).json({ erro: 'Nome e email são obrigatórios.' });

    const sql = 'UPDATE usuarios SET nome = ?, email = ? WHERE id = ?';
    db.query(sql, [nome, email, id], (erro, resultado) => {
        if (erro) return res.status(500).json({ erro: 'Erro ao atualizar usuário.' });
        if (resultado.affectedRows === 0) return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
        res.status(200).json({ mensagem: 'Usuário atualizado com sucesso.' });
    });
};

// Exclui um usuário
exports.excluir = (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM usuarios WHERE id = ?', [id], (erro, resultado) => {
        if (erro) return res.status(500).json({ erro: 'Erro ao excluir usuário.' });
        if (resultado.affectedRows === 0) return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
        res.status(200).json({ mensagem: 'Usuário excluído com sucesso.' });
    });
};
