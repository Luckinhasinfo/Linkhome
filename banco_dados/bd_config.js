// 1. Importa o mysql2 para usar suas funções de conexão
const mysql = require('mysql2');

// 2. Cria a conexão com o banco de dados
const conexao = mysql.createConnection({
  host: 'localhost',     // Endereço do servidor do banco de dados
  user: 'root',          // Nome do usuário do banco (padrão: root)
  password: '',          // Senha do banco (vazia no XAMPP/WAMP padrão)
  database: 'crud_usuarios' // Nome do banco que criamos
});

// 3. Conecta ao banco e mostra erro ou sucesso
conexao.connect((erro) => {
  if (erro) {
    console.error('Erro ao conectar com o banco de dados:', erro);
    return;
  }
  console.log('Conexão com o banco de dados realizada com sucesso!');
});

// 4. Exporta a conexão para ser usada em outros arquivos do projeto
module.exports = conexao;
