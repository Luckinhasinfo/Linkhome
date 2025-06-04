const db = require('../banco_dados/bd_config');

// Listar todos os imóveis
exports.listar = (req, res) => {
    db.query('SELECT * FROM cadastrar_novo_imovel', (erro, resultado) => {
        if (erro) {
            console.error('Erro ao buscar imóveis:', erro);
            return res.status(500).json({ erro: 'Erro ao buscar imóveis.' });
        }
        res.status(200).json(resultado);
    });
};

// Buscar imóvel por ID
exports.buscarPorId = (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM cadastrar_novo_imovel WHERE id_imovel = ?', [id], (erro, resultado) => {
        if (erro) {
            console.error('Erro ao buscar imóvel:', erro);
            return res.status(500).json({ erro: 'Erro ao buscar imóvel.' });
        }
        if (resultado.length === 0) return res.status(404).json({ mensagem: 'Imóvel não encontrado.' });
        res.status(200).json(resultado[0]);
    });
};

// Cadastrar novo imóvel (imagem opcional, salva em files_name)
exports.cadastrar = (req, res) => {
    const { imovel_cep, imovel_bairro, imovel_numero, imovel_logradouro, files_name } = req.body;

    // Log para depuração
    console.log('Recebido no cadastro:', req.body);

    // Validação: todos os campos obrigatórios
    if (!imovel_cep || !imovel_bairro || !imovel_numero || !imovel_logradouro || !files_name) {
        return res.status(400).json({ erro: 'Todos os campos são obrigatórios, inclusive o nome da imagem.' });
    }

    const sql = `
        INSERT INTO cadastrar_novo_imovel (imovel_cep, imovel_bairro, imovel_numero, imovel_logradouro, files_name)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [imovel_cep, imovel_bairro, imovel_numero, imovel_logradouro, files_name],
        (erro, resultado) => {
            if (erro) {
                console.error('Erro ao cadastrar imóvel:', erro);
                return res.status(500).json({ erro: 'Erro ao cadastrar imóvel.' });
            }
            res.status(201).json({ mensagem: 'Imóvel cadastrado com sucesso!', id: resultado.insertId });
        }
    );
};

// Atualizar imóvel (imagem opcional, salva em files_name)
exports.atualizar = (req, res) => {
    const id = req.params.id;
    const { imovel_cep, imovel_bairro, imovel_numero, imovel_logradouro, files_name } = req.body;

    let sql, params;
    if (files_name && files_name.trim() !== '' && files_name !== ';') {
        sql = `
            UPDATE cadastrar_novo_imovel
            SET imovel_cep = ?, imovel_bairro = ?, imovel_numero = ?, imovel_logradouro = ?, files_name = ?
            WHERE id_imovel = ?
        `;
        params = [imovel_cep, imovel_bairro, imovel_numero, imovel_logradouro, files_name, id];
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
            if (erro) {
                console.error('Erro ao atualizar imóvel:', erro);
                return res.status(500).json({ erro: 'Erro ao atualizar imóvel.' });
            }
            res.status(200).json({ mensagem: 'Imóvel atualizado com sucesso!' });
        }
    );
};

// Excluir imóvel
exports.excluir = (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM cadastrar_novo_imovel WHERE id_imovel = ?', [id], (erro, resultado) => {
        if (erro) {
            console.error('Erro ao excluir imóvel:', erro);
            return res.status(500).json({ erro: 'Erro ao excluir imóvel.' });
        }
        res.status(200).json({ mensagem: 'Imóvel excluído com sucesso!' });
    });
};

