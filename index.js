const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());

const usuariosRouter = require('./routers/usuarios');
app.use('/usuarios', usuariosRouter);

const cadastroImovelrouter =require('./routers/cadastrar_imovel_part2_router');
app.use('/cadastrar_imovel_part2_router', cadastroImovelrouter);
app.use(express.static(path.join(__dirname, '..')));

const PORT = 3000;

app.get('/', (req, res) => {
     res.send('Servidor funcionando com sucesso!');
});

app.listen(PORT, () => {
     console.log(`Servidor rodando na porta ${PORT}`);
});
