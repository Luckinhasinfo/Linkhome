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

function carregarDados(){}
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
