import {
    auth
} from "./firebase.js";

import {
    signInWithEmailAndPassword,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";


const formLogin = document.getElementById("formLogin");
const campoEmail = document.getElementById("email");
const campoSenha = document.getElementById("senha");
const botaoEntrar = document.getElementById("botaoEntrar");
const mensagem = document.getElementById("mensagem");


function mostrarMensagem(texto, tipo = "erro") {
    mensagem.textContent = texto;
    mensagem.className = `mensagem ${tipo}`;
}


function traduzirErro(codigo) {
    const erros = {
        "auth/invalid-email": "O e-mail informado não é válido.",
        "auth/invalid-credential": "E-mail ou senha incorretos.",
        "auth/missing-password": "Digite sua senha.",
        "auth/user-disabled": "Esta conta foi desativada.",
        "auth/too-many-requests":
            "Muitas tentativas. Aguarde um pouco e tente novamente.",
        "auth/network-request-failed":
            "Não foi possível conectar. Verifique sua internet."
    };

    return erros[codigo] || "Não foi possível entrar no sistema.";
}


formLogin.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const email = campoEmail.value.trim();
    const senha = campoSenha.value;

    if (!email || !senha) {
        mostrarMensagem("Preencha o e-mail e a senha.");
        return;
    }

    botaoEntrar.disabled = true;
    botaoEntrar.textContent = "Entrando...";
    mostrarMensagem("");

    try {
        await signInWithEmailAndPassword(
            auth,
            email,
            senha
        );

        mostrarMensagem(
            "Login realizado. Abrindo o sistema...",
            "sucesso"
        );

        window.location.href = "dashboard.html";

    } catch (erro) {
        console.error("Erro no login:", erro);

        mostrarMensagem(
            traduzirErro(erro.code)
        );

    } finally {
        botaoEntrar.disabled = false;
        botaoEntrar.textContent = "Entrar";
    }
});


onAuthStateChanged(auth, (usuario) => {
    if (usuario) {
        window.location.href = "dashboard.html";
    }
});
