
async function pegar_dados() {
    // Dados principais
    let imovel_cep = document.getElementById('imovel_cep').value;
    let imovel_bairro = document.getElementById('imovel_bairro').value;
    let imovel_numero = document.getElementById('imovel_numero').value;
    let imovel_logradouro = document.getElementById('imovel_logradouro').value;
    let descricao = document.getElementById('floatingTextarea2').value;
    let files = document.getElementById('foto_imovel').files;

    // Detalhes do imóvel
    const comodos = parseInt(document.getElementById('selectComodos').value);
    const camas = parseInt(document.getElementById('selectCamas').value);
    const banheiros = parseInt(document.getElementById('selectBanheiros').value);
    const quartos = parseInt(document.getElementById('selectQuartos').value);
    const valorProprietario = parseFloat(document.querySelector('#idValorProprietario input').value);
    const situacao_aluguel = 0;
    // Validação simples
    if (
        imovel_cep === '' && isNaN(imovel_cep) === true  ||
        imovel_bairro === '' && isNaN(imovel_bairro) === false  ||
        imovel_numero === '' && isNaN(imovel_numero) === true ||
        imovel_logradouro === '' && isNaN(imovel_numero) === false ||
        descricao === ''  ||
        files.length === 0 ||
        isNaN(comodos) || comodos <= 0 ||
        isNaN(camas) || camas < 0 ||
        isNaN(banheiros) || banheiros < 0 ||
        isNaN(quartos) || quartos < 0 ||
        isNaN(valorProprietario) || valorProprietario <= 0
    ) {
        alert('Preencha todos os campos obrigatórios!');
        return;
    }

    // 1. Envie as imagens primeiro e pegue o(s) caminho(s) retornado(s)
    let files_name = '';
    try {
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append('fotos_imovel', files[i]);
        }
        const respostaImg = await fetch('http://localhost:3000/cadastrar_imovel_router/upload', {
            method: 'POST',
            body: formData
        });
        const dadosImg = await respostaImg.json();
        if (!respostaImg.ok) {
            alert('Erro ao enviar imagem');
            return;
        }
        // Junta todos os caminhos em uma string separada por ';'
        files_name = dadosImg.files.join(';');
    } catch (error) {
        alert('Erro ao enviar imagem: ' + error.message);
        return;
    }
    let id_imovel = sessionStorage.getItem('idimovel');
    console.log(`tste id: ${id_imovel}`)
    // 2. Envie os dados do imóvel com o caminho da(s) imagem(ns)
    await enviarDados(
        imovel_cep,
        imovel_bairro,
        imovel_numero,
        imovel_logradouro,
        descricao,
        files_name,
        comodos,
        camas,
        banheiros,
        quartos,
        valorProprietario,
        situacao_aluguel,
        id_imovel
    );
}

async function enviarDados(imovel_cep, imovel_bairro, imovel_numero, imovel_logradouro, descricao,
    files_name, comodos, camas, banheiros, quartos, valorProprietario, situacao_aluguel,
    id_imovel
) {
    try {
     console.log(`id: ${id_imovel}`)
        const resposta = await fetch(`http://localhost:3000/cadastrar_imovel_router/${id_imovel}`, {
            method: 'PUT',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({

                imovel_cep: imovel_cep,
                imovel_bairro: imovel_bairro,
                imovel_numero: imovel_numero,
                imovel_logradouro: imovel_logradouro,
                descricao: descricao,
                files_name: files_name,
                comodos: comodos,
                camas: camas,
                banheiros: banheiros,
                quartos: quartos,
                valorProprietario: valorProprietario,
                situacao_aluguel: situacao_aluguel
            })
        });

        const resultado = await resposta.json();

        if (!resposta.ok) {
            alert('Erro: ' + resultado.erro);
            return;
        }

        alert('Imóvel atualizado com sucesso!');
        window.location.href = "../meus_imoveis/meus_imoveis.html";
    } catch (error) {
        alert('Erro inesperado: ' + error.message);
    }
}

let botao = document.getElementById('botaoProximo');
botao.addEventListener('click', pegar_dados);




//colocar la nos inputs
addEventListener('DOMContentLoaded', async () => {
    let id_imovel = sessionStorage.getItem('idimovel');
    if (!id_imovel) {
        alert('ID do imóvel não encontrado.');
        return;
    }

    try {
        const resposta = await fetch(`http://localhost:3000/cadastrar_imovel_router/${id_imovel}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        if (!resposta.ok) {
            throw new Error('Erro ao buscar dados do imóvel');
        }

        const imovel = await resposta.json();
        // Preencher os campos com os dados do imóvel
        document.getElementById('imovel_cep').value = imovel.imovel_cep;
        document.getElementById('imovel_bairro').value = imovel.imovel_bairro;
        document.getElementById('imovel_numero').value = imovel.imovel_numero;
        document.getElementById('imovel_logradouro').value = imovel.imovel_logradouro;
        document.getElementById('floatingTextarea2').value = imovel.descricao;
        document.getElementById('selectComodos').value = imovel.comodos;
        document.getElementById('selectCamas').value = imovel.camas;
        document.getElementById('selectBanheiros').value = imovel.banheiros;
        document.getElementById('selectQuartos').value = imovel.quartos;
        document.querySelector('#idValorProprietario input').value = imovel.valorProprietario;
    } catch (error) {
        alert('Erro inesperado: ' + error.message);
    }
});