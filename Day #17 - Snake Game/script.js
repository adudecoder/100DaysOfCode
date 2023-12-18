// Seleciona os elementos do DOM
const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");
const controls = document.querySelectorAll(".controls i");

// Variáveis de estado do jogo
let gameOver = false;
let foodX, foodY;
let snakeX = 5, snakeY = 5;
let velocityX = 0, velocityY = 0;
let snakeBody = [];
let setIntervalId;
let score = 0;

// Obtém a pontuação mais alta do armazenamento local
let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerText = `High Score: ${highScore}`;

// Função para atualizar a posição da comida
const updateFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

// Função chamada quando o jogo termina
const handleGameOver = () => {
    clearInterval(setIntervalId);
    alert("Game Over! Press OK to replay...");
    location.reload();
}

// Função para mudar a direção da cobra com base na tecla pressionada
const changeDirection = e => {
    if (e.key === "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    } else if (e.key === "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    } else if (e.key === "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    } else if (e.key === "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

// Adiciona eventos de clique aos controles
controls.forEach(button => button.addEventListener("click", () => changeDirection({ key: button.dataset.key })));

// Função principal para inicializar o jogo
const initGame = () => {
    // Se o jogo acabou, chama a função de game over
    if (gameOver) return handleGameOver();

    let html = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

    // Quando a cobra come a comida
    if (snakeX === foodX && snakeY === foodY) {
        updateFoodPosition();
        snakeBody.push([foodY, foodX]); // Adiciona a comida ao corpo da cobra
        score++;
        highScore = score >= highScore ? score : highScore;

        // Atualiza e exibe a pontuação e a pontuação mais alta
        localStorage.setItem("high-score", highScore);
        scoreElement.innerText = `Score: ${score}`;
        highScoreElement.innerText = `High Score: ${highScore}`;
    }

    // Atualiza a posição da cabeça da cobra
    snakeX += velocityX;
    snakeY += velocityY;

    // Move os elementos do corpo da cobra para a frente
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }

    snakeBody[0] = [snakeX, snakeY];

    // Verifica se a cabeça da cobra atingiu o corpo
    for (let i = 0; i < snakeBody.length; i++) {
        html += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;

        if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
            gameOver = true;
        }
    }

    // Verifica se a cobra atingiu as paredes
    if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
        return gameOver = true;
    }

    // Adiciona os elementos ao tabuleiro de jogo
    playBoard.innerHTML = html;
}

// Inicializa a posição da comida e inicia o intervalo do jogo
updateFoodPosition();
setIntervalId = setInterval(initGame, 100);

// Adiciona evento de tecla para mudar a direção
document.addEventListener("keyup", changeDirection);
