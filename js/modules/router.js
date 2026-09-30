window.OngApp = window.OngApp || {};

window.OngApp.initRouter = function initRouter() {
    const container = document.getElementById('app-container');
    const menu = document.getElementById('menu-opcoes');
    const templates = window.OngApp.templates;

    if (!container || !templates) {
        console.error('Não foi possível iniciar a navegação: container ou templates ausentes.');
        return;
    }

    function renderRoute(route) {
        const activeRoute = Object.prototype.hasOwnProperty.call(templates, route) ? route : 'home';
        container.innerHTML = templates[activeRoute];

        if (activeRoute === 'cadastro') {
            window.OngApp.initCadastroForm();
        }

        if (menu) {
            menu.classList.remove('ativo');
        }

        document.querySelectorAll('#menu-opcoes a').forEach(link => {
            if (link.dataset.route === activeRoute) {
                link.setAttribute('aria-current', 'page');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    }

    function currentRoute() {
        const route = window.location.hash.slice(1);
        return Object.prototype.hasOwnProperty.call(templates, route) ? route : 'home';
    }

    document.querySelectorAll('#menu-opcoes a[data-route]').forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            const route = link.dataset.route;

            if (route && route !== currentRoute()) {
                window.history.pushState(null, '', `#${route}`);
            }

            renderRoute(route || 'home');
        });
    });

    window.addEventListener('hashchange', () => renderRoute(currentRoute()));

    renderRoute(currentRoute());
};
