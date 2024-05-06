document.getElementById("cadastroForm").addEventListener("submit", function(event) {
    var nome = document.getElementById("nome").value;
    var cpf = document.getElementById("cpf").value;
    var email = document.getElementById("email").value;
    var senha = document.getElementById("senha").value;
    var confirmacaoSenha = document.getElementById("Csenha").value;

    // Verifica se todos os campos estão preenchidos
    if (!email || !senha || !nome || !cpf || !confirmacaoSenha) {
        alert("Por favor, preencha todos os campos.");
        event.preventDefault();
        return;
    }

    // Validação do CPF
    if (!cpfValido(cpf)) {
        alert("Por favor, insira um CPF válido.");
        event.preventDefault();
        return;
    }

    // Validação do e-mail
    if (!emailValido(email)) {
        alert("Por favor, insira um e-mail válido.");
        event.preventDefault();
        return;
    }

    // Verifica se as senhas coincidem
    if (senha !== confirmacaoSenha) {
        alert("As senhas não coincidem!");
        event.preventDefault();
        return;
    }

    // Validação da senha
    if (!senhaValida(senha)) {
        alert("A senha deve conter pelo menos 8 caracteres, incluindo pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial.");
        event.preventDefault();
        return;
    }
});

function cpfValido(cpf) {
    // Expressão regular para validar CPF
    var regex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    return regex.test(cpf);
}

function emailValido(email) {
    // Expressão regular para validar e-mail
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
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
