const db = require('../banco_dados/bd_config');

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
  console.log('Recebi dados para cadastro:', req.body);

  const { email, cpf, senha, telefone, data_nascimento } = req.body;

  if (!email || !cpf || !senha || !telefone || !data_nascimento) {
    return res.status(400).json({ erro: 'Todos os campos são obrigatórios.' });
  }

  const sql = 'INSERT INTO usuarios (email, cpf, senha, telefone, data_nascimento) VALUES (?, ?, ?, ?, ?)';

  db.query(sql, [email, cpf, senha, telefone, data_nascimento], (erro, resultado) => {
    if (erro) {
      console.error('Erro ao cadastrar:', erro);
      return res.status(500).json({ erro: 'Erro ao cadastrar usuário.' });
    }

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
