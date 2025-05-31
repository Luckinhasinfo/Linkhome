const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();//pense nisso como o servidor

app.use(cors());
app.use(express.json());

const usuariosRouter = require('./banco_dados/usuarios'); // Importa o arquivo de rotas

app.use('/usuarios', usuariosRouter); // Define a rota base para usuários

app.use(express.static(path.join(__dirname, '..')));


const PORT = 3000; //coloquei a 3000 mas quem quiser muda

app.get('/', (req, res) => {
     res.send('Servidor funcionando com sucesso!');
});//testa a porra do serv

app.listen(PORT, () => {
     console.log(Servidor rodando na porta ${PORT});
});//roda o serv
