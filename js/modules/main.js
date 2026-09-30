document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.getElementById('btn-menu');
    const menu = document.getElementById('menu-opcoes');

    if (menuButton && menu) {
        menuButton.addEventListener('click', () => {
            const isOpen = menu.classList.toggle('ativo');
            menuButton.setAttribute('aria-expanded', String(isOpen));
        });
    }

    if (window.OngApp && typeof window.OngApp.initRouter === 'function') {
        window.OngApp.initRouter();
    } else {
        console.error('A navegação não foi carregada. Verifique os arquivos JavaScript incluídos no index.html.');
    }
});
