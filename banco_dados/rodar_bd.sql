-- SQLBook: Code
CREATE TABLE cadastrar_imovel (
     id INT AUTO_INCREMENT PRIMARY KEY,
    cpf_proprietario VARCHAR(11) NOT NULL,
    imovel_cep VARCHAR(20) NOT NULL,
    imovel_bairro VARCHAR(100) NOT NULL,
    imovel_numero INT NOT NULL,
    imovel_logradouro VARCHAR(130) NOT NULL,
    descricao VARCHAR(500) NOT NULL,
    files_name VARCHAR(255),
    comodos INT NOT NULL,
    camas INT NOT NULL,
    banheiros INT NOT NULL,
    quartos INT NOT NULL,
    valorProprietario DECIMAL(10,2) NOT NULL,
    estadoAluguel INT NOT NULL
);