let botao = document.getElementById('ENTRAR_SITE_VICTOR');
botao.addEventListener('click', () => {window.location.href="../info_imovel/info_imovel.html"});


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
