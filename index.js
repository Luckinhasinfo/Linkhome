const express = require('express');
const cors = require('cors');
const path = require('path');
const session = require('express-session');

const app = express();

app.use(session({
    secret: 'seuSegredo',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false, // só true com HTTPS
        httpOnly: false,
        sameSite: 'lax' // ou 'none' se usar domínios diferentes
    }
}));


// CORS depois da sessão
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3000', 'http://127.0.0.1:3000', 'http://127.0.0.1:5500'], // seu frontend
    credentials: true
}));

// Outros middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
const usuariosRouter = require('./routers/usuarios');
app.use('/usuarios', usuariosRouter);

const loginInicialRouter = require('./routers/login_inicial_router');
app.use('/login_inicial_router', loginInicialRouter);

const cadastroImovelRouter = require('./routers/cadastrar_imovel_router');
app.use('/cadastrar_imovel_router', cadastroImovelRouter);

const infoImovelRouter = require('./routers/info_imovel_router');
app.use('/info_imovel_router', infoImovelRouter);

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, '..')));


// Inicialização
const PORT = 3000;
app.get('/', (req, res) => {
    res.send('Servidor funcionando com sucesso!');
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
