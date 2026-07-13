const precos = {
    pneu: 500,
    chave: 1000,
    kitBasico: 1000,
    kitAvancado: 3000,
    reparinho: 1000
};

const nomes = {
    pneu: "Pneu",
    chave: "Chave Inglesa",
    kitBasico: "Kit Básico",
    kitAvancado: "Kit Avançado",
    reparinho: "Reparinho"
};

const telaEntrada = document.getElementById("telaEntrada");
const sistema = document.getElementById("sistema");
const nomeMecanico = document.getElementById("nomeMecanico");
const mecanicoExibido = document.getElementById("mecanicoExibido");
const dataHora = document.getElementById("dataHora");
const erroLogin = document.getElementById("erroLogin");

const camposServicos = {
    pneu: document.getElementById("pneu"),
    chave: document.getElementById("chave"),
    kitBasico: document.getElementById("kitBasico"),
    kitAvancado: document.getElementById("kitAvancado"),
    reparinho: document.getElementById("reparinho")
};

const usarTuning = document.getElementById("usarTuning");
const campoTuning = document.getElementById("campoTuning");
const tuning = document.getElementById("tuning");
const valorTuningFinal = document.getElementById("valorTuningFinal");

const atendimentoExterno =
    document.getElementById("atendimentoExterno");

const campoLocal = document.getElementById("campoLocal");
const local = document.getElementById("local");

const resumoServicos =
    document.getElementById("resumoServicos");

const subtotalServicosElemento =
    document.getElementById("subtotalServicos");

const valorDescontoElemento =
    document.getElementById("valorDesconto");

const valorTuningResumoElemento =
    document.getElementById("valorTuningResumo");

const valorDeslocamentoElemento =
    document.getElementById("valorDeslocamento");

const resultadoElemento =
    document.getElementById("resultado");


function formatarDinheiro(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function obterQuantidade(campo) {
    const valor = Number(campo.value);

    if (!Number.isFinite(valor) || valor < 0) {
        return 0;
    }

    return Math.floor(valor);
}

function obterParceria() {
    return document.querySelector(
        'input[name="parceria"]:checked'
    );
}

function atualizarDataHora() {
    const agora = new Date();

    dataHora.textContent = agora.toLocaleString("pt-BR", {
        dateStyle: "short",
        timeStyle: "short"
    });
}

function entrarNoSistema() {
    const nome = nomeMecanico.value.trim();

    if (nome.length < 2) {
        erroLogin.textContent =
            "Digite um nome válido.";

        nomeMecanico.focus();
        return;
    }

    erroLogin.textContent = "";
    mecanicoExibido.textContent = nome;

    telaEntrada.classList.add("escondido");
    sistema.classList.remove("escondido");

    atualizarDataHora();
}

function sairDoSistema() {
    sistema.classList.add("escondido");
    telaEntrada.classList.remove("escondido");

    nomeMecanico.value = "";
    nomeMecanico.focus();
}

function atualizarCamposVisiveis() {
    campoTuning.classList.toggle(
        "ativo",
        usarTuning.checked
    );

    campoLocal.classList.toggle(
        "ativo",
        atendimentoExterno.checked
    );
}

function calcular() {
    let subtotalServicos = 0;
    let itensResumo = "";

    for (const servico in camposServicos) {
        const quantidade = obterQuantidade(
            camposServicos[servico]
        );

        if (quantidade > 0) {
            const valorItem =
                quantidade * precos[servico];

            subtotalServicos += valorItem;

            itensResumo += `
                <div class="item-resumo">
                    <span>
                        ${nomes[servico]} (${quantidade}x)
                    </span>

                    <strong>
                        ${formatarDinheiro(valorItem)}
                    </strong>
                </div>
            `;
        }
    }

    const parceriaSelecionada = obterParceria();

    const percentualDesconto =
        Number(parceriaSelecionada.value);

    const descontoServicos =
        subtotalServicos *
        (percentualDesconto / 100);

 let tuningFinal = 0;

if (usarTuning.checked) {
    const valorOriginal =
        Math.max(0, Number(tuning.value) || 0);

    tuningFinal = valorOriginal * 1.30;
}

    let deslocamento = 0;

    if (atendimentoExterno.checked) {
        deslocamento =
            Math.max(0, Number(local.value) || 0);
    }

    const total =
        subtotalServicos -
        descontoServicos +
        tuningFinal +
        deslocamento;

    resumoServicos.innerHTML =
        itensResumo || `
            <p class="vazio">
                Nenhum serviço selecionado.
            </p>
        `;

    subtotalServicosElemento.textContent =
        formatarDinheiro(subtotalServicos);

    valorDescontoElemento.textContent =
        descontoServicos > 0
            ? "- " + formatarDinheiro(descontoServicos)
            : formatarDinheiro(0);

    valorTuningFinal.textContent =
        formatarDinheiro(tuningFinal);

    valorTuningResumoElemento.textContent =
        formatarDinheiro(tuningFinal);

    valorDeslocamentoElemento.textContent =
        deslocamento > 0
            ? "+ " + formatarDinheiro(deslocamento)
            : formatarDinheiro(0);

    resultadoElemento.textContent =
        formatarDinheiro(total);
}

function limpar() {
    Object.values(camposServicos).forEach((campo) => {
        campo.value = 0;
    });

    usarTuning.checked = false;
    tuning.value = 0;

    atendimentoExterno.checked = false;
    local.selectedIndex = 0;

    document.querySelector(
        'input[name="parceria"][value="0"]'
    ).checked = true;

    atualizarCamposVisiveis();
    calcular();
}

document
    .getElementById("entrar")
    .addEventListener("click", entrarNoSistema);

document
    .getElementById("sair")
    .addEventListener("click", sairDoSistema);

document
    .getElementById("calcular")
    .addEventListener("click", calcular);

document
    .getElementById("limpar")
    .addEventListener("click", limpar);

nomeMecanico.addEventListener("keydown", (evento) => {
    if (evento.key === "Enter") {
        entrarNoSistema();
    }
});

usarTuning.addEventListener("change", () => {
    atualizarCamposVisiveis();
    calcular();
});

atendimentoExterno.addEventListener("change", () => {
    atualizarCamposVisiveis();
    calcular();
});

tuning.addEventListener("input", calcular);
local.addEventListener("change", calcular);

Object.values(camposServicos).forEach((campo) => {
    campo.addEventListener("input", calcular);
});

document
    .querySelectorAll('input[name="parceria"]')
    .forEach((opcao) => {
        opcao.addEventListener("change", calcular);
    });

setInterval(atualizarDataHora, 30000);

atualizarCamposVisiveis();
calcular();
