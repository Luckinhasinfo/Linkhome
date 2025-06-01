const db = require('../banco_dados/bd_config');

// Lista todos os logins (opcional, se quiser listar todos os usuários)
exports.listar = (req, res) => {
    db.query('SELECT * FROM usuarios', (erro, resultado) => {
        if (erro) return res.status(500).json({ erro: 'Erro ao buscar usuários.' });
        res.status(200).json(resultado);
    });
};

// Busca um usuário por ID
exports.buscarPorId = (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM usuarios WHERE id = ?', [id], (erro, resultado) => {
        if (erro) return res.status(500).json({ erro: 'Erro ao buscar usuário.' });
        if (resultado.length === 0) return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
        res.status(200).json(resultado[0]);
    });
};

// Realiza login
exports.login = (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ erro: 'Email e senha são obrigatórios.' });
    }

    const sql = 'SELECT * FROM usuarios WHERE email = ? AND senha = ?';
    db.query(sql, [email, senha], (erro, resultado) => {
        if (erro) {
            console.error('Erro ao realizar login:', erro);
            return res.status(500).json({ erro: 'Erro ao realizar login.' });
        }
        if (resultado.length === 0) {
            return res.status(401).json({ mensagem: 'Email ou senha inválidos.' });
        }
        res.status(200).json({ mensagem: 'Login realizado com sucesso!', usuario: resultado[0] });
    });
};