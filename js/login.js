
const switchers = [...document.querySelectorAll('.switcher')]

switchers.forEach(item => {
	item.addEventListener('click', function() {
		switchers.forEach(item => item.parentElement.classList.remove('is-active'))
		this.parentElement.classList.add('is-active')
	})
})
function validarFormulario() {
    var nome = document.getElementById('nome').value;
    var idade = document.getElementById('idade').value;
    var cpf = document.getElementById('cpf').value;
    var email = document.getElementById('signup-email').value;
    var senha = document.getElementById('signup-password').value;
    var senhaConfirmar = document.getElementById('signup-password-confirm').value;


    if (!validarEmail(email)) {
        alert('Email inválido');
        return false;
    }

    if (!senhasIguais(senha, senhaConfirmar)) {
        alert('As senhas não são iguais');
        return false;
    }

    if (!todasInformacoesPreenchidas(nome, idade, cpf, email, senha, senhaConfirmar)) {
        alert('Por favor, preencha todas as informações');
        return false;
    }

    if (!verificarForcaSenha(senha)) {
        alert('Senha fraca. Use uma senha com pelo menos 8 caracteres.');
        return false;
    }

    return true;
}