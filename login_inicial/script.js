function loginAccess() {
    const floatingEmail = document.getElementById('floatingEmail').value;
    const floatingSenha = document.getElementById('floatingSenha').value;
    if (floatingEmail === '' || floatingSenha === '') {
        alert('Preencha todos os campos corretamente!');
        return;
    }else{
        enviarDados(floatingEmail, floatingSenha);
    }
}
async function enviarDados(floatingEmail, floatingSenha) {
    try {
        const resposta = await fetch('http://localhost:3000/login_inicial_router/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: floatingEmail,
                senha: floatingSenha
            })
        });

        const resultado = await resposta.json();

        if (resposta.ok) {
            alert('Login realizado com sucesso!');
            window.location.href = "../reservar_imovel/reservar_imovel.html";
        } else {
            alert('Erro: ' + resultado.erro);
        }
    } catch (error) {
        alert('Erro inesperado: ' + error.message);
    }
}
let botao = document.getElementById('botLogar');
botao.addEventListener('click', loginAccess);
