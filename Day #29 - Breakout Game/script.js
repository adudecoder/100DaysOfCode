// Obtendo referência para o elemento canvas e seu contexto 2D
let canvas = document.getElementById('game'),
    ctx = canvas.getContext('2d'),
    ballRadius = 9,
    x = canvas.width / (Math.floor(Math.random() * Math.random() * 10) + 3),
    y = canvas.height - 40,
    dx = 2,
    dy = -2;

// Definindo propriedades do paddle
let paddleHeight = 12,
    paddleWidth = 72;
let paddleX = (canvas.width - paddleWidth) / 2; // Posição inicial do paddle

// Configurações dos tijolos (bricks)
let rowCount = 5,
    columnCount = 9,
    brickWidth = 54,
    brickHeight = 18,
    brickPadding = 12,
    topOffset = 40,
    leftOffset = 33,
    score = 0;

// Array bidimensional para representar os tijolos
let bricks = [];
for (let c = 0; c < columnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < rowCount; r++) {
        // Configuração da posição e status dos tijolos
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

// Adicionando um ouvinte de eventos para o movimento do mouse
document.addEventListener("mousemove", mouseMoveHandler, false);

// Função para mover o paddle com base no movimento do mouse
function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
    }
}

// Função para desenhar o paddle
function drawPaddle() {
    ctx.beginPath();
    ctx.roundRect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight, 30);
    ctx.fillStyle = '#333';
    ctx.fill();
    ctx.closePath();
}

// Função para desenhar a bola
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#333';
    ctx.fill();
    ctx.closePath();
}

// Função para desenhar os tijolos
function drawBricks() {
    for (let c = 0; c < columnCount; c++) {
        for (let r = 0; r < rowCount; r++) {
            if (bricks[c][r].status === 1) {
                let brickX = (c * (brickWidth + brickPadding)) + leftOffset;
                let brickY = (r * (brickHeight + brickPadding)) + topOffset;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.roundRect(brickX, brickY, brickWidth, brickHeight, 30);
                ctx.fillStyle = '#333';
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

// Função para exibir a pontuação
function trackScore() {
    ctx.font = 'bold 16px sans-serif';
    ctx.fillStyle = '#333';
    ctx.fillText('Score : ' + score, 8, 24);
}

// Função para detecção de colisão entre a bola e os tijolos
function hitDetection() {
    for (let c = 0; c < columnCount; c++) {
        for (let r = 0; r < rowCount; r++) {
            let b = bricks[c][r];
            if (b.status === 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    // Verifica se todos os tijolos foram atingidos para vencer o jogo
                    if (score === rowCount * columnCount) {
                        alert('Você venceu!');
                        document.location.reload();
                    }
                }
            }
        }
    }
}

// Função principal que renderiza o jogo
function init() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    trackScore();
    drawBricks();
    drawBall();
    drawPaddle();
    hitDetection();

    // Detecção de colisão com as paredes laterais
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }

    // Detecção de colisão com a parede superior
    if (y + dy < ballRadius) {
        dy = -dy;
    } else if (y + dy > canvas.height - ballRadius) {
        // Detecção de colisão com o paddle
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        } else {
            // Se a bola não atingir o paddle, o jogo é encerrado
            alert('Fim de jogo!');
            document.location.reload();
        }
    }

    // Detecção de colisão com a parede inferior
    if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
        dy = -dy;
    }

    // Movimentação da bola
    x += dx;
    y += dy;
}

// Inicia o jogo chamando a função init a cada 10 milissegundos
setInterval(init, 10);
