const API_URL_INFO_IMOVEIS = 'http://localhost:3000/cadastrar_imovel_router';
let situacaoAluguel = 0; // Variável para armazenar a situação do aluguel
let estadoAluguel = 0;
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
    const imagens = imovelClicado.files_name ? imovelClicado.files_name.split(';').filter(Boolean) : [];
    const tamanhoImagens = imagens.length;
    const divInfo = document.getElementById('infoImovel');
    const divTabela = document.getElementById('divTabela');
    const textEndereco = document.getElementById('textEndereco');
    const descricao = document.getElementById('descricao');
    const valorDiaria = document.getElementById('valorDiaria');
    const divCarrocel = document.getElementById('carousel-innerh');
    divCarrocel.innerHTML = '';
    divTabela.innerHTML = '';
    textEndereco.innerHTML = '';
    descricao.innerHTML = '';
    valorDiaria.innerHTML = '';
     situacaoAluguel = imovelClicado.situacao_aluguel;
    if (!divInfo) {
      throw new Error('Elemento de informação não encontrado no DOM');
    }
    if (!imovelClicado) {
      throw new Error('Imóvel não encontrado!');
    }

    // CORREÇÃO DO CARROSSEL
    if (tamanhoImagens > 0) {
      // Cria a div carousel-inner
      const carouselInner = document.createElement('div');
      carouselInner.className = 'carousel-inner';

      imagens.forEach((img, i) => {
        const item = document.createElement('div');
        item.className = 'carousel-item' + (i === 0 ? ' active' : '');
        item.innerHTML = `<img src="../${img}" class="d-block w-100" alt="Imagem do Imovel">`;
        carouselInner.appendChild(item);
      });

      divCarrocel.appendChild(carouselInner);

      // Adiciona botões de navegação se houver mais de uma imagem
      if (tamanhoImagens > 1) {
        divCarrocel.innerHTML += `
          <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        `;
      }
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
     if (situacaoAluguel === 1) {
    alert('Imóvel já está alugado!');
     return
}
  let checkIn = document.getElementById("data").value;
  let checkOut = document.getElementById("data1").value;
  let numeroHospedes = document.getElementById("selecionarNum").value;
  const idImovel = sessionStorage.getItem('idimovel');
  const idImovelNum = Number(idImovel);
  const idUsuario = sessionStorage.getItem('cpfUsuario');


  if (numeroHospedes <= 0 ||  checkIn === '' || checkOut === '' || numeroHospedes === '' || idImovelNum === null || idImovelNum === ''|| idUsuario === null || idUsuario === '') {
    alert('Preencha todos os campos corretamente!');
    return;
}
  else {
    estadoAluguel = 1;
    enviarDados(idUsuario,idImovelNum,checkIn, checkOut, numeroHospedes, estadoAluguel);
  }
}


async function enviarDados(idUsuario, idImovel, checkIn, checkOut, numeroHospedes, estadoAluguel) {
  try {
    const resposta = await fetch('http://localhost:3000/info_imovel_router', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id_usuario: idUsuario,
        id_imovel: idImovel,
        data_check_in: checkIn,
        data_check_out: checkOut,
        num_hospedes: numeroHospedes,
        estado_aluguel: estadoAluguel
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
let checkIn = document.getElementById("data");
let checkOut = document.getElementById("data1");

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
