const API_URL_INFO_IMOVEIS = 'http://localhost:3000/info_imovel_router';

async function carregarInfoImovelPorId() {
  try {
    const idImovel = sessionStorage.getItem('idimovel');
    if(!idImovel || idImovel.length > 1){
      throw new Error(`id do imovel não foi recebido corretamente`);
    }
    const response = await fetch(`${API_URL_INFO_IMOVEIS}`);

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }

    const imovel = await response.json();

    const imovelClicado = imovel.filter(imov => imov.id === idImovel);

    const container = document.getElementById("propriedadesExistentes");
    if (!container) {
      throw new Error('Elemento "propriedadesExistentes" não encontrado no DOM');
    }
    
    container.innerHTML = ""; // Limpa o conteúdo anterior

    // Verifica imagens 
    const imagens = imovel.files_name ? imovel.files_name.split(';').filter(Boolean) : [];
    const primeiraImagem = imagens.length > 0 ? imagens[0] : '';

    

  } catch (error) {
    console.error('Erro ao carregar imóvel:', error);
    const container = document.getElementById("propriedadesExistentes");
    if (container) {
      container.innerHTML = `
        <div class="alert alert-danger">
          Erro ao carregar imóvel: ${error.message}
        </div>
      `;
    }
  }
}





function pegar_dados()
{
     let checkIn = document.getElementById("data").value;
     let checkOut = document.getElementById("data1").value;
     let numeroHospedes = document.getElementById("selecionarNum").value;

     if (checkIn === '' || checkOut === '' || numeroHospedes === '' )
     {
          alert('Preencha todos os campos corretamente!');
    return;
     }
     else
     {
          enviarDados(checkIn, checkOut, numeroHospedes);
     }
}



async function enviarDados(checkIn, checkOut, numeroHospedes) {
  try {
    const resposta = await fetch('http://localhost:3000/info_imovel_router', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        checkIn: checkIn,
        checkOut: checkOut,
        numeroHospedes: numeroHospedes
      })
    });

    const resultado = await resposta.json();

    if (resposta.ok) {
      alert('Success');
      window.location.href = '../reservar_imovel/reservar_imovel.html';
    } else {
      alert('Erro: ' + resultado.erro);
    }
  } catch (error) {
    alert('Erro inesperado: ' + error.message);
  }
}

let botao = document.getElementById('botaoReservar');
botao.addEventListener('click', pegar_dados);


/*
function carregarDados() {
  fetch('http://localhost:3000/info_imovel_router')
    .then(response => response.json())
    .then(data => {
      document.getElementById('titulo').innerText = data.titulo;
      document.getElementById('descricao').innerText = data.descricao;
      document.getElementById('preco').innerText = `R$ ${data.preco}`;
      document.getElementById('imagem').src = data.imagem;
    })
    .catch(error => console.error('Erro ao carregar os dados:', error));
}
*/
