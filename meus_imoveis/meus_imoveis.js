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
    const container = document.getElementById("propriedadesExistentes");
    if (!container) {
      throw new Error('Elemento "propriedadesExistentes" não encontrado no DOM');
    }
    
    container.innerHTML = ""; // Limpa o conteúdo anterior

    imoveis.forEach(imovel => {
      // Verifica imagens 
      const imagens = imovel.files_name ? imovel.files_name.split(';').filter(Boolean) : [];
      const primeiraImagem = imagens.length > 0 ? imagens[0] : 'caminho/para/imagem/padrao.jpg';

      const colDiv = document.createElement('div');
      colDiv.className = 'propriedadeIcone';

      colDiv.innerHTML = `
        <div class="fotoPropriedade">
          <img src="${primeiraImagem}" alt="Imagem do imóvel">
        </div>
        <div class="infoImoveis">
          <div class="endereco">${imovel.imovel_logradouro || 'Endereço não disponível'}, ${imovel.imovel_bairro || ''}</div>
          <div class="preco">R$ ${imovel.valorProprietario ? Number(imovel.valorProprietario).toLocaleString('pt-BR') : '0,00'}</div>
          <div class="numCom">${imovel.comodos || 0} cômodos</div>
        </div>
      `;

      container.appendChild(colDiv);
    });

  } catch (error) {
    console.error('Erro ao carregar produtos:', error);
    const container = document.getElementById("propriedadesExistentes");
    if (container) {
      container.innerHTML = `
        <div class="alert alert-danger">
          Erro ao carregar imóveis: ${error.message}
        </div>
      `;
    }
  }
}

// Chama a função ao carregar a página
win