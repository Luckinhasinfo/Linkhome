const API_URL_INFO_IMOVEIS = 'http://localhost:3000/cadastrar_imovel_router';

async function carregarInfoImovelPorId() {
  try {
    const idImovel = sessionStorage.getItem('idimovel');
    const idImovelNum = Number(idImovel);
    if (!idImovelNum) {
      throw new Error(`id do imovel não foi recebido corretamente`);
    }
    const response = await fetch(`${API_URL_INFO_IMOVEIS}`);

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }

    const imovel = await response.json();

    const imovelClicado = imovel.find(imov => Number(imov.id) === idImovelNum);

    const divInfo = document.getElementById('infoImovel');
    const divTabela = document.getElementById('divTabela');
    const textEndereco = document.getElementById('textEndereco');
    const descricao = document.getElementById('descricao');
    const valorDiaria = document.getElementById('valorDiaria');
    divTabela.innerHTML = '';
    textEndereco.innerHTML = '';
    descricao.innerHTML = '';
    valorDiaria.innerHTML = '';
    
    if (!divInfo) {
      throw new Error('Elemento de informação não encontrado no DOM');
    }
    if (!imovelClicado) {
      throw new Error('Imóvel não encontrado!');
    }
   valorDiaria.innerHTML = `
    R$ ${imovelClicado.valorProprietario}
   `;
    textEndereco.innerHTML = `
    ${imovelClicado.imovel_logradouro}, ${imovelClicado.imovel_bairro}, ${imovelClicado.imovel_numero}
    `;
    divTabela.innerHTML = `
                <table id="tabela">
                           <tr>
                                 <td>Quartos
                                        <td>
                                        <td id="num_quarto">${imovelClicado.quartos}</td>
                                   </tr>
                                   <tr>
                                        <td>Banheiros
                                        <td>
                                        <td id="num_banheiro">${imovelClicado.banheiros}</td>
                                   </tr>
                                   <tr>
                                        <td>Camas
                                        <td>
                                        <td id="num_cama">${imovelClicado.camas}</td>
                                   </tr>
                                   <tr>
                                        <td>Cômodos
                                        <td>
                                        <td id="num_comodo">${imovelClicado.comodos}</td>
                                   </tr>
                              </table>
    `;
    descricao.innerHTML = `
    ${imovelClicado.descricao}
    `;	
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





function pegar_dados() {
  let checkIn = document.getElementById("data").value;
  let checkOut = document.getElementById("data1").value;
  let numeroHospedes = document.getElementById("selecionarNum").value;

  if (checkIn === '' || checkOut === '' || numeroHospedes === '') {
    alert('Preencha todos os campos corretamente!');
    return;
  }
  else {
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
window.onload = carregarInfoImovelPorId;
