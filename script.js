const servicos = {
    pneu: 1200,
    chave: 1500,
    kitBasico: 1500,
    kitAvancado: 3500,
    reparinho: 1500
};

const calcularBtn = document.getElementById("calcular");

calcularBtn.addEventListener("click", calcular);

function calcular() {

    const servicoSelecionado = document.getElementById("servico").value;
    const desconto = Number(document.getElementById("parceria").value);
    const deslocamento = Number(document.getElementById("local").value);

    const valorServico = servicos[servicoSelecionado];

    const valorDesconto = valorServico * (desconto / 100);

    const valorFinalServico = valorServico - valorDesconto;

    const total = valorFinalServico + deslocamento;

    document.getElementById("valorServico").textContent =
        formatar(valorServico);

    document.getElementById("valorDesconto").textContent =
        "- " + formatar(valorDesconto);

    document.getElementById("valorLocal").textContent =
        formatar(deslocamento);

    document.getElementById("resultado").textContent =
        formatar(total);

}

function formatar(valor){

    return valor.toLocaleString("pt-BR",{
        style:"currency",
        currency:"BRL"
    });

}

calcular();
