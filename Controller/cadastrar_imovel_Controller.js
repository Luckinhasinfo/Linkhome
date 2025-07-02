const db = require('../models/bd_config');
// Cadastrar novo imóvel
exports.cadastrar = (req, res) => {
  

    const {
        cpf_proprietario,
        imovel_cep,
        imovel_bairro,
        imovel_numero,
        imovel_logradouro,
        descricao,
        files_name,
        comodos,
        camas,
        banheiros,
        quartos,
        valorProprietario,
        situacao_aluguel
    } = req.body;
console.log('Dados recebidos:', req.body);
    if (
        !cpf_proprietario || !imovel_cep || !imovel_bairro || !imovel_numero || !imovel_logradouro ||
        !descricao || !files_name ||
        comodos === undefined || camas === undefined || banheiros === undefined ||
        quartos === undefined || valorProprietario === undefined || situacao_aluguel === undefined
    ) {
        return res.status(400).json({ erro: 'Todos os campos são obrigatórios.' });
    }

    const sql = `
        INSERT INTO cadastrar_imovel (
            cpf_proprietario, imovel_cep, imovel_bairro, imovel_numero, imovel_logradouro, descricao, files_name,
            comodos, camas, banheiros, quartos, valorProprietario, situacao_aluguel
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    db.query(
        sql,
        [
            cpf_proprietario,
            imovel_cep,
            imovel_bairro,
            imovel_numero,
            imovel_logradouro,
            descricao,
            files_name,
            comodos,
            camas,
            banheiros,
            quartos,
            valorProprietario,
            situacao_aluguel
        ],
        (erro, resultado) => {
            if (erro) {
                console.error('Erro ao cadastrar imóvel:', erro);
                return res.status(500).json({ erro: 'Erro ao cadastrar imóvel.' });
            }
            res.status(201).json({ mensagem: 'Imóvel cadastrado com sucesso!', id: resultado.insertId });
        }
    );
};

// Listar todos os imóveis
exports.listar = (req, res) => {
    db.query('SELECT * FROM cadastrar_imovel', (erro, resultado) => {
        if (erro) {
            console.error('Erro ao listar imóveis:', erro);
            return res.status(500).json({ erro: 'Erro ao listar imóveis.' });
        }
        res.status(200).json(resultado);
    });
};

// Buscar imóvel por ID
exports.buscarPorId = (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM cadastrar_imovel WHERE id = ?', [id], (erro, resultado) => {
        if (erro) {
            console.error('Erro ao buscar imóvel:', erro);
            return res.status(500).json({ erro: 'Erro ao buscar imóvel.' });
        }
        if (resultado.length === 0) {
            return res.status(404).json({ mensagem: 'Imóvel não encontrado.' });
        }
        res.status(200).json(resultado[0]);
    });
};

// Atualizar imóvel
exports.atualizar = (req, res) => {
    const id = req.params.id;
    const {

        imovel_cep,
        imovel_bairro,
        imovel_numero,
        imovel_logradouro,
        descricao,
        files_name,
        comodos,
        camas,
        banheiros,
        quartos,
        valorProprietario,
        situacao_aluguel
    } = req.body;
console.log('Dados recebidos para atualização:', req.body);
console.log(id);
    const sql = `
        UPDATE cadastrar_imovel SET
            imovel_cep = ?, imovel_bairro = ?, imovel_numero = ?, imovel_logradouro = ?, descricao = ?, files_name = ?,
            comodos = ?, camas = ?, banheiros = ?, quartos = ?, valorProprietario = ?, situacao_aluguel = ?
        WHERE id = ?
    `;

    db.query(
        sql,
        [

            imovel_cep,
            imovel_bairro,
            imovel_numero,
            imovel_logradouro,
            descricao,
            files_name,
            comodos,
            camas,
            banheiros,
            quartos,
            valorProprietario,
            situacao_aluguel,
            id
        ],
        (erro, resultado) => {
            if (erro) {
                console.error('Erro ao atualizar imóvel:', erro);
                return res.status(500).json({ erro: 'Erro ao atualizar imóvel.' });
            }
            if (resultado.affectedRows === 0) {
                return res.status(404).json({ mensagem: 'Imóvel não encontrado.' });
            }
            res.status(200).json({ mensagem: 'Imóvel atualizado com sucesso.' });
        }
    );
};

// Excluir imóvel
exports.excluir = (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM cadastrar_imovel WHERE id = ?', [id], (erro, resultado) => {
        if (erro) {
            console.error('Erro ao excluir imóvel:', erro);
            return res.status(500).json({ erro: 'Erro ao excluir imóvel.' });
        }
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ mensagem: 'Imóvel não encontrado.' });
        }
        res.status(200).json({ mensagem: 'Imóvel excluído com sucesso.' });
    });
};
