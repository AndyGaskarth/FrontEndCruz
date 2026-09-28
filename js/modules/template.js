const templates = {
    home: `
        <section id="sobre">
            <h2>QUEM SOMOS</h2>
            <p>Nossa organização atua diariamente para transformar a realidade e apoiar a comunidade.</p>
        </section>
    `,
    projetos: `
        <section id="projetos">
            <h2>Nossos Projetos</h2>
            <p>Conheça as frentes de atuação social e apoio comunitário desenvolvidas pela ONG.</p>
        </section>
    `,
    cadastro: `
        <section id="cadastro">
            <h2>Cadastre-se como Voluntário</h2>
            <form id="form-cadastro">
                <label for="nome">Nome Completo:</label>
                <input type="text" id="nome" required placeholder="Seu nome...">
                <button type="submit">Enviar Cadastro</button>
            </form>
        </section>
    `
};