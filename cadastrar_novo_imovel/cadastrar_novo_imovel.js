function pegar_dados() {
     let imovel_cep = document.getElementById('imovel_cep').value;
     let imovel_bairro = document.getElementById('imovel_bairro').value;
     let imovel_numero = document.getElementById('imovel_numero').value;
     let imovel_logradouro = document.getElementById('imovel_logradouro').value;
     let file = document.getElementById('foto_imovel').files[0];
alert (file)
     if (
          imovel_cep === '' ||
          imovel_bairro === '' ||
          imovel_numero === '' ||
          imovel_logradouro === '' ||
          file === undefined
     ) {
          alert('Preencha todos os campos obrigatórios!');
          return
     }

     else {
          enviarDados(imovel_cep, imovel_bairro, imovel_numero, imovel_logradouro, valorProprietario);
     };
}
async function enviarDados(imovel_cep, imovel_bairro, imovel_numero, imovel_logradouro, file) {
     try {
          const resposta = await fetch('http://localhost:3000/cadastrar_imovel_router', {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify({
                    imovel_cep: imovel_cep,
                    imovel_bairro: imovel_bairro,
                    imovel_numero: imovel_numero,
                    imovel_logradouro: imovel_logradouro,
                    file: file,
               })
          });

          const resultado = await resposta.json();

          if (resposta.ok) {
               alert('enviado com sucesso');
               window.location.href = "../cadastrar_novo_imovel_part2/cadastrar_novo_imovel_part2.html";
          } else {
               alert('Erro: ' + resultado.erro);
          }
     }
     catch (error) {
          alert('Erro inesperado: ' + error.message);
     }
}


let botao = document.getElementById('botaoProximo');
botao.addEventListener('click', pegar_dados);
