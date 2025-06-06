-- SQLBook: Code
CREATE TABLE usuarios (
    cpf VARCHAR(20) NOT NULL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    data_nascimento DATE NOT NULL,
    logado BOOLEAN NOT NULL DEFAULT FALSE
);

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
    situacao_aluguel INT NOT NULL
);

CREATE TABLE reservar_imovel (
    id_reserva INT AUTO_INCREMENT PRIMARY KEY,
    id_imovel INT NOT NULL,
    id_usuario VARCHAR(20) NOT NULL,
    data_check_in DATE NOT NULL,
    data_check_out DATE NOT NULL,
    num_hospedes INT NOT NULL,
    FOREIGN KEY (id_imovel) REFERENCES cadastrar_imovel(id),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(cpf)
);