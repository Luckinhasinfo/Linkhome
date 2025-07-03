async function pegar_dados() {
    // Dados principais
    let imovel_cep = document.getElementById('imovel_cep').value;
    let imovel_bairro = document.getElementById('imovel_bairro').value;
    let imovel_numero = document.getElementById('imovel_numero').value;
    let imovel_logradouro = document.getElementById('imovel_logradouro').value;
    let descricao = document.getElementById('floatingTextarea2').value;
    let files = document.getElementById('foto_imovel').files;
    let cpf_proprietario = sessionStorage.getItem('cpfUsuario');

    // Detalhes do imóvel
    const comodos = parseInt(document.getElementById('selectComodos').value);
    const camas = parseInt(document.getElementById('selectCamas').value);
    const banheiros = parseInt(document.getElementById('selectBanheiros').value);
    const quartos = parseInt(document.getElementById('selectQuartos').value);
    const valorProprietario = parseFloat(document.querySelector('#idValorProprietario input').value);
    const situacao_aluguel = 0;
    // Validação simples
   
    if(
       
        valorProprietario === '' ||
        valorProprietario <= 0 ||
        cpf_proprietario === '' ||
        imovel_cep === '' ||
        isNaN(imovel_cep) == true||
        imovel_bairro === '' ||
         isNaN(imovel_bairro) == false||
        imovel_numero === '' ||
         imovel_numero <= 0 ||
         isNaN(imovel_numero) == true||
        imovel_logradouro === '' ||
         isNaN(imovel_logradouro) == false ||
        files.length === 0 ||
        isNaN(comodos) ||
         comodos < 0 ||
        isNaN(camas) ||
         camas <= 0 ||
        isNaN(banheiros) ||
         banheiros < 0 ||
        isNaN(quartos)  ||
         banheiros < 0 ||
        isNaN(valorProprietario) ||
         valorProprietario <= 0 ||
          imovel_bairro.includes("<") ||
        imovel_logradouro.includes("<") ||
        descricao.includes("<")
    ){
        alert('Preencha todos os campos obrigatórios corretamente!');
        return;
    }
      if (
        imovel_bairro.includes(',',';','/','<','-','_','>','?','!','(',')') ||
        imovel_logradouro.includes(',',';','/','<','-','_','>','?','!','(',')') ||
        imovel_numero.includes(',',';','/','<','-','_','>','?','!','(',')') ||
        imovel_cep.includes(',',';','/','<','-','_','>','?','!','(',')') ||
        descricao.includes(',',';','/','<','-','_','>','?','!','(',')')
    ) {
        alert('Os campos não podem conter caracteres especiais como: , ; / < - _ > ? ! ( )');
        return;
    }
    //Envie as imagens primeiro e pegue o caminho retornado bando de retardado
    let files_name = '';
    try {
        for (let i = 0; i < files.length; i++) {
            if (!files[i].type.startsWith('image/')) {
                alert('Não é uma imagem válida. Por favor, selecione apenas arquivos de imagem.');
                return;
            }
        }
        const formData = new FormData();//key/ igual obj key/coisinha po
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

    // 2. Envie os dados do imóvel com o caminho da(s) imagem(ns)
    await enviarDados(
        cpf_proprietario,
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
        situacao_aluguel    
     );
}

async function enviarDados(
    cpf_proprietario, imovel_cep, imovel_bairro, imovel_numero, imovel_logradouro, descricao,
    files_name, comodos, camas, banheiros, quartos, valorProprietario, situacao_aluguel
) {
    try {
        const resposta = await fetch('http://localhost:3000/cadastrar_imovel_router', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                cpf_proprietario: cpf_proprietario,
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
        alert('Imóvel cadastrado com sucesso!');
        window.location.href = "../meus_imoveis/meus_imoveis.html";
    } catch (error) {
        alert('Erro inesperado: ' + error.message);
    }
}

let botao = document.getElementById('botaoProximo');
botao.addEventListener('click', pegar_dados);