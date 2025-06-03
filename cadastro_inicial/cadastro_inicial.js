let botCadastro = document.getElementById('botCadastro');
botCadastro.addEventListener('click', cadastrarUsuario);


function cadastrarUsuario() {
    let email = document.getElementById('floatingEmail').value;
    let cpf = document.getElementById('floatingCPF').value;
    let senha = document.getElementById('floatingPassword').value;
    let telefone = document.getElementById('floatingTelefone').value;
    let dataNascimento = document.getElementById('floatingData').value;
    let confirmarSenha = document.getElementById('floatingConfirmarSenha').value;

    if (senha !== confirmarSenha) {
        alert("As senhas não coincidem.");
        return;
    }



    if ( !email || !cpf || !senha || !telefone || !dataNascimento) {
        alert("Por favor, preencha todos os campos.");
        return;
    }
    enviarCadastro(email, cpf, senha, telefone, dataNascimento);
    
}



async function enviarCadastro(email, cpf, senha, telefone, dataNascimento) {
  try {
    const resposta = await fetch('http://localhost:3000/usuarios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
        cpf:cpf,
        senha:senha,
        telefone: telefone,
        data_nascimento: dataNascimento
      })
    });

    const resultado = await resposta.json();

    if (resposta.ok) {
      alert('Usuário cadastrado com sucesso!');
    } else {
      alert('Erro: ' + resultado.erro);
    }
  } catch (error) {
    alert('Erro inesperado: ' + error.message);
  }
  
}
