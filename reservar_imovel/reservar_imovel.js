/*let botao = document.getElementById('ENTRAR_SITE_VICTOR');
botao.addEventListener('click', () => {window.location.href="../info_imovel/info_imovel.html"});*/
const API_URL_IMOVEIS = 'http://localhost:3000/cadastrar_imovel_router';

async function pegar_dados()
{
     try {
          const resposta = await fetch('http://localhost:3000/reservar_imovel_router', {
               method: 'GET',
               headers: { 'Content-Type': 'application/json' }
          });
          const dados = await resposta.json();
          console.log(dados);
     } catch (error) {
          console.error('Erro ao pegar dados:', error);
     }
}


async function carregarProdutosNovos() {
  try {
    const response = await fetch(API_URL_IMOVEIS);

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }

    const imoveis = await response.json();

    if (!Array.isArray(imoveis)) {
      throw new Error('Dados recebidos não são um array de imoveis');
    }
    const container = document.getElementById("div-lado-esquerdo");
    if (!container) {
      throw new Error('Elemento "div-lado-esquerdo" não encontrado no DOM');
    }
    
    container.innerHTML = ""; // Limpa o conteúdo anterior

    imoveis.forEach(imovel => {
      // Verifica imagens 
      const imagens = imovel.files_name ? imovel.files_name.split(';').filter(Boolean) : [];
      const primeiraImagem = imagens.length > 0 ? imagens[0] : console.log('nao achou');
     
      const colDiv = document.createElement('div');
      colDiv.className = 'propriedadeIcone';
      colDiv.id = imovel.id;
      colDiv.onclick = () => abrirInfoImovel(colDiv.id);
      alert(imovel.comodos)
      colDiv.innerHTML = `
        <div class="fotoPropriedade" >
          <img src="../${primeiraImagem}" alt="Imagem do imóvel" class="propriedadeImg">
        </div>
        <div class="infoImoveis">
          <div class="endereco">${imovel.imovel_logradouro || 'Endereço não disponível'}, ${imovel.imovel_bairro || ''}</div>
          <div class="preco">R$ ${imovel.valorProprietario ? Number(imovel.valorProprietario) : '0,00'}</div>
          <div class="numCom">${imovel.comodos || 0} cômodos</div>
        </div>
      `;
      container.appendChild(colDiv);
    });

  } catch (error) {
    console.error('Erro ao carregar produtos:', error);
    const container = document.getElementById("div-lado-esquerdo");
    if (container) {
      container.innerHTML = `
        <div class="alert alert-danger">
          Erro ao carregar imóveis: ${error.message}
        </div>
      `;
    }
  }
}

function abrirInfoImovel(idImovel){
   sessionStorage.clear();
    sessionStorage.setItem("idimovel", idImovel);
     window.location.href = "../info_imovel/info_imovel.html";
}

// Chama a função ao carregar a página
window.onload = carregarProdutosNovos;
