// Definindo o canvas e seu contexto 2D
const canvas = document.getElementById("game");
const context = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Definindo constantes e configurações do jogo
const paddleWidth = 18,
    paddleHeight = 120,
    paddleSpeed = 8,
    ballRadius = 12,
    initialBallSpeed = 8,
    maxBallSpeed = 40,
    netWidth = 5,
    netColor = "WHITE";

// Função para desenhar a rede no canvas
function drawNet() {
    for (let i = 0; i <= canvas.height; i += 15) {
        drawRect(canvas.width / 2 - netWidth / 2, i, netWidth, 10, netColor);
    }
}

// Função para desenhar um retângulo no canvas
function drawRect(x, y, width, height, color) {
    context.fillStyle = color;
    context.fillRect(x, y, width, height);
}

// Função para desenhar um círculo no canvas
function drawCircle(x, y, radius, color) {
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2, false);
    context.closePath();
    context.fill();
}

// Função para desenhar texto no canvas
function drawText(text, x, y, color, fontSize = 60, fontWeight = 'bold', font = "Courier New") {
    context.fillStyle = color;
    context.font = `${fontWeight} ${fontSize}px ${font}`;
    context.textAlign = "center";
    context.fillText(text, x, y);
}

// Função para criar um objeto paddle
function createPaddle(x, y, width, height, color) {
    return { x, y, width, height, color, score: 0 };
}

// Função para criar um objeto bola
function createBall(x, y, radius, velocityX, velocityY, color) {
    return { x, y, radius, velocityX, velocityY, color, speed: initialBallSpeed };
}

// Definindo os objetos de paddle para usuário e computador
const user = createPaddle(0, canvas.height / 2 - paddleHeight / 2, paddleWidth, paddleHeight, "WHITE");
const com = createPaddle(canvas.width - paddleWidth, canvas.height / 2 - paddleHeight / 2, paddleWidth, paddleHeight, "WHITE");

// Definindo o objeto de bola
const ball = createBall(canvas.width / 2, canvas.height / 2, ballRadius, initialBallSpeed, initialBallSpeed, "WHITE");

// Atualizando a posição do paddle do usuário com base no movimento do mouse
canvas.addEventListener('mousemove', movePaddle);

function movePaddle(event) {
    const rect = canvas.getBoundingClientRect();
    user.y = event.clientY - rect.top - user.height / 2;
}

// Verificando a colisão entre a bola e o paddle
function collision(b, p) {
    return (
        b.x + b.radius > p.x && b.x - b.radius < p.x + p.width && b.y + b.radius > p.y && b.y - b.radius < p.y + p.height
    );
}

// Resetando a posição e velocidade da bola
function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = Math.random() * (canvas.height - ball.radius * 2) + ball.radius;
    ball.velocityX = -ball.velocityX;
    ball.speed = initialBallSpeed;
}

// Atualizando a lógica do jogo
function update() {
    // Verificando pontuação e resetando a bola, se necessário
    if (ball.x - ball.radius < 0) {
        com.score++;
        resetBall();
    } else if (ball.x + ball.radius > canvas.width) {
        user.score++;
        resetBall();
    }

    // Atualizando a posição da bola
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    // Atualizando a posição do paddle do computador com base na posição da bola
    com.y += (ball.y - (com.y + com.height / 2)) * 0.1;

    // Paredes superior e inferior
    if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
        ball.velocityY = -ball.velocityY;
    }

    // Determinando qual paddle está sendo atingido pela bola e tratando a colisão
    let player = ball.x + ball.radius < canvas.width / 2 ? user : com;
    if (collision(ball, player)) {
        const collidePoint = ball.y - (player.y + player.height / 2);
        const collisionAngle = (Math.PI / 4) * (collidePoint / (player.height / 2));
        const direction = ball.x + ball.radius < canvas.width / 2 ? 1 : -1;
        ball.velocityX = direction * ball.speed * Math.cos(collisionAngle);
        ball.velocityY = ball.speed * Math.sin(collisionAngle);

        // Aumentando a velocidade da bola e limitando-a à velocidade máxima
        ball.speed += 0.2;
        if (ball.speed > maxBallSpeed) {
            ball.speed = maxBallSpeed;
        }
    }
}

// Renderizando o jogo no canvas
function render() {
    // Limpando o canvas com uma tela preta
    drawRect(0, 0, canvas.width, canvas.height, "BLACK");
    drawNet();

    // Desenhando as pontuações
    drawText(user.score, canvas.width / 4, canvas.height / 2, "GRAY", 120, 'bold');
    drawText(com.score, (3 * canvas.width) / 4, canvas.height / 2, "GRAY", 120, 'bold');

    // Desenhando os paddles
    drawRect(user.x, user.y, user.width, user.height, user.color);
    drawRect(com.x, com.y, com.width, com.height, com.color);

    // Desenhando a bola
    drawCircle(ball.x, ball.y, ball.radius, ball.color);
}

// Executando o loop do jogo
function gameLoop() {
    update();
    render();
}

// Configurando o gameLoop para rodar a 60 frames por segundo
const framePerSec = 60;
setInterval(gameLoop, 1000 / framePerSec);
