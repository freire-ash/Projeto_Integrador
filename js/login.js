document.getElementById("loginForm").addEventListener("submit", function(event) {
    var email = document.getElementById("email").value;
    var senha = document.getElementById("senha").value;
    var confirmacaoSenha = document.getElementById("Csenha").value;

    // Verifica se todos os campos estão preenchidos
    if (!email || !senha || !confirmacaoSenha) {
        alert("Por favor, preencha todos os campos.");
        event.preventDefault();
        return;
    }

    if (senha !== confirmacaoSenha) {
        alert("As senhas não coincidem!");
        event.preventDefault();
        return;
    }

    if (!emailValido(email)) {
        alert("Por favor, insira um email válido.");
        event.preventDefault();
        return;
    }

    if (!senhaValida(senha)) {
        alert("A senha deve conter pelo menos 8 caracteres, incluindo pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial.");
        event.preventDefault();
    }
});

function emailValido(email) {
    // Expressão regular para validar email
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function senhaValida(senha) {
    //  8 caracteres
    if (senha.length < 8) return false;

    //  maiúscula
    if (!/[A-Z]/.test(senha)) return false;

    //  minúscula
    if (!/[a-z]/.test(senha)) return false;

    //  número
    if (!/[0-9]/.test(senha)) return false;

    //  caractere especial
    if (!/[^A-Za-z0-9]/.test(senha)) return false;

    return true;
}
