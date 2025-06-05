const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const session = require('express-session');
app.use(session({
    secret: 'seuSegredo',
    resave: false,
    saveUninitialized: true
}));

app.use(cors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:5500'], // ou o endereço do seu frontend
    credentials: true
}));
app.use(express.json());

const usuariosRouter = require('./routers/usuarios');
app.use('/usuarios', usuariosRouter);

const loginInicialRouter =require('./routers/login_inicial_router');
app.use('/login_inicial_router', loginInicialRouter);

const cadastroImovelRouter = require('./routers/cadastrar_imovel_router');
app.use('/cadastrar_imovel_router', cadastroImovelRouter);

const infoImovelRouter = require('./routers/info_imovel_router');
app.use('/info_imovel_router', infoImovelRouter);

app.use(express.static(path.join(__dirname, '..')));

const PORT = 3000;

app.get('/', (req, res) => {
     res.send('Servidor funcionando com sucesso!');
});

app.listen(PORT, () => {
     console.log(`Servidor rodando na porta ${PORT}`);
});
