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

const campos = {
    pneu: document.getElementById("pneu"),
    chave: document.getElementById("chave"),
    kitBasico: document.getElementById("kitBasico"),
    kitAvancado: document.getElementById("kitAvancado"),
    reparinho: document.getElementById("reparinho")
};

const parceria = document.getElementById("parceria");
const externo = document.getElementById("externo");
const campoLocal = document.getElementById("campoLocal");
const local = document.getElementById("local");

const botaoCalcular = document.getElementById("calcular");
const botaoCopiar = document.getElementById("copiar");

const resumo = document.getElementById("resumo");
const subtotalElemento = document.getElementById("subtotal");
const descontoElemento = document.getElementById("desconto");
const valorLocalElemento = document.getElementById("valorLocal");
const totalElemento = document.getElementById("total");

let ultimoOrcamento = "";

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

function atualizarCampoLocal() {
    if (externo.checked) {
        campoLocal.style.display = "block";
    } else {
        campoLocal.style.display = "none";
    }
}

function calcular() {
    let subtotal = 0;
    let linhasResumo = "";
    let linhasCopiar = "";
    let possuiServico = false;

    for (const servico in campos) {
        const quantidade = obterQuantidade(campos[servico]);

        if (quantidade > 0) {
            possuiServico = true;

            const valorItem = quantidade * precos[servico];

            subtotal += valorItem;

            linhasResumo += `
                <div class="linha">
                    <span>${nomes[servico]} (${quantidade}x)</span>
                    <strong>${formatarDinheiro(valorItem)}</strong>
                </div>
            `;

            linhasCopiar +=
                `${nomes[servico]} (${quantidade}x): ${formatarDinheiro(valorItem)}\n`;
        }
    }

    const percentualDesconto = Number(parceria.value);
    const valorDesconto = subtotal * (percentualDesconto / 100);

    let deslocamento = 0;
    let nomeLocal = "Sem deslocamento";

    if (externo.checked) {
        deslocamento = Number(local.value);
        nomeLocal = local.options[local.selectedIndex].text;
    }

    const total = subtotal - valorDesconto + deslocamento;

    if (possuiServico) {
        resumo.innerHTML = linhasResumo;
    } else {
        resumo.textContent = "Nenhum serviço selecionado.";
    }

    subtotalElemento.textContent = formatarDinheiro(subtotal);

    descontoElemento.textContent =
        percentualDesconto > 0
            ? "- " + formatarDinheiro(valorDesconto)
            : formatarDinheiro(0);

    valorLocalElemento.textContent =
        deslocamento > 0
            ? "+ " + formatarDinheiro(deslocamento)
            : formatarDinheiro(0);

    totalElemento.textContent = formatarDinheiro(total);

    const nomeParceria =
        parceria.options[parceria.selectedIndex].text;

    ultimoOrcamento =
`ORÇAMENTO BENNY'S

${linhasCopiar || "Nenhum serviço selecionado.\n"}
Parceria: ${nomeParceria}
Atendimento externo: ${externo.checked ? "Sim" : "Não"}
Local: ${nomeLocal}

Subtotal: ${formatarDinheiro(subtotal)}
Desconto: ${formatarDinheiro(valorDesconto)}
Deslocamento: ${formatarDinheiro(deslocamento)}

TOTAL: ${formatarDinheiro(total)}`;
}

async function copiarOrcamento() {
    calcular();

    try {
        await navigator.clipboard.writeText(ultimoOrcamento);
        botaoCopiar.textContent = "ORÇAMENTO COPIADO";

        setTimeout(() => {
            botaoCopiar.textContent = "📋 Copiar orçamento";
        }, 1800);
    } catch (erro) {
        alert("Não foi possível copiar o orçamento.");
    }
}

externo.addEventListener("change", () => {
    atualizarCampoLocal();
    calcular();
});

parceria.addEventListener("change", calcular);
local.addEventListener("change", calcular);

Object.values(campos).forEach((campo) => {
    campo.addEventListener("input", calcular);
});

botaoCalcular.addEventListener("click", calcular);
botaoCopiar.addEventListener("click", copiarOrcamento);

atualizarCampoLocal();
calcular();
