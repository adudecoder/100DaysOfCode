// Declaração de variáveis
let startTime, endTime;
let imageSize = "";
let image = new Image();
let bitSpeed = document.getElementById("bits"),
    kbSpeed = document.getElementById("kbs"),
    mbSpeed = document.getElementById("mbs"),
    info = document.getElementById("info");

let totalBitSpeed = 0;
let totalKbSpeed = 0;
let totalMbSpeed = 0;
let numTests = 1;
let testCompleted = 0;

// URL para obter uma imagem aleatória do Unsplash
let imageApi = "https://source.unsplash.com/random?topic=nature";

// Quando a imagem é carregada
image.onload = async function () {
    endTime = new Date().getTime();

    // Obter o tamanho da imagem usando a API fetch
    await fetch(imageApi).then((response) => {
        imageSize = response.headers.get("content-length");
        calculateSpeed();
    });
};

// Função para calcular a velocidade
function calculateSpeed() {
    // Tempo decorrido em segundos
    let timeDuration = (endTime - startTime) / 1000;
    // Total de bits
    let loadedBits = imageSize * 8;
    let speedInBps = loadedBits / timeDuration;
    let speedInKbps = speedInBps / 1024;
    let speedInMbps = speedInKbps / 1024;

    totalBitSpeed += speedInBps;
    totalKbSpeed += speedInKbps;
    totalMbSpeed += speedInMbps;

    testCompleted++;

    // Se todos os testes forem concluídos (neste caso, 1 teste), calcular a média
    if (testCompleted === numTests) {
        let averageSpeedInBps = (totalBitSpeed / numTests).toFixed(2);
        let averageSpeedInKbps = (totalKbSpeed / numTests).toFixed(2);
        let averageSpeedInMbps = (totalMbSpeed / numTests).toFixed(2);

        // Exibir velocidades médias
        bitSpeed.innerHTML += `${averageSpeedInBps}`;
        kbSpeed.innerHTML += `${averageSpeedInKbps}`;
        mbSpeed.innerHTML += `${averageSpeedInMbps}`;
        info.innerHTML = "Teste concluído!";
    } else {
        // Executar o próximo teste
        startTime = new Date().getTime();
        image.src = imageApi;
    }
}

// Função inicial para iniciar os testes
const init = async () => {
    info.innerHTML = "Testando...";
    startTime = new Date().getTime();
    image.src = imageApi;
};

// Executar os testes quando a janela é carregada
window.onload = () => {
    for (let i = 0; i < numTests; i++) {
        init();
    }
};
