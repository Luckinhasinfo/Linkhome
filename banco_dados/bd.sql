-- SQLBook: Code
CREATE table proprietario(
    cpf CHAR(11) PRIMARY KEY NOT NULL,
    nome VARCHAR(90) NOT NULL,
    data_nascimento DATE NOT NULL,
    Foreign Key (id_telefone) REFERENCES telefone(id_telefone),
    Foreign Key (id_enedereco) REFERENCES endereco(id_enedereco)
);
CREATE table propriedade(
    id_propriedade INT AUTO_INCREMENT PRIMARY KEY,
    descricao VARCHAR(500) NOT NULL,
    nota_propriedade FLOAT(1),
    tamanho FLOAT(2) NOT NULL,
    Foreign Key (id_enedereco) REFERENCES endereco(id_enedereco)
);
CREATE table aluguel(
    id_aluguel INT AUTO_INCREMENT PRIMARY KEY,
    data_inicio DATE,
    data_termino DATE,
    Foreign Key (cpf) REFERENCES proprietario(cpf),
    Foreign Key (id_Cliente) REFERENCES cliente(id_Cliente)
);
create table telefone(
    id_telefone INT AUTO_INCREMENT PRIMARY KEY,
    numero INT
);
create table endereco(
    id_endereco INT AUTO_INCREMENT PRIMARY KEY,
    logradouro varchar(130) NOT NULL,
    cidade varchar(50) NOT NULL,
    bairro varchar(100) NOT NULL,
    numero INT NOT NULL
);
create table cliente(
  id_Cliente INT PRIMARY key NOT NULL,
  nome varchar(150) NOT NULL, 
  dt_nasc DATE NOT NULL,
  notaCliente FLOAT(1)
);

CREATE TABLE telefone (
    id_telefone INT AUTO_INCREMENT PRIMARY KEY,
    numero VARCHAR(20) NOT NULL
);

CREATE TABLE endereco (
    id_endereco INT AUTO_INCREMENT PRIMARY KEY,
    logradouro VARCHAR(130) NOT NULL,
    cidade VARCHAR(50) NOT NULL,
    bairro VARCHAR(100) NOT NULL,
    numero INT NOT NULL
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