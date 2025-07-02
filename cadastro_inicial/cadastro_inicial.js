let botCadastro = document.getElementById('botCadastro');
botCadastro.addEventListener('click', cadastrarUsuario);

function TestaCPF(strCPF) {
    var Soma;
    var Resto;
    Soma = 0;
  if (strCPF == "00000000000") return false;

  for (i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
  Resto = (Soma * 10) % 11;

    if ((Resto == 10)  (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10)) ) return false;

  Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10)  (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11) ) ) return false;
    return true;
}


function cadastrarUsuario() {
    let email = document.getElementById('floatingEmail').value.trim().toLowerCase();
    let cpf = document.getElementById('floatingCPF').value;
    let senha = document.getElementById('floatingPassword').value;
    let telefone = document.getElementById('floatingTelefone').value;
    let dataNascimento = document.getElementById('floatingData').value;
    let confirmarSenha = document.getElementById('floatingConfirmarSenha').value;

    // Validação de formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Por favor, insira um email válido.");
        return;
    }

    if (senha !== confirmarSenha) {
        alert("As senhas não coincidem.");
        return;
    }
    if (
      !email || 
      !cpf || 
      !senha || 
      !telefone || 
      !dataNascimento
    ) {
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
