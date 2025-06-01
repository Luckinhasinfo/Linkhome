function cadastroDadosPropriedade() {
  const comodos = parseInt(document.getElementById('selectComodos').value);
  const camas = parseInt(document.getElementById('selectCamas').value);
  const banheiros = parseInt(document.getElementById('selectBanheiros').value);
  const quartos = parseInt(document.getElementById('selectQuartos').value);
  const valorProprietario = parseFloat(document.querySelector('#idValorProprietario input').value);

  if (
    isNaN(comodos) ||
    isNaN(camas) ||
    isNaN(banheiros) ||
    isNaN(quartos) ||
    isNaN(valorProprietario)
  ) {
    alert('Preencha todos os campos corretamente!');
    return;
  }

  enviarDados(comodos, camas, banheiros, quartos, valorProprietario);
}

async function enviarDados(comodos, camas, banheiros, quartos, valorProprietario) {
  try {
    const resposta = await fetch('http://localhost:3000/cadastrar_imovel_part2_router', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        comodos: comodos,
        camas: camas,
        banheiros: banheiros,
        quartos: quartos,
        valorProprietario: valorProprietario
      })
    });

    const resultado = await resposta.json();

    if (resposta.ok) {
      alert('Success');
      window.location.href = "../cadastrar_novo_imovel_part3/cadastrar_novo_imovel_part3.html";
    } else {
      alert('Erro: ' + resultado.erro);
    }
  } catch (error) {
    alert('Erro inesperado: ' + error.message);
  }
}


let botao = document.getElementById('botaoProximo');
botao.addEventListener('click', cadastroDadosPropriedade);
