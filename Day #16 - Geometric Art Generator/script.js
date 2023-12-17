// Seleciona o botão e define as formas usadas no padrão
const btn = document.getElementById("btn");
const shapes = [
    "quad-circle-1",
    "quad-circle-2",
    "quad-circle-3",
    "quad-circle-4",
    "triangle-1",
    "triangle-2",
    "triangle-3",
    "triangle-4",
    "circle",
];

// Define cores para as formas
const colors = ["#01d2fd", "#ffc700", "#fe9f12", "#06d0c7"];

// Seleciona todos os elementos div dentro do contêiner
const boxes = document.querySelectorAll(".container div");

// Função para gerar um padrão aleatório e aplicá-lo às caixas
let generatePattern = () => {
    // Itera por cada caixa
    boxes.forEach((box) => {
        // Redefine a classe da caixa
        box.className = "";

        // Seleciona aleatoriamente uma forma e uma cor
        let i = Math.floor(Math.random() * shapes.length);
        let j = Math.floor(Math.random() * colors.length);

        // Aplica a forma e a cor selecionadas à caixa
        box.classList.add(shapes[i]);
        box.style.backgroundColor = colors[j];
    });
};

// Adiciona ouvintes de eventos ao botão e ao evento de carregamento da janela
btn.addEventListener("click", generatePattern);
window.addEventListener("load", generatePattern);
