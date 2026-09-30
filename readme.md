# SPA Solidária - Projeto ONG

Aplicação Web desenvolvida no formato de **Single Page Application (SPA)** utilizando **Vanilla JavaScript (JS puro)**, estruturada para uma organização não governamental (ONG) com foco em modularidade, acessibilidade e persistência de dados local[cite: 2, 3, 4, 5, 20].

---

## 📋 Índice
1. [Visão Geral do Projeto](#visão-geral-do-projeto)
2. [Arquitetura e Tecnologias](#arquitetura-e-tecnologias)
3. [Estrutura de Diretórios](#estrutura-de-diretórios)
4. [Pré-requisitos e Instalação](#pré-requisitos-e-instalação)
5. [Como Executar](#como-executar)
6. [Controle de Versão e Commits](#controle-de-versão-e-commits)

---

## 🌟 Visão Geral do Projeto
Este projeto consiste na refatoração e modernização de um site institucional para uma ONG, transformando-o numa aplicação de página única dinâmica. O sistema permite a navegação fluida entre seções (Home, Projetos e Cadastro de Voluntários) sem recarregar a página, validando dados sensíveis (como CPF e e-mail) em tempo real e guardando os registos de forma persistente no navegador[cite: 2, 4, 5, 16, 20].

---

## 🛠️ Arquitetura e Tecnologias
O projeto foi construído sem o uso de frameworks externos de terceiros (como React ou Vue), valorizando os fundamentos nativos da web:
* **HTML5 & CSS3**: Estrutura semântica alinhada com as diretrizes de acessibilidade **WCAG 2.1 (Nível AA)** e design responsivo[cite: 5, 24].
* **Vanilla JavaScript (ES6+)**:
  * `main.js`: Ponto de entrada (*entry point*) e gestão do menu hambúrguer interativo[cite: 2, 3].
  * `router.js`: Sistema de roteamento dinâmico via *hash* (`window.location.hash`) e injeção de vistas no DOM via `pushState`[cite: 4].
  * `template.js`: Repositório centralizado de fragmentos HTML em *Template Literals*[cite: 5].
  * `formValidation.js`: Regras de consistência, validação algorítmica de CPF (módulo 11), gestão de erros com acessibilidade (`aria-live`, `aria-invalid`) e integração com o `localStorage`[cite: 2].

---

## 📂 Estrutura de Diretórios
```text
anotherCurso/
│
├── css/
│   └── style.css            # Estilos globais e responsivos da aplicação
├── img/
│   └── equipe.jpg           # Recursos gráficos institucionais
├── js/
│   └── modules/
│       ├── formValidation.js # Validação de formulários e web storage
│       ├── main.js          # Ponto de entrada e controlo do menu
│       ├── router.js        # Gestão de rotas e injeção de templates SPA
│       └── template.js      # Fragmentos HTML dinâmicos
│
└── index.html               # Documento HTML mestre da aplicação