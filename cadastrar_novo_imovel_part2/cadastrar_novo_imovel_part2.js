const form = document.getElementById('enviar_form');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const comodos = document.getElementById('selectComodos').value;
    const camas = document.getElementById('selectCamas').value;
    const banheiros = document.getElementById('selectBanheiros').value;
    const quartos = document.getElementById('selectQuartos').value;
    const valorProprietario = parseFloat(document.getElementById('idValorProprietario').value);

    const dados = {
      comodos,
      camas,
      banheiros,
      quartos,
      valorProprietario
    };

    const resposta = await fetch('/enviar-json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dados)
    });

    const mensagem = await resposta.text();
    alert(mensagem);
  });
</script>

let botao = document.getElementById('botaoProximo');
botao.addEventListener('click', enviarForm());
botao.addEventListener('click', () => { window.location.href = "../cadastrar_novo_imovel_part3/cadastrar_novo_imovel_part3.html" })
