function enviarForm{
    let selectComodos = document.getElementById('selectComodos');
    let selectedTextComodos = selectComodos.text;
    let selectCamas = document.getElementById('selectCamas');
    let selectedTextCamas = selectCamas.text;
    let selectBanheiros = document.getElementById('selectBanheiros');
    let selectedTextBanheiros = selectBanheiros.text;
    let selectQuartos = document.getElementById(`selectQuartos`)/
    let selectQuartos = selectQuartos.text;
    let valorProprietario = parseFloat(document.getElementById('idValorProprietario'.value));
};

function inputColect (value, get) {
    let value = document.getElementById(get).selectComodos.text;
};

let botao = document.getElementById('botaoProximo');
botao.addEventListener('click', enviarForm());
botao.addEventListener('click', () => { window.location.href = "../cadastrar_novo_imovel_part3/cadastrar_novo_imovel_part3.html" })

