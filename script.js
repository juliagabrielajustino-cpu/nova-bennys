// ===== PREÇOS =====

const precos = {
    pneu: 1200,
    chave: 1500,
    kitBasico: 1500,
    kitAvancado: 3500,
    reparinho: 1500
};

// Quantidade de cada serviço
const quantidade = {
    pneu: 0,
    chave: 0,
    kitBasico: 0,
    kitAvancado: 0,
    reparinho: 0
};

// Atualiza os números na tela
function atualizarTela(){

    document.getElementById("qtd-pneu").textContent = quantidade.pneu;
    document.getElementById("qtd-chave").textContent = quantidade.chave;
    document.getElementById("qtd-kitBasico").textContent = quantidade.kitBasico;
    document.getElementById("qtd-kitAvancado").textContent = quantidade.kitAvancado;
    document.getElementById("qtd-reparinho").textContent = quantidade.reparinho;

}

// Botões +
document.querySelectorAll(".mais").forEach(botao=>{

    botao.addEventListener("click",()=>{

        quantidade[botao.dataset.servico]++;

        atualizarTela();

    });

});

// Botões -
document.querySelectorAll(".menos").forEach(botao=>{

    botao.addEventListener("click",()=>{

        if(quantidade[botao.dataset.servico] > 0){

            quantidade[botao.dataset.servico]--;

            atualizarTela();

        }

    });

});

// Atendimento externo

const externo = document.getElementById("externo");
const campoLocal = document.getElementById("campoLocal");

externo.addEventListener("change",()=>{

    if(externo.checked){

        campoLocal.style.display="block";

    }else{

        campoLocal.style.display="none";

    }

});

// Calcular orçamento

document.getElementById("calcular").addEventListener("click",calcular);

function calcular(){

    let subtotal = 0;
    let resumo = "";

    // Serviços

    for(const servico in quantidade){

        if(quantidade[servico] > 0){

            const valor = quantidade[servico] * precos[servico];

            subtotal += valor;

            resumo +=
            `${nomeBonito(servico)} (${quantidade[servico]}x) - ${formatar(valor)}<br>`;

        }

    }

    // Desconto

    const descontoPorcentagem =
    Number(document.getElementById("parceria").value);

    const desconto =
    subtotal * (descontoPorcentagem/100);

    // Deslocamento

    let deslocamento = 0;

    if(externo.checked){

        deslocamento =
        Number(document.getElementById("local").value);

    }

    const total =
    subtotal - desconto + deslocamento;

    document.getElementById("total").textContent =
    formatar(total);

    document.getElementById("resumo").innerHTML =

    resumo +

    `<hr>

    Subtotal: ${formatar(subtotal)}<br>

    Desconto: -${formatar(desconto)}<br>

    Deslocamento: ${formatar(deslocamento)}

    `;

}

// Nome bonito

function nomeBonito(nome){

    switch(nome){

        case "pneu":
            return "🛞 Pneu";

        case "chave":
            return "🔧 Chave Inglesa";

        case "kitBasico":
            return "📦 Kit Básico";

        case "kitAvancado":
            return "🚗 Kit Avançado";

        case "reparinho":
            return "🩹 Reparinho";

    }

}

// Formatar dinheiro

function formatar(valor){

    return valor.toLocaleString("pt-BR",{

        style:"currency",

        currency:"BRL"

    });

}

// Copiar orçamento

document.getElementById("copiar").addEventListener("click",()=>{

    let texto = "📋 ORÇAMENTO BENNY'S\n\n";

    for(const servico in quantidade){

        if(quantidade[servico] > 0){

            texto += `${nomeBonito(servico)} (${quantidade[servico]}x)\n`;

        }

    }

    texto += `\n💰 Total: ${document.getElementById("total").textContent}`;

    navigator.clipboard.writeText(texto);

    alert("Orçamento copiado!");

});

atualizarTela();
