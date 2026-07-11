const PRECOS = {
    conserto: 1500,
    pneu: 1200,
    chave: 1500,
    kitBasico: 1500,
    kitAvancado: 3500
};

function calcular() {

    const conserto = Number(document.getElementById("conserto").value) || 0;
    const pneu = Number(document.getElementById("pneu").value) || 0;
    const chave = Number(document.getElementById("chave").value) || 0;
    const kitBasico = Number(document.getElementById("kitBasico").value) || 0;
    const kitAvancado = Number(document.getElementById("kitAvancado").value) || 0;
    const tuning = Number(document.getElementById("tuning").value) || 0;

    const parceria = document.querySelector('input[name="parceria"]:checked').value;

    let desconto = 1;
    let tuningMultiplicador = 1.30;

    switch (parceria) {

        case "1":
            desconto = 0.90;
            tuningMultiplicador = 1.20;
            break;

        case "2":
            desconto = 0.80;
            tuningMultiplicador = 1.10;
            break;

        default:
            desconto = 1;
            tuningMultiplicador = 1.30;

    }

    let total = 0;

    total += conserto * PRECOS.conserto * desconto;
    total += pneu * PRECOS.pneu * desconto;
    total += chave * PRECOS.chave * desconto;
    total += kitBasico * PRECOS.kitBasico * desconto;
    total += kitAvancado * PRECOS.kitAvancado * desconto;

    total += tuning * tuningMultiplicador;

    document.getElementById("resultado").innerHTML =
        "Total: R$ " +
        total.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

}

function limparCampos() {

    document.getElementById("conserto").value = 0;
    document.getElementById("pneu").value = 0;
    document.getElementById("chave").value = 0;
    document.getElementById("kitBasico").value = 0;
    document.getElementById("kitAvancado").value = 0;
    document.getElementById("tuning").value = 0;

    document.querySelector('input[value="0"]').checked = true;

    document.getElementById("resultado").innerHTML =
        "Total: R$ 0,00";

}
