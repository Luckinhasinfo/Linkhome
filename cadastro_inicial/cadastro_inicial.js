let botCadastro = document.getElementById('botCadastro');
botCadastro.addEventListener('click', cadastrarUsuario);

function TestaCPF(strCPF) {
    var Soma;
    var Resto;
    Soma = 0;
  if (strCPF == "00000000000") return false;

  for (i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
  Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10)) ) return false;

  Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11) ) ) return false;
    return true;
}



function cadastrarUsuario() {
    // Sanitização do email
    let email = document.getElementById('floatingEmail').value.trim().toLowerCase();
    // CPF não sanitizado conforme solicitado
    let cpf = document.getElementById('floatingCPF').value;

    // Sanitização das senhas
    let senha = document.getElementById('floatingPassword').value.trim();
    let confirmarSenha = document.getElementById('floatingConfirmarSenha').value.trim();

    // Sanitização do telefone (remove tudo que não for número)
    let telefone = document.getElementById('floatingTelefone').value.replace(/\D/g, '');

    // Sanitização da data de nascimento
    let dataNascimento = document.getElementById('floatingData').value.trim();

    // Validação de CPF
    if (!TestaCPF(cpf)) { 
        alert("Por favor, insira um CPF válido.");
        return;
    }

    // Validação de formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        alert("Por favor, insira um email válido.");
        return;
    }

    // Validação das senhas
    if (!senha || !confirmarSenha) {
        alert("Por favor, preencha a senha e a confirmação.");
        return;
    }
    if (senha !== confirmarSenha) {
        alert("As senhas não coincidem.");
        return;
    }

    // Validação do telefone
    if (!telefone) {
        alert("Por favor, preencha o telefone.");
        return;
    }

    // Validação da data de nascimento
    if (!dataNascimento) {
        alert("Por favor, preencha a data de nascimento.");
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
