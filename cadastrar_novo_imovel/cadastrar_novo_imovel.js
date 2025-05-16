let imovel_cep = documento.getElementById('imovel_cep').value;
let imovel_bairro = documento.getElementById('imovel_bairro').value;
let imovel_numero = documento.getElementById('imovel_numero').value;
let imovel_logradouro = documento.getElementById('imovel_logradouro').value;


let botao = document.getElementById('botaoProximo');
botao.addEventListener('click', () => { window.location.href = "../cadastrar_novo_imovel_part2/cadastrar_novo_imovel_part2.html" })