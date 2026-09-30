window.OngApp = window.OngApp || {};

window.OngApp.initCadastroForm = function initCadastroForm() {
    const form = document.getElementById('form-cadastro');
    if (!form) return;

    const feedback = document.createElement('p');
    feedback.className = 'form-feedback';
    feedback.setAttribute('role', 'status');
    feedback.setAttribute('aria-live', 'polite');
    form.appendChild(feedback);

    const showError = (field, message) => {
        const wrapper = field.closest('.campo-formulario');
        if (!wrapper) return;
        const error = wrapper.querySelector('.error-message');
        if (!error) return;
        error.textContent = message;
        field.setAttribute('aria-invalid', 'true');
        field.setAttribute('aria-describedby', error.id);
    };

    const clearError = field => {
        const wrapper = field.closest('.campo-formulario');
        if (!wrapper) return;
        const error = wrapper.querySelector('.error-message');
        if (!error) return;
        error.textContent = '';
        field.removeAttribute('aria-invalid');
        field.removeAttribute('aria-describedby');
    };

    const isValidCpf = value => {
        const digits = value.replace(/\D/g, '');
        if (!/^\d{11}$/.test(digits) || /^(\d)\1{10}$/.test(digits)) return false;

        const calculateDigit = length => {
            let sum = 0;
            for (let index = 0; index < length; index += 1) {
                sum += Number(digits[index]) * (length + 1 - index);
            }
            const remainder = (sum * 10) % 11;
            return remainder === 10 ? 0 : remainder;
        };

        return calculateDigit(9) === Number(digits[9])
            && calculateDigit(10) === Number(digits[10]);
    };

    const fields = [...form.querySelectorAll('.campo-formulario input')];
    fields.forEach(field => {
        field.addEventListener('input', () => clearError(field));
        field.addEventListener('change', () => clearError(field));
    });

    form.addEventListener('submit', event => {
        event.preventDefault();
        feedback.className = 'form-feedback';
        feedback.textContent = '';

        const nome = form.elements.namedItem('nome');
        const cpf = form.elements.namedItem('cpf');
        const email = form.elements.namedItem('email');
        let valid = true;

        if (!nome.value.trim()) {
            showError(nome, 'Informe seu nome completo.');
            valid = false;
        } else {
            clearError(nome);
        }

        if (!isValidCpf(cpf.value)) {
            showError(cpf, 'Informe um CPF válido no formato 000.000.000-00.');
            valid = false;
        } else {
            clearError(cpf);
        }

        if (!email.value.trim() || !email.validity.valid) {
            showError(email, 'Informe um endereço de e-mail válido.');
            valid = false;
        } else {
            clearError(email);
        }

        if (!valid) {
            feedback.classList.add('feedback-erro');
            feedback.textContent = 'Revise os campos indicados antes de continuar.';
            form.querySelector('[aria-invalid="true"]').focus();
            return;
        }

        let cadastros = [];
        try {
            const savedData = localStorage.getItem('dados_voluntarios');
            if (savedData) {
                const parsedData = JSON.parse(savedData);
                if (!Array.isArray(parsedData)) {
                    throw new TypeError('O conteúdo salvo não é uma lista de cadastros.');
                }
                cadastros = parsedData;
            }
        } catch (error) {
            console.error('Não foi possível ler os cadastros do localStorage.', error);
            feedback.classList.add('feedback-erro');
            feedback.textContent = 'Não foi possível acessar os cadastros salvos. Seus dados não foram descartados.';
            return;
        }

        const generoSelecionado = form.querySelector('input[name="genero"]:checked');
        const novoCadastro = {
            nome: nome.value.trim(),
            cpf: cpf.value.trim(),
            genero: generoSelecionado ? generoSelecionado.value : '',
            email: email.value.trim(),
            telefone: form.elements.namedItem('telefone').value.trim(),
            cep: form.elements.namedItem('cep').value.trim(),
            dataRegistro: new Date().toISOString()
        };

        try {
            localStorage.setItem('dados_voluntarios', JSON.stringify([...cadastros, novoCadastro]));
        } catch (error) {
            console.error('Não foi possível salvar o cadastro no localStorage.', error);
            feedback.classList.add('feedback-erro');
            feedback.textContent = 'Não foi possível salvar seu cadastro neste navegador. Tente novamente.';
            return;
        }

        form.reset();
        fields.forEach(clearError);
        feedback.classList.add('feedback-sucesso');
        feedback.textContent = 'Cadastro realizado com sucesso e salvo neste navegador.';
    });
};
