// Obter elementos do DOM necessários para o jogo
const scoreEl = document.getElementById("score");
const colorParts = document.querySelectorAll(".colors");
const containerEl = document.querySelector(".container");
const startBtn = document.querySelector("#start-btn");
const resultEl = document.querySelector("#score-result");
const wrapperEl = document.querySelector(".wrapper");

// Objeto de cores atual e nova
const colorObj = {
    color1: { current: "#006400", new: "#00ff00" },
    color2: { current: "#800000", new: "#ff0000" },
    color3: { current: "#0000b8", new: "#0000ff" },
    color4: { current: "#808000", new: "#ffff00" },
};

// Variáveis do jogo
let randomColors = [];
let isPathGenerating = false;
let score = 0;
let clickCount = 0;

// Função para obter uma cor aleatória do objeto de cores
const getRandomColor = (colorsObj) => {
    const colorKeys = Object.keys(colorsObj);
    return colorKeys[Math.floor(Math.random() * colorKeys.length)];
};

// Função para pausar a execução do jogo por um determinado tempo
const delay = async (time) => {
    return await new Promise((resolve) => setTimeout(resolve, time));
};

// Função para gerar um caminho aleatório de cores
const generateRandomPath = async () => {
    randomColors.push(getRandomColor(colorObj));
    score = randomColors.length;
    isPathGenerating = true;
    await showPath(randomColors);
};

// Função para mostrar o caminho das cores para o jogador
const showPath = async (colors) => {
    scoreEl.innerText = score;
    // Iterar por cada cor no array
    for (let color of colors) {
        const currentColor = document.querySelector(`.${color}`);
        // Pausar a execução por 500 milissegundos
        await delay(500);
        // Definir o plano de fundo para a nova cor
        currentColor.style.backgroundColor = colorObj[color].new;
        await delay(600);
        // Definir o plano de fundo para a cor antiga
        currentColor.style.backgroundColor = colorObj[color].current;
        await delay(600);
    }
    // Definir a bandeira para indicar que o jogo não está mais gerando um caminho
    isPathGenerating = false;
};

// Função para encerrar o jogo e mostrar a pontuação final
const endGame = () => {
    resultEl.innerHTML = `<span> Sua Pontuação: </span> ${score}`;
    resultEl.classList.remove("hide");
    containerEl.classList.remove("hide");
    wrapperEl.classList.add("hide");
    startBtn.innerText = "Jogar Novamente";
    startBtn.classList.remove("hide");
};

// Função para redefinir o jogo após o término
const resetGame = () => {
    score = 0;
    clickCount = 0;
    randomColors = [];
    isPathGenerating = false;
    wrapperEl.classList.remove("hide");
    containerEl.classList.add("hide");
    generateRandomPath();
};

// Função para lidar com o clique em uma cor
const handleColorClick = async (e) => {
    // Se o caminho estiver sendo gerado atualmente, ignore o clique
    if (isPathGenerating) {
        return false;
    }
    // Se a cor clicada estiver correta, atualize a pontuação e continue gerando o caminho
    if (e.target.classList.contains(randomColors[clickCount])) {
        e.target.style.backgroundColor = colorObj[randomColors[clickCount]].new;
        await delay(500);
        e.target.style.backgroundColor = colorObj[randomColors[clickCount]].current;
        clickCount++;
        if (clickCount === score) {
            clickCount = 0;
            generateRandomPath();
        }
        // Se a cor clicada estiver incorreta, encerre o jogo
    } else {
        endGame();
    }
};

// Event Listeners
startBtn.addEventListener("click", resetGame);
colorParts.forEach((color) => color.addEventListener("click", handleColorClick));
