function pegar_dados() {
     let imovel_cep = document.getElementById('imovel_cep').value;
     let imovel_bairro = document.getElementById('imovel_bairro').value;
     let imovel_numero = document.getElementById('imovel_numero').value;
     let imovel_logradouro = document.getElementById('imovel_logradouro').value;
     let files = document.getElementById('foto_imovel').files;
     let files_name = '';
     for (let i = 0; i < files.length; i++) {
          files_name += `${files[i].name};`//lembra de tipo sanitizar o nome do arquivo pra evitar de ter ; no nome do proprio arqu
     }
     console.log(files_name);
     if (
          imovel_cep === '' ||
          imovel_bairro === '' ||
          imovel_numero === '' ||
          imovel_logradouro === '' ||
          files_name === ''
     ) {
          alert('Preencha todos os campos obrigatórios!');
          return;
     }

     else {
          enviarDados(imovel_cep, imovel_bairro, imovel_numero, imovel_logradouro, files_name);
          enviarImagem(files);
     };
}
async function enviarDados(imovel_cep, imovel_bairro, imovel_numero, imovel_logradouro, files_name) {
     try {
          const resposta = await fetch('http://localhost:3000/cadastrar_imovel_router', {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify({
                    imovel_cep: imovel_cep,
                    imovel_bairro: imovel_bairro,
                    imovel_numero: imovel_numero,
                    imovel_logradouro: imovel_logradouro,
                    files_name: files_name,
               })
          });

          const resultado = await resposta.json();

          if (resposta.ok) {
               alert('texto enviado com sucesso');
          } else {
               alert('Erro: ' + resultado.erro);
          }
     }
     catch (error) {
          alert('Erro inesperado: ' + error.message);
     }
}

async function enviarImagem(files) {
     const formData = new FormData();// é tipo key/value tlg
     for (let i = 0; i < files.length; i++) {
          formData.append('fotos_imovel', files[i]);
     }

     try {
          const resposta = await fetch('http://localhost:3000/cadastrar_imovel_router/upload', {
               method: 'POST',
               body: formData
          });

          if (resposta.ok) {
               alert('Imagem enviada com sucesso');
               window.location.href = "../cadastrar_novo_imovel_part2/cadastrar_novo_imovel_part2.html";
          } else {
               alert('Erro ao enviar imagem');
          }
     } catch (error) {
          alert('Erro inesperado ao enviar imagem: ' + error.message);
     }
}

let botao = document.getElementById('botaoProximo');
botao.addEventListener('click', pegar_dados);
