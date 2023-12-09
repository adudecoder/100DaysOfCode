// Obtenção de referências aos elementos HTML
let ratioWidth = document.getElementById("ratio-width");
let ratioHeight = document.getElementById("ratio-height");
let width = document.getElementById("width");
let height = document.getElementById("height");

// Função para calcular a largura com base na altura e proporção
let calculateWidth = () => {
    let aspectRatio = ratioWidth.value / ratioHeight.value;
    width.value = parseFloat((height.value * aspectRatio).toFixed(2));
};

// Função para calcular a altura com base na largura e proporção
let calculateHeight = () => {
    let aspectRatio = ratioWidth.value / ratioHeight.value;
    height.value = parseFloat((width.value / aspectRatio).toFixed(2));
}

// Adiciona ouvintes de eventos para as mudanças nas entradas
height.addEventListener("input", calculateWidth);
width.addEventListener("input", calculateHeight);
ratioHeight.addEventListener("input", calculateWidth);
ratioWidth.addEventListener("input", calculateHeight);
