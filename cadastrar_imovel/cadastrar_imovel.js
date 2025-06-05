function pegar_dados() {

     // Dados principais
     let cpf_proprietario = document.getElementById('cpf_proprietario').value;
     let numero_proprietario = document.getElementById('numero_proprietario').value;
     let imovel_cep = document.getElementById('imovel_cep').value;
     let imovel_bairro = document.getElementById('imovel_bairro').value;
     let imovel_numero = document.getElementById('imovel_numero').value;
     let imovel_logradouro = document.getElementById('imovel_logradouro').value;
     let descricao = document.getElementById('floatingTextarea2').value;
     let files = document.getElementById('foto_imovel').files;
     let files_name = '';
     for (let i = 0; i < files.length; i++) {
          let nomeSanitizado = files[i].name.replace(/;/g, '');
          files_name += `${nomeSanitizado};`;
     }

     // Detalhes do imóvel
     const comodos = parseInt(document.getElementById('selectComodos').value);
     const camas = parseInt(document.getElementById('selectCamas').value);
     const banheiros = parseInt(document.getElementById('selectBanheiros').value);
     const quartos = parseInt(document.getElementById('selectQuartos').value);
     const valorProprietario = parseFloat(document.querySelector('#idValorProprietario input').value);
     const situacao_aluguel = 0;

     // Validação simples
     if (
          cpf_proprietario === '' ||
          numero_proprietario === '' ||
          imovel_cep === '' ||
          imovel_bairro === '' ||
          imovel_numero === '' ||//deixa em coluna mesmo malditos (fica mais facil de ver)
          imovel_logradouro === '' ||
          files_name === '' ||
          isNaN(comodos) ||
          isNaN(camas) ||
          isNaN(banheiros) ||
          isNaN(quartos) ||
          isNaN(valorProprietario) 
     ) {
          alert('Preencha todos os campos obrigatórios!');

     }
     else {
          enviarDados(cpf_proprietario,imovel_cep, imovel_bairro, imovel_numero, imovel_logradouro, descricao, files_name, comodos, camas, banheiros, cpf_proprietario, quartos, valorProprietario, situacao_aluguel, files, numero_proprietario);
     }
}

async function enviarDados(cpf_proprietario,imovel_cep, imovel_bairro, imovel_numero, imovel_logradouro, descricao, files_name, comodos, camas, banheiros, cpf_proprietario, quartos, valorProprietario, situacao_aluguel, files, numero_proprietario) {
     try {
          const resposta = await fetch('http://localhost:3000/cadastrar_imovel_router', {
               method: 'POST',
               credentials: 'include', // <-- Adicione esta linha!
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify({
                    cpf_proprietario: cpf_proprietario,
                    numero_proprietario: numero_proprietario,
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

          // Envia as imagens
          const formData = new FormData();
          for (let i = 0; i < files.length; i++) {
               formData.append('fotos_imovel', files[i]);
          }
          const respostaImg = await fetch('http://localhost:3000/cadastrar_imovel_router/upload', {
               method: 'POST',
               body: formData
          });

          if (!respostaImg.ok) {
               alert('Erro ao enviar imagem');
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