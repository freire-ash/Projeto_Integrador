document.getElementById("form-signup").addEventListener("submit", function(event) {
    var nome = document.getElementById('nome').value;
    var cpf = document.getElementById('cpf').value;
    var email = document.getElementById('signup-email').value;
    var senha = document.getElementById('signup-password').value;
    var senhaConfirmar = document.getElementById('signup-password-confirm').value;



    // Validação do e-mail
    if (!emailValido(email)) {
        alert("Por favor, insira um e-mail válido.");
        event.preventDefault();
        return;
    }

    // Validação do CPF
    if (!cpfValido(cpf)) {
        alert("Por favor, insira um CPF válido.");
        event.preventDefault();
        return;
    }

    // Validação da senha
    if (!senhaValida(senha)) {
        alert("A senha deve conter pelo menos 8 caracteres, incluindo pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial.");
        event.preventDefault();
        return;
    }

    // Verifica se as senhas são idênticas
    if (senha !== senhaConfirmar) {
        alert("As senhas não são idênticas. Por favor, verifique.");
        event.preventDefault();
        return;
    }

    // Se todas as validações forem bem-sucedidas, redirecione para a próxima página
    window.location.href = "perguntas2.html";
});

function emailValido(email) {
    // Expressão regular para validar o e-mail
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function cpfValido(cpf) {
    // Remove caracteres especiais do CPF
    cpf = cpf.replace(/[^\d]+/g, '');

    // Verifica se o CPF tem 11 dígitos
    if (cpf.length !== 11) return false;

    // Verifica se todos os dígitos são iguais (ex.: 111.111.111-11)
    if (/^(\d)\1{10}$/.test(cpf)) return false;

    // Validação dos dígitos verificadores
    var soma;
    var resto;

    // Calcula o primeiro dígito verificador
    soma = 0;
    for (var i = 1; i <= 9; i++) {
        soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if ((resto == 10) || (resto == 11)) resto = 0;
    if (resto != parseInt(cpf.substring(9, 10))) return false;

    // Calcula o segundo dígito verificador
    soma = 0;
    for (var j = 1; j <= 10; j++) {
        soma += parseInt(cpf.substring(j - 1, j)) * (12 - j);
    }
    resto = (soma * 10) % 11;
    if ((resto == 10) || (resto == 11)) resto = 0;
    if (resto != parseInt(cpf.substring(10, 11))) return false;

    return true;
}

function senhaValida(senha) {
    // Verifica se a senha tem pelo menos 8 caracteres
    if (senha.length < 8) return false;

    // Verifica se a senha contém pelo menos uma letra maiúscula
    if (!/[A-Z]/.test(senha)) return false;

    // Verifica se a senha contém pelo menos uma letra minúscula
    if (!/[a-z]/.test(senha)) return false;

    // Verifica se a senha contém pelo menos um número
    if (!/[0-9]/.test(senha)) return false;

    // Verifica se a senha contém pelo menos um caractere especial
    if (!/[^A-Za-z0-9]/.test(senha)) return false;

    return true;
}

function final(){
    alert('Login realizado com sucesso!')
}
