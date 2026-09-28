import { homeTemplate, projetosTemplate, cadastroTemplate } from './templates.js';

const routes = {
    'home': homeTemplate,
    'projetos': projetosTemplate,
    'cadastro': cadastroTemplate
};

function navigate(route) {
    const container = document.getElementById('app-container');
    const templateFunction = routes[route] || routes['home'];
    
    // Injeta o HTML da rota escolhida
    container.innerHTML = templateFunction();
    
    // Se for a rota de cadastro, ativa as funções de validação e localStorage
    if (route === 'cadastro') {
        initCadastroForm();
    }
}

export function initRouter() {
    // Carrega a home por padrão
    navigate('home');

    // Ouve os cliques nos links de navegação
    document.querySelectorAll('#menu-opcoes a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const route = e.target.getAttribute('data-route');
            navigate(route);
        });
    });
}