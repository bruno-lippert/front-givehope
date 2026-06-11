# GiveHope 🎗️ — Portal de Doações

[![Next.js](https://img.shields.io/badge/Next.js-16.2.5-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.4-blue?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

---

### Idioma / Language
* [Português (PT-BR)](#-português-pt-br)
* [English (EN)](#-english-en)

---

## 🇧🇷 Português (PT-BR)

### 🎓 Contexto Acadêmico
Este é um projeto desenvolvido exclusivamente para **fins acadêmicos** (como parte do Projeto Integrador da **Unisinos**). Ele simula um portal web de doações completo para a ONG fictícia **GiveHope**, com o objetivo de facilitar a captação de recursos e a transparência em campanhas sociais.

### 📝 Sobre o Projeto
O **GiveHope** é uma plataforma que visa estreitar o laço entre voluntários/doadores e causas sociais. Ela simplifica o processo de doações, eliminando burocracias e fornecendo um fluxo interativo e moderno para doadores, além de um painel de administração robusto para gerenciamento das atividades do portal.

### 🚀 Funcionalidades
- **Área Pública**:
  - Landing Page moderna detalhando a missão, pilares e projetos da organização.
  - Cadastro de usuários e login com autenticação.
- **Fluxo de Doação (Multi-step)**:
  - Seleção de valores da doação.
  - Identificação de dados do doador.
  - Simulação de tela de pagamento ("Confirmar Pagamento") que faz o envio dos dados diretamente ao banco de dados.
  - Tela de confirmação de sucesso da doação.
- **Área do Doador**:
  - Histórico de doações efetuadas pelo usuário.
  - Edição de perfil do doador.
- **Área do Administrador** (Apenas para contas com privilégio `admin`):
  - Visão geral com estatísticas e relatórios de arrecadação.
  - Gerenciamento de usuários cadastrados no sistema.

### 🛠️ Tecnologias Utilizadas
- **Next.js 16** (com App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS 4** (Estilização responsiva e moderna)
- **ESLint** (Linting e padronização de código)

### 🔌 Integração com o Backend
Este frontend consome a API do backend da aplicação.
- **Repositório do Backend:** [augustomakar/unisinos](https://github.com/augustomakar/unisinos)
- **Tecnologias do Backend:** Node.js, Express, MongoDB (Mongoose), JWT para autenticação.

---

### ⚙️ Como Instalar e Rodar o Projeto

#### Pré-requisitos
Antes de começar, certifique-se de ter instalado em sua máquina:
- [Node.js](https://nodejs.org/) (Recomendado: v18 ou superior)
- [npm](https://www.npmjs.com/) (gerenciador de pacotes)

#### 1. Configurar as Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto frontend (ou edite o existente) informando o endereço da API do seu backend:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

#### 2. Instalar as Dependências
Abra o terminal na pasta raiz do projeto e execute:
```bash
npm install
```

#### 3. Executar o Servidor de Desenvolvimento
Inicie o servidor local executando:
```bash
npm run dev
```

O projeto estará disponível no seu navegador em [http://localhost:3000](http://localhost:3000).

---

## 🇺🇸 English (EN)

### 🎓 Academic Context
This project was developed exclusively for **academic purposes** (as part of the Integrator Project at **Unisinos**). It simulates a complete web donation portal for a fictitious NGO called **GiveHope**, aiming to facilitate fundraising and transparency in social campaigns.

### 📝 About the Project
**GiveHope** is a platform designed to strengthen the bond between volunteers/donors and social causes. It simplifies the donation process, eliminating bureaucracy and providing an interactive, modern flow for donors, alongside a robust administration panel to manage the portal's activities.

### 🚀 Key Features
- **Public Area**:
  - Modern Landing Page detailing the mission, pillars, and projects of the organization.
  - User registration and login with authentication.
- **Donation Flow (Multi-step)**:
  - Donation amount selection.
  - Donor identification details.
  - Simulated payment step ("Confirm payment") sending donation data directly to the database.
  - Success and confirmation screen.
- **Donor Area**:
  - Personal donation history.
  - Profile details editing.
- **Admin Area** (Access restricted to users with `admin` role):
  - Overview dashboard with general stats and donation reports.
  - Management of registered users.

### 🛠️ Technologies Used
- **Next.js 16** (with App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS 4** (Responsive and modern styling)
- **ESLint** (Linting and code standards)

### 🔌 Backend Integration
This frontend consumes the application's backend API.
- **Backend Repository:** [augustomakar/unisinos](https://github.com/augustomakar/unisinos)
- **Backend Technologies:** Node.js, Express, MongoDB (Mongoose), JWT for authentication.

---

### ⚙️ How to Install and Run

#### Prerequisites
Before you begin, ensure you have installed on your machine:
- [Node.js](https://nodejs.org/) (Recommended: v18 or newer)
- [npm](https://www.npmjs.com/) (package manager)

#### 1. Configure Environment Variables
Create a `.env` file in the root directory of the frontend project (or edit the existing one) with the API URL of your backend:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

#### 2. Install Dependencies
Open your terminal in the root directory of the project and run:
```bash
npm install
```

#### 3. Run the Development Server
Start the local server by running:
```bash
npm run dev
```

The application will be running and accessible at [http://localhost:3000](http://localhost:3000).
