let valores = [0, 0, 0, 0, 0, 0, 0, 0];

function enviarForm() {
    let checkbox = document.getElementsByName('checkbox');
    for (let i = 0; i < checkbox.length; i++) {
        valores[i] = checkbox[i].checked ? 1 : 0;
        
    }

    
    const [freezer, fogao, televisao, garagem, ar_condicionado, wifi, maquina_de_lavar, geladeira] = valores;

    enviarDados(freezer, fogao, televisao, garagem, ar_condicionado, wifi, maquina_de_lavar, geladeira);
}

async function enviarDados(freezer, fogao, televisao, garagem, ar_condicionado, wifi, maquina_de_lavar, geladeira) {
    try {
        const resposta = await fetch('http://localhost:3000/cadastrar_imovel_part3_router', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                freezer : freezer,
                fogao: fogao,
                televisao: televisao,
                garagem : garagem,
                ar_condicionado : ar_condicionado,
                wifi : wifi,
                maquina_de_lavar: maquina_de_lavar,
                geladeira: geladeira
            })
        });

        const resultado = await resposta.json();

        if (resposta.ok) {
            alert('enviado com sucesso');
            window.location.href = "../meus_imoveis/meus_imoveis.html";
        } else {
            alert('Erro: ' + resultado.erro);
        }
    } catch (error) {
        alert('Erro inesperado: ' + error.message);
    }
}

// Corrigido: passar a função SEM os parênteses
let botao = document.getElementById("botaoProximo");
botao.addEventListener('click', enviarForm);
