const db = require('../models/bd_config');

// Lista todas as reservas
exports.listar = (req, res) => {
    db.query('SELECT * FROM reservar_imovel', (erro, resultado) => {
        if (erro) return res.status(500).json({ erro: 'Erro ao buscar reservas.' });
        res.status(200).json(resultado);
    });
};

// Busca uma reserva por ID
exports.buscarPorId = (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM reservar_imovel WHERE id_reserva = ?', [id], (erro, resultado) => {
        if (erro) return res.status(500).json({ erro: 'Erro ao buscar reserva.' });
        if (resultado.length === 0) return res.status(404).json({ mensagem: 'Reserva não encontrada.' });
        res.status(200).json(resultado[0]);
    });
};

// Cadastra uma nova reserva
exports.cadastrar = (req, res) => {
    const { id_usuario, id_imovel, num_hospedes, data_check_in, data_check_out} = req.body;

    if (
        !id_usuario ||
        !id_imovel ||
        !num_hospedes ||
        !data_check_in ||
        !data_check_out
    ) {
        return res.status(400).json({ erro: 'Todos os campos são obrigatórios.' });
    }

    const sql = `
        INSERT INTO reservar_imovel (id_usuario, id_imovel, num_hospedes, data_check_in, data_check_out)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [id_usuario, id_imovel, num_hospedes, data_check_in, data_check_out],
        (erro, resultado) => {
            if (erro) {
                console.error('Erro ao cadastrar reserva:', erro);
                return res.status(500).json({ erro: 'Erro ao cadastrar reserva.' });
            }
            // Atualiza situacao_aluguel para 1 no imóvel reservado
            db.query(
                'UPDATE cadastrar_imovel SET situacao_aluguel = 1 WHERE id = ?',
                [id_imovel],
                (erroUpdate) => {
                    if (erroUpdate) {
                        console.error('Erro ao atualizar situacao_aluguel:', erroUpdate);
                        return res.status(500).json({ erro: 'Reserva cadastrada, mas erro ao atualizar situação do imóvel.' });
                    }
                    res.status(201).json({ mensagem: 'Reserva cadastrada com sucesso!', id: resultado.insertId });
                }
            );
        }
    );
};

// Atualiza uma reserva
exports.atualizar = (req, res) => {
    const id = req.params.id;
    const { id_usuario, id_imovel, num_hospedes, data_check_in, data_check_out} = req.body;

    if (
        !id_usuario ||
        !id_imovel ||
        !num_hospedes ||
        !data_check_in ||
        !data_check_out
    ) {
        return res.status(400).json({ erro: 'Todos os campos são obrigatórios.' });
    }

    const sql = `
        UPDATE reservar_imovel
        SET id_usuario = ?, id_imovel = ?, num_hospedes = ?, data_check_in = ?, data_check_out = ?
        WHERE id_reserva = ?
    `;
    db.query(sql, [id_usuario, id_imovel, num_hospedes, data_check_in, data_check_out, id], (erro, resultado) => {
        if (erro) return res.status(500).json({ erro: 'Erro ao atualizar reserva.' });
        if (resultado.affectedRows === 0) return res.status(404).json({ mensagem: 'Reserva não encontrada.' });
        res.status(200).json({ mensagem: 'Reserva atualizada com sucesso.' });
    });
};

// Exclui uma reserva
exports.excluir = (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM reservar_imovel WHERE id_reserva = ?', [id], (erro, resultado) => {
        if (erro) return res.status(500).json({ erro: 'Erro ao excluir reserva.' });
        if (resultado.affectedRows === 0) return res.status(404).json({ mensagem: 'Reserva não encontrada.' });
        res.status(200).json({ mensagem: 'Reserva excluída com sucesso.' });
    });
};