document.addEventListener('DOMContentLoaded', function() {
    const botaoMenu = document.getElementById('btn-menu');
    const menuOpcoes = document.getElementById('menu-opcoes');

    botaoMenu.addEventListener('click', function() {
        menuOpcoes.classList.toggle('ativo');
    });
});