// Variáveis para armazenar contagem de caras (heads) e coroas (tails)
let heads = 0;
let tails = 0;

// Referências aos elementos HTML relevantes
let coin = document.querySelector(".coin");
let flipBtn = document.querySelector("#flip-button");
let resetBtn = document.querySelector("#reset-button");

// Adiciona um ouvinte de evento ao botão de lançamento
flipBtn.addEventListener("click", () => {
    // Gera um número aleatório (0 ou 1) para simular cara ou coroa
    let i = Math.floor(Math.random() * 2);

    // Interrompe a animação atual da moeda
    coin.style.animation = "none";

    // Atualiza a animação com base no resultado do lançamento
    if (i) {
        setTimeout(function () {
            coin.style.animation = "spin-heads 3s forwards";
        }, 100);
        heads++;
    } else {
        setTimeout(function () {
            coin.style.animation = "spin-tails 3s forwards";
        }, 100);
        tails++;
    }

    // Aguarda o término da animação e, em seguida, atualiza as estatísticas e habilita o botão novamente
    setTimeout(updateStats, 3000);
    disableButton();
});

// Função para atualizar as estatísticas na interface
function updateStats() {
    document.querySelector("#heads-count").textContent = `Heads: ${heads}`;
    document.querySelector("#tails-count").textContent = `Tails: ${tails}`;
}

// Função para desabilitar o botão de lançamento temporariamente
function disableButton() {
    flipBtn.disabled = true;
    setTimeout(function () {
        flipBtn.disabled = false;
    }, 3000);
}

// Adiciona um ouvinte de evento ao botão de reset
resetBtn.addEventListener("click", () => {
    // Interrompe a animação atual e reinicia as contagens
    coin.style.animation = "none";
    heads = 0;
    tails = 0;
    updateStats();
});
