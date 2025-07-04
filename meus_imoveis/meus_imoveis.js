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
      const primeiraImagem = imagens.length > 0 ? imagens[0] : console.log('nao achou');
     
      if (imovel.cpf_proprietario == sessionStorage.getItem('cpfUsuario')) {
      const colDiv = document.createElement('div');
      colDiv.className = 'propriedadeIcon';
      colDiv.id = imovel.id;
      let alugado_cor = 'infoImoveis';
     if (imovel.situacao_aluguel == 1)
          {
               colDiv.style.backgroundColor = 'aquamarine';
                colDiv.innerHTML = `
         <div class="fotoPropriedade" >
          <img src="../${primeiraImagem}" alt="Imagem do imóvel" class="propriedadeImg"'>
            </div>
        <div class="infoImoveis">
          <div class="endereco">${imovel.imovel_logradouro || 'Endereço não disponível'}, ${imovel.imovel_bairro || ''}</div>
          <div class="preco">R$ ${imovel.valorProprietario ? Number(imovel.valorProprietario) : '0,00'}</div>
          <div class="numCom">${imovel.comodos || 0} cômodos</div>
          
        </div>      
      `;
          }
      else
      {
          colDiv.innerHTML = `
        <div class="fotoPropriedade" >
          <img src="../${primeiraImagem}" alt="Imagem do imóvel" class="propriedadeImg" onclick='abrirInfoImovel(${colDiv.id})'>
        </div>
         <div id="expandir">
                    <div id="botaoExxx"><button id="botExpandir"><span class="material-symbols-outlined" onclick='aparecerOpcoes(${colDiv.id})'>
                              more_horiz
                         </span></button></div>
               <div class="expandirOpcoes">
                    <div class="botExpandir ${colDiv.id}" id="botExcluir"><button id="excluir" onclick='deletarImovel(${colDiv.id})'>Excluir</button></div>
                    <div class="botExpandir ${colDiv.id}" id="botEditar"><button id="editar" onclick='editar_pag(${colDiv.id})'>Editar</button></div>
                </div>
                </div>
        <div class="infoImoveis">
          <div class="endereco">${imovel.imovel_logradouro || 'Endereço não disponível'}, ${imovel.imovel_bairro || ''}</div>
          <div class="preco">R$ ${imovel.valorProprietario ? Number(imovel.valorProprietario) : '0,00'}</div>
          <div class="numCom">${imovel.comodos || 0} cômodos</div>
          
        </div>
      `;}
      container.appendChild(colDiv);
      }
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


async function deletarImovel(id) {
  if (!confirm('Tem certeza que deseja excluir este imóvel?')) return;
  try {
    const resposta = await fetch(`http://localhost:3000/cadastrar_imovel_router/${id}`, {
      method: 'DELETE'
    });
    const resultado = await resposta.json();
    if (resposta.ok) {
      alert('Imóvel excluído com sucesso!');
      carregarProdutosNovos(); // Atualiza a lista
    } else {
      alert('Erro ao excluir: ' + (resultado.erro || resultado.mensagem));
    }
  } catch (error) {
    alert('Erro inesperado: ' + error.message);
  }
}

window.deletarImovel = deletarImovel; // Torna a função global para uso no onclick

function editar_pag (idImovel)
{
     sessionStorage.setItem("idimovel", idImovel);
     window.location.href = "../editar_imovel/editar.html";
}
function abrirInfoImovel(idImovel){
    sessionStorage.setItem("idimovel", idImovel);
     window.location.href = "../info_imovel/info_imovel.html";
}
let num = 0;

function aparecerOpcoes(id) { 
  let expandirOpcoes = document.getElementsByClassName(id);

  if (num === 0) {
    Array.from(expandirOpcoes).forEach(opcao => {
      opcao.style.opacity = '1';
    });
    num = 1;
  } else {
    Array.from(expandirOpcoes).forEach(opcao => {
      opcao.style.opacity = '0';
    });
    num = 0;
  }
}





// Chama a função ao carregar a página
window.onload = carregarProdutosNovos;
