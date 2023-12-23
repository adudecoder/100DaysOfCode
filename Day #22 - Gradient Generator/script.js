// Elementos do DOM
let colorOne = document.getElementById("color-a");
let colorTwo = document.getElementById("color-b");
let currentDirection = 'to bottom'; // Direção padrão do gradiente
let outputCode = document.getElementById("code");

// Função para definir a direção do gradiente
function setDirection(value, _this) {
    let directions = document.querySelectorAll(".buttons button");
    for (let i of directions) {
        i.classList.remove("active");
    }
    _this.classList.add("active");
    currentDirection = value;
}

// Função para gerar o código do gradiente e aplicá-lo ao fundo
function generateCode() {
    outputCode.value = `background-image: linear-gradient(${currentDirection}, ${colorOne.value}, ${colorTwo.value})`;
    document.getElementsByTagName("BODY")[0].style.backgroundImage = `linear-gradient(${currentDirection}, ${colorOne.value}, ${colorTwo.value})`;
}

// Função para copiar o código gerado
function copyText() {
    outputCode.select();
    document.execCommand('copy');
    alert("Gradient Copied!");
}

// Inicializa o código ao carregar a página
generateCode();
