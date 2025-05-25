const express = require('express');
const app = express();//pense nisso como o servidor
app.use(express.json());//consegue enteder o arquivo JSON  com os bgl la
const db = require('banco_dados/bd_config');//e nosso arquivo de conect com bd
const PORT = 3000; //coloquei a 3000 mas quem quiser muda

app.get('/', (req, res) => {
     res.send('Servidor funcionando com sucesso!');
});//testa a porra do serv

app.listen(PORT, () => {
     console.log(`Servidor rodando na porta ${PORT}`);
});//roda o serv

