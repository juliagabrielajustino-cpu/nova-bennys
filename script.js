const precos = {
    pneu: 1200,
    chave: 1500,
    kitBasico: 1500,
    kitAvancado: 3500,
    reparinho: 1500
};

const nomes = {
    pneu: "Pneu",
    chave: "Chave Inglesa",
    kitBasico: "Kit Básico",
    kitAvancado: "Kit Avançado",
    reparinho: "Reparinho"
};

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

const atendimentoExterno = document.getElementById("atendimentoExterno");
const campoLocal = document.getElementById("campoLocal");
const local = document.getElementById("local");

const botaoCalcular = document.getElementById("calcular");
const botaoLimpar = document.getElementById("limpar");

const resumoServicos = document.getElementById("resumoServicos");
const subtotalServicosElemento = document.getElementById("subtotalServicos");
const valorDescontoElemento = document.getElementById("valorDesconto");
const valorTuningResumoElemento = document.getElementById("valorTuningResumo");
const valorDeslocamentoElemento = document.getElementById("valorDeslocamento");
const resultadoElemento = document.getElementById("resultado");

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

function obterParceriaSelecionada() {
    return document.querySelector(
        'input[name="parceria"]:checked'
    );
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

    const parceriaSelecionada =
        obterParceriaSelecionada();

    const percentualDesconto = Number(
        parceriaSelecionada.value
    );

    const percentualTuning = Number(
        parceriaSelecionada.dataset.tuning
    );

    const valorDesconto =
        subtotalServicos *
        (percentualDesconto / 100);

    let tuningFinal = 0;

    if (usarTuning.checked) {
        const valorOriginalTuning =
            Number(tuning.value) || 0;

        tuningFinal =
            valorOriginalTuning *
            (1 + percentualTuning / 100);
    }

    let deslocamento = 0;

    if (atendimentoExterno.checked) {
        deslocamento =
            Number(local.value) || 0;
    }

    const total =
        subtotalServicos -
        valorDesconto +
        tuningFinal +
        deslocamento;

    if (itensResumo) {
        resumoServicos.innerHTML = itensResumo;
    } else {
        resumoServicos.innerHTML = `
            <p class="vazio">
                Nenhum serviço selecionado.
            </p>
        `;
    }

    subtotalServicosElemento.textContent =
        formatarDinheiro(subtotalServicos);

    valorDescontoElemento.textContent =
        valorDesconto > 0
            ? "- " + formatarDinheiro(valorDesconto)
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

    const semParceria = document.querySelector(
        'input[name="parceria"][value="0"]'
    );

    semParceria.checked = true;

    atualizarCamposVisiveis();
    calcular();
}

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

botaoCalcular.addEventListener("click", calcular);
botaoLimpar.addEventListener("click", limpar);

atualizarCamposVisiveis();
calcular();
