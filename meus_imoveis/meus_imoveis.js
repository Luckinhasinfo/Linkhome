const API_URL_IMOVEIS = 'http://localhost:3000/cadastrar_imovel_router';

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

    // Seleciona o container onde os imóveis serão exibidos
    const container = document.getElementById("propriedadesExistentes");
    container.innerHTML = ""; // Limpa o conteúdo anterior

    imoveis.forEach(imovel => {
      const colDiv = document.createElement('div');
      colDiv.className = 'propriedadeIcone';

      colDiv.innerHTML = `
        <div class="divfotoPropriedade">
          <img class="propriedadeImg"
               src="${imovel.files_name}"
               alt="">
        </div>
        <div class="infoPropriedade">
          <h5 class="localizacão">${imovel.imovel_bairro ?? ''}, ${imovel.imovel_logradouro ?? ''}</h5>
          <h5 class="preco">R$: ${imovel.valorProprietario ?? '-'} /dia</h5>
        </div>
        <button type="button" class="btn btn-danger position-absolute bottom-0 end-0">&#10060;</button>
      `;

      container.appendChild(colDiv);
    });

  } catch (error) {
    console.error('Erro ao carregar produtos:', error);
    const container = document.getElementById("propriedadesExistentes");
    if (container) {
      container.innerHTML = `
        <div class="alert alert-danger">
          Erro ao carregar produtos: ${error.message}
        </div>
      `;
    } else {
      console.error('Elemento propriedadesExistentes não encontrado no DOM.');
    }
  }
}

// Chama a função ao carregar a página
window.onload = carregarProdutosNovos;