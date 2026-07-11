const PRECOS = {
    conserto: 1500,
    pneu: 1200,
    chave: 1500,
    kitBasico: 1500,
    kitAvancado: 3500
};

const campos = {
    conserto: document.getElementById("conserto"),
    pneu: document.getElementById("pneu"),
    chave: document.getElementById("chave"),
    kitBasico: document.getElementById("kitBasico"),
    kitAvancado: document.getElementById("kitAvancado"),
    tuning: document.getElementById("tuning")
};

const subtotalElemento = document.getElementById("subtotal");
const descontoElemento = document.getElementById("desconto");
const resultadoElemento = document.getElementById("resultado");
const mensagemElemento = document.getElementById("mensagem");

const botaoCalcular = document.getElementById("calcular");
const botaoLimpar = document.getElementById("limpar");

function obterNumero(campo) {
    const valor = Number(campo.value);

    if (!Number.isFinite(valor) || valor < 0) {
        return 0;
    }

    return valor;
}

function formatarDinheiro(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2
    });
}

function obterParceria() {
    const selecionada = document.querySelector(
        'input[name="parceria"]:checked'
    );

    return selecionada ? selecionada.value : "0";
}

function calcular() {
    const quantidades = {
        conserto: obterNumero(campos.conserto),
        pneu: obterNumero(campos.pneu),
        chave: obterNumero(campos.chave),
        kitBasico: obterNumero(campos.kitBasico),
        kitAvancado: obterNumero(campos.kitAvancado)
    };

    const valorTuning = obterNumero(campos.tuning);
    const parceria = obterParceria();

    let subtotalServicos = 0;

    subtotalServicos +=
        quantidades.conserto * PRECOS.conserto;

    subtotalServicos +=
        quantidades.pneu * PRECOS.pneu;

    subtotalServicos +=
        quantidades.chave * PRECOS.chave;

    subtotalServicos +=
        quantidades.kitBasico * PRECOS.kitBasico;

    subtotalServicos +=
        quantidades.kitAvancado * PRECOS.kitAvancado;

    let percentualDesconto = 0;

    if (parceria === "1") {
        percentualDesconto = 0.10;
    }

    if (parceria === "2") {
        percentualDesconto = 0.20;
    }

    const descontoServicos =
        subtotalServicos * percentualDesconto;

    const servicosComDesconto =
        subtotalServicos - descontoServicos;

    /*
        Sem parceria: tuning +30%
        Parceria 1: tuning +20%
        Parceria 2: tuning +10%
    */

    let adicionalTuning = 0.30;

    if (parceria === "1") {
        adicionalTuning = 0.20;
    }

    if (parceria === "2") {
        adicionalTuning = 0.10;
    }

    const tuningFinal =
        valorTuning > 0
            ? valorTuning * (1 + adicionalTuning)
            : 0;

    const subtotalGeral =
        subtotalServicos +
        (valorTuning > 0 ? valorTuning * 1.30 : 0);

    const economiaTuning =
        valorTuning > 0
            ? valorTuning * (0.30 - adicionalTuning)
            : 0;

    const descontoTotal =
        descontoServicos + economiaTuning;

    const total =
        servicosComDesconto + tuningFinal;

    subtotalElemento.textContent =
        formatarDinheiro(subtotalGeral);

    descontoElemento.textContent =
        "- " + formatarDinheiro(descontoTotal);

    resultadoElemento.textContent =
        formatarDinheiro(total);

    mensagemElemento.textContent = "";

    if (total === 0) {
        mensagemElemento.textContent =
            "Adicione pelo menos um serviço ou um valor de tuning.";
    }
}

function limparCampos() {
    Object.values(campos).forEach((campo) => {
        campo.value = 0;
    });

    const semParceria = document.querySelector(
        'input[name="parceria"][value="0"]'
    );

    semParceria.checked = true;

    subtotalElemento.textContent = "R$ 0,00";
    descontoElemento.textContent = "R$ 0,00";
    resultadoElemento.textContent = "R$ 0,00";
    mensagemElemento.textContent = "";
}

botaoCalcular.addEventListener("click", calcular);
botaoLimpar.addEventListener("click", limparCampos);

Object.values(campos).forEach((campo) => {
    campo.addEventListener("input", calcular);
});

document
    .querySelectorAll('input[name="parceria"]')
    .forEach((opcao) => {
        opcao.addEventListener("change", calcular);
    });


// Fundo animado em Canvas

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let particulas = [];

function ajustarCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    criarParticulas();
}

function criarParticulas() {
    particulas = [];

    const quantidade =
        Math.min(100, Math.floor(window.innerWidth / 12));

    for (let i = 0; i < quantidade; i++) {
        particulas.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            raio: Math.random() * 2 + 0.5,
            velocidade: Math.random() * 0.8 + 0.2,
            opacidade: Math.random() * 0.45 + 0.1
        });
    }
}

function desenharFundo() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particulas.forEach((particula) => {
        ctx.beginPath();

        ctx.fillStyle =
            `rgba(255, 20, 20, ${particula.opacidade})`;

        ctx.arc(
            particula.x,
            particula.y,
            particula.raio,
            0,
            Math.PI * 2
        );

        ctx.fill();

        particula.y -= particula.velocidade;

        if (particula.y < -5) {
            particula.y = canvas.height + 5;
            particula.x = Math.random() * canvas.width;
        }
    });

    requestAnimationFrame(desenharFundo);
}

window.addEventListener("resize", ajustarCanvas);

ajustarCanvas();
desenharFundo();
calcular();
