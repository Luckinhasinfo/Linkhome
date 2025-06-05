const db = require('../banco_dados/bd_config');

// Lista todas as reservas
exports.listar = (req, res) => {
    db.query('SELECT * FROM imovel_reserva', (erro, resultado) => {
        if (erro) return res.status(500).json({ erro: 'Erro ao buscar reservas.' });
        res.status(200).json(resultado);
    });
};

// Busca uma reserva por ID
exports.buscarPorId = (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM imovel_reserva WHERE id = ?', [id], (erro, resultado) => {
        if (erro) return res.status(500).json({ erro: 'Erro ao buscar reserva.' });
        if (resultado.length === 0) return res.status(404).json({ mensagem: 'Reserva não encontrada.' });
        res.status(200).json(resultado[0]);
    });
};

// Cadastra uma nova reserva
exports.cadastrar = (req, res) => {
    const { numeroHospedes, checkIn, checkOut } = req.body;

    if (
        numeroHospedes === undefined ||
        checkIn === undefined ||
        checkOut === undefined
    ) {
        return res.status(400).json({ erro: 'Todos os campos são obrigatórios.' });
    }

    const sql = `
        INSERT INTO imovel_reserva (numero_hospedes, check_in, check_out)
        VALUES (?, ?, ?)
    `;

    db.query(
        sql,
        [numeroHospedes, checkIn, checkOut],
        (erro, resultado) => {
            if (erro) {
                console.error('Erro ao cadastrar reserva:', erro);
                return res.status(500).json({ erro: 'Erro ao cadastrar reserva.' });
            }
            res.status(201).json({ mensagem: 'Reserva cadastrada com sucesso!', id: resultado.insertId });
        }
    );
};

// Atualiza uma reserva
exports.atualizar = (req, res) => {
    const id = req.params.id;
    const { numeroHospedes, checkIn, checkOut } = req.body;
    if (
        numeroHospedes === undefined ||
        checkIn === undefined ||
        checkOut === undefined
    ) {
        return res.status(400).json({ erro: 'Todos os campos são obrigatórios.' });
    }

    const sql = `
        UPDATE imovel_reserva
        SET numero_hospedes = ?, check_in = ?, check_out = ?
        WHERE id = ?
    `;
    db.query(sql, [numeroHospedes, checkIn, checkOut, id], (erro, resultado) => {
        if (erro) return res.status(500).json({ erro: 'Erro ao atualizar reserva.' });
        if (resultado.affectedRows === 0) return res.status(404).json({ mensagem: 'Reserva não encontrada.' });
        res.status(200).json({ mensagem: 'Reserva atualizada com sucesso.' });
    });
};

// Exclui uma reserva
exports.excluir = (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM imovel_reserva WHERE id = ?', [id], (erro, resultado) => {
        if (erro) return res.status(500).json({ erro: 'Erro ao excluir reserva.' });
        if (resultado.affectedRows === 0) return res.status(404).json({ mensagem: 'Reserva não encontrada.' });
        res.status(200).json({ mensagem: 'Reserva excluída com sucesso.' });
    });
};