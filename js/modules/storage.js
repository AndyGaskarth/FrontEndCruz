export function initCadastroForm() {
    const form = document.getElementById('form-cadastro');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const nome = document.getElementById('nome').value;
            const cpf = document.getElementById('cpf').value;

            // Objeto com os dados
            const dadosVoluntario = { nome, cpf, data: new Date().toLocaleDateString() };

            // Salva no localStorage convertendo para JSON
            localStorage.setItem('voluntario', JSON.stringify(dadosVoluntario));

            // Feedback visual de sucesso para o utilizador
            alert('Cadastro realizado e salvo com sucesso!');
        });
    }
}