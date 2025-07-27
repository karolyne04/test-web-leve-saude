FeedbackHub Web - Admin Dashboard

Aplicação web criada para administração e visualização de feedbacks dos usuários da versão mobile do app **FeedbackHub**. Desenvolvida com **React + Vite + TypeScript**, utilizando autenticação via **Firebase** e estilização com **Tailwind CSS**.

---

## 🚀 Tecnologias Utilizadas

- [React + Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Firebase Authentication](https://firebase.google.com/products/auth)
- [Firebase Firestore](https://firebase.google.com/products/firestore)
- [ESLint + Prettier](https://eslint.org/)
- Deploy via [Vercel]🔗https://test-web-leve-saude-ten.vercel.app/) 

---

## 📋 Funcionalidades

✅ Autenticação com Firebase (email e senha)  
✅ Dashboard com listagem de todos os feedbacks enviados  
✅ Exibição de nome do usuário, nota, comentário e data  
✅ Filtros de ordenação por **data** (mais recentes / mais antigos) ou **nota** (maior / menor)  
✅ Busca por **nome** do usuário ou **conteúdo do comentário**  
✅ Estilização com **Tailwind CSS**  
✅ Leitura dos dados via **Firestore**  
✅ Projeto em **TypeScript**, com **ESLint + Prettier**  
✅ Repositório público com histórico de commits organizado

---

## 🧪 Como rodar o projeto localmente

### 1. Clone o repositório

```bash
git clone https://github.com/karolyne04/test-web-leve-saude.git
cd test-web-leve-saude

. Instale as dependências

npm install

 Crie o arquivo .env com suas chaves do Firebase

VITE_FIREBASE_API_KEY=AIzaSyBJJd8av7Zs1AXv0z1zGxyoR7Urse8391E
VITE_FIREBASE_AUTH_DOMAIN=feedbackhub-83b2d.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=feedbackhub-83b2d
VITE_FIREBASE_STORAGE_BUCKET=feedbackhub-83b2d.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=335214134775
VITE_FIREBASE_APP_ID=1:335214134775:web:95ea5cc4d0ed585d2b5af2

 Rode o projeto localmente

npm run dev

Firebase - Estrutura do Firestore

📂 feedbacks
 ┣ 📄 <feedbackId>
 ┃ ┣ uid: string // ID do usuário
 ┃ ┣ userName: string // nome do usuário (se armazenado)
 ┃ ┣ stars: number // nota de 1 a 5
 ┃ ┣ comment: string // texto do feedback
 ┃ ┣ createdAt: timestamp // data do envio
O campo userName pode ser obtido via displayName do usuário autenticado, se configurado.
 Funcionalidades avançadas da UI
🔎 Campo de busca que filtra feedbacks por nome ou comentário

🗂️ Filtros de ordenação:

Mais recentes / mais antigos

Notas maiores / menores

📅 Datas formatadas (ex: dd/mm/aaaa hh:mm)

🧹 Padronização de Código
ESLint e Prettier configurados

Scripts úteis:

npm run lint       # verifica problemas de lint
npm run format     # formata o código com Prettier

🌐 Deploy
Aplicação hospedada em:

🔗https://test-web-leve-saude-ten.vercel.app/

)

👩‍💻 Desenvolvedora
Carolyne Ferreira
