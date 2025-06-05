-- SQLBook: Code
CREATE TABLE cadastrar_novo_imovel (
    id_imovel INT AUTO_INCREMENT PRIMARY KEY,
    imovel_cep VARCHAR(20) NOT NULL,
    imovel_bairro VARCHAR(100) NOT NULL,
    imovel_numero INT NOT NULL,
    imovel_logradouro VARCHAR(130) NOT NULL,
    files_name VARCHAR(255)
);
create table endereco(
    id_endereco INT AUTO_INCREMENT PRIMARY KEY,
    logradouro varchar(130) NOT NULL,
    cidade varchar(50) NOT NULL,
    bairro varchar(100) NOT NULL,
    numero INT NOT NULL
);
CREATE TABLE telefone (
    id_telefone INT AUTO_INCREMENT PRIMARY KEY,
    numero VARCHAR(20) NOT NULL
);




CREATE TABLE proprietario (
    cpf CHAR(11) PRIMARY KEY NOT NULL,
    nome VARCHAR(90) NOT NULL,
    data_nascimento DATE NOT NULL,
    id_telefone INT,
    id_endereco INT,
    FOREIGN KEY (id_telefone) REFERENCES telefone(id_telefone),
    FOREIGN KEY (id_endereco) REFERENCES endereco(id_endereco)
);

CREATE TABLE propriedade (
    id_propriedade INT AUTO_INCREMENT PRIMARY KEY,
    descricao VARCHAR(500) NOT NULL,
    nota_propriedade DECIMAL(3,2),
    tamanho DECIMAL(10,2) NOT NULL,
    id_endereco INT,
    FOREIGN KEY (id_endereco) REFERENCES endereco(id_endereco)
);

CREATE TABLE cliente (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    nome VARCHAR(150) NOT NULL, 
    dt_nasc DATE NOT NULL,
    notaCliente INT
);

CREATE TABLE aluguel (
    id_aluguel INT AUTO_INCREMENT PRIMARY KEY,
    data_inicio DATE NOT NULL,
    data_termino DATE NOT NULL,
    cpf CHAR(11),
    id_cliente INT,
    FOREIGN KEY (cpf) REFERENCES proprietario(cpf),
    FOREIGN KEY (id_cliente) REFERENCES cliente(id_cliente)
);

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    cpf VARCHAR(20) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    data_nascimento DATE NOT NULL
);

CREATE TABLE dados_imovel (
    id int(11) NOT NULL AUTO_INCREMENT,
    comodos int(11) NOT NULL,
    camas int(11) NOT NULL,
    banheiros int(11) NOT NULL,
    quartos int(11) NOT NULL,
    valor_proprietario decimal(10, 2) NOT NULL,
);
 create table info_adicional( 
    freezer BOOLEAN,
    fogao  BOOLEAN,
    televisao BOOLEAN,
    garagem BOOLEAN,
    ar_condicionado BOOLEAN,
    wifi BOOLEAN,
    maquina_de_lavar BOOLEAN,
    geladeira BOOLEAN,
    id_propriedade INT,
    FOREIGN key (id_propriedade) REFERENCES propriedade(id_propriedade)
  );

  CREATE TABLE info_imovel (
    id INT AUTO_INCREMENT PRIMARY KEY,
    check_in DATE NOT NULL,
    check_out DATE NOT NULL,
    numero_hospedes INT NOT NULL,
    valor_total DECIMAL(10,2) NOT NULL
);
-- SQLBook: Code
