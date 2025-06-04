CREATE TABLE cadastrar_novo_imovel (
    id_imovel INT AUTO_INCREMENT PRIMARY KEY,
    imovel_cep VARCHAR(20) NOT NULL,
    imovel_bairro VARCHAR(100) NOT NULL,
    imovel_numero INT NOT NULL,
    imovel_logradouro VARCHAR(130) NOT NULL,
    files_name VARCHAR(255)
);