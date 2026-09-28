document.addEventListener("DOMContentLoaded", function() {
    // 1. Lógica do Menu Hambúrguer Responsivo
    const botaoMenu = document.getElementById('btn-menu');
    const menuOpcoes = document.getElementById('menu-opcoes');

    if (botaoMenu && menuOpcoes) {
        botaoMenu.addEventListener('click', function() {
            menuOpcoes.classList.toggle('ativo');
        });
    }

    // 2. Templates com o conteúdo COMPLETO das suas páginas
    const templates = {
        home: `
            <section id="sobre">
                <h2>QUEM SOMOS</h2>
                <img src="img/equipe.jpg" alt="Foto da nossa equipe de voluntários na frente do projeto">
                <p>Nossa organização atua diariamente para transformar a realidade e apoiar a comunidade.</p>
            </section>
            
            <section id="contato">
                <h2>Fale com a gente</h2>
                <p>Quer ajudar nos nossos projetos ou tem alguma dúvida? Chama a gente nos contatos abaixo:</p>
                <table class="contato-container">
                    <tr>
                        <td><strong>Email:</strong></td>
                        <td><a href="mailto:ongajuda@ong.com.br">ongajuda@ong.com.br</a></td>
                    </tr>
                    <tr>
                        <td><strong>Telefone/Zap:</strong></td>
                        <td><a href="tel:+5511987654321">+55 11 98765-4321</a></td>
                    </tr>
                    <tr>
                        <td><strong>Endereço:</strong></td>
                        <td>Centro de Santana de Parnaíba - SP</td>
                    </tr>
                </table>
            </section>
        `,
        projetos: `
            <div class="frentes-atuais">
                <h1>Nossas Frentes de Atuação</h1>
            </div>
            
            <section id="projetos-atuais">
                <h2>Nossos Projetos Atuais</h2>
                <p>Nossa organização trabalha continuamente para promover melhorias em nossa região, oferecendo aulas de informática e distribuição de cestas básicas.</p>
            </section>

            <section id="voluntariado">
                <h2>Trabalho Voluntário</h2>
                <p>Toda contribuição é fundamental. Se você possui disponibilidade e deseja colaborar:</p>
                <ul>
                    <li>Mentores para auxiliar nas aulas de introdução à tecnologia.</li>
                    <li>Voluntários para apoiar na logística e triagem de doações.</li>
                    <li>Auxílio na manutenção e organização do nosso espaço físico.</li>
                </ul>
                <p>Para se inscrever, envie um e-mail para o nosso canal de atendimento principal.</p>
            </section>

            <section id="doacoes">
                <h2>Campanhas de Doação</h2>
                <p>Compreendemos que a disponibilidade de tempo pode ser limitada.</p>
                <p>Para realizar uma doação de forma rápida, utilize nossa chave PIX:</p>
                <p><strong>Chave PIX (E-mail):</strong> ongajuda@ong.com.br</p>
                <p>Para transferências bancárias, utilize os dados institucionais abaixo:</p>
                <p>
                    <strong>Banco:</strong> Banco do Brasil<br>
                    <strong>Agência:</strong> 1234-5<br>
                    <strong>Conta Corrente:</strong> 98765-4<br>
                    <strong>Favorecido:</strong> ONG Ajuda Comunitária
                </p>
            </section>
        `,
        cadastro: `
            <section id="cadastro">
                <h2>Cadastre-se como Voluntário</h2>
                <form class="form-cadastro" action="/cadastro" method="POST">
                    <fieldset class="grupo-formulario dados-pessoais">
                        <legend>Dados Pessoais</legend>
                        
                        <div class="campo-formulario campo-nome">
                            <label for="nome">Nome Completo:</label>
                            <input type="text" id="nome" name="nome" placeholder="Seu nome..." required>
                        </div>

                        <div class="campo-formulario campo-cpf">
                            <label for="cpf">CPF:</label>
                            <input type="text" id="cpf" name="cpf" pattern="\\d{{3}}\\.\\d{{3}}\\.\\d{{3}}-\\d{{2}}" placeholder="000.000.000-00" required>
                        </div>

                        <div class="campo-formulario campo-genero">
                            <span class="rotulo-campo">Gênero:</span>
                            <div class="opcoes-genero">
                                <div class="opcao-genero">
                                    <input type="radio" id="homem" name="genero" value="homem">
                                    <label for="homem">Homem</label>
                                </div>
                                <div class="opcao-genero">
                                    <input type="radio" id="mulher" name="genero" value="mulher">
                                    <label for="mulher">Mulher</label>
                                </div>
                                <div class="opcao-genero">
                                    <input type="radio" id="outro" name="genero" value="prefiro_nao_informar">
                                    <label for="outro">Prefiro não informar</label>
                                </div>
                            </div>
                        </div>
                    </fieldset>

                    <fieldset class="grupo-formulario contato-endereco">
                        <legend>Contato e Endereço</legend>
                        
                        <div class="campo-formulario campo-email">
                            <label for="email">E-mail:</label>
                            <input type="email" id="email" name="email" placeholder="email@dominio.com " required>
                        </div>

                        <div class="campo-formulario campo-telefone">
                            <label for="telefone">Telefone:</label>
                            <input type="tel" id="telefone" name="telefone" placeholder="(00) 00000-0000">
                        </div>

                        <div class="campo-formulario campo-cep">
                            <label for="cep">CEP:</label>
                            <input type="text" id="cep" name="cep" placeholder="00000-000">
                        </div>
                    </fieldset>

                <button class="botao-cadastro" type="submit">Cadastrar</button>
                </form>
            </section>
        `
    };

    // 3. Sistema de Roteamento SPA
    const container = document.getElementById('app-container');
    const links = document.querySelectorAll('#menu-opcoes a');
    const acoesRotas = {
        'cadastro': () => inicializarFormulario(),
        'perfil': () => inicializarPerfil(),
        'configuracoes': () => inicializarConfig()
    };

    function carregarRota(rota) {
    // Carrega o HTML correspondente ou o 'home' como fallback[cite: 1]
    container.innerHTML = templates[rota] || templates['home'];

    // Se existir uma função mapeada para esta rota, ela é executada automaticamente
    if (acoesRotas[rota]) {
        acoesRotas[rota]();
    }

    // Remove a classe 'ativo' do menu, se ele existir[cite: 1]
    if (menuOpcoes) {
        menuOpcoes.classList.remove('ativo');
    }
}

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const rota = this.getAttribute('data-route');
            carregarRota(rota);
        });
    });

    carregarRota('home');

});

// 4. Validação e LocalStorage
function inicializarFormulario() {
    const form = document.getElementById('form-cadastro');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); // <-- ISSO É O QUE IMPEDE A PÁGINA DE CAIR
            
            const nome = document.getElementById('nome').value;
            const cpf = document.getElementById('cpf').value;

            const dadosVoluntario = {
                nome,
                cpf,
                dataRegistro: new Date().toLocaleDateString()
            };

            // Salva no localStorage
            localStorage.setItem('dados_voluntario', JSON.stringify(dadosVoluntario));

            alert('Cadastro efetuado com sucesso e salvo no localStorage!');
            form.reset();
        });
    }
}