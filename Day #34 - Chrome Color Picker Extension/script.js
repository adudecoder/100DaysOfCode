// Selecione os elementos do DOM
const pickerBtn = document.querySelector("#picker-btn");
const clearBtn = document.querySelector("#clear-btn");
const colorList = document.querySelector(".all-colors");
const exportBtn = document.querySelector("#export-btn");

// Recupere as cores escolhidas do armazenamento local ou inicialize um array vazio
let pickedColors = JSON.parse(localStorage.getItem("colors-list")) || [];

// Variável para controlar a janela de popup de cor atual
let currentPopup = null;

// Função para copiar texto para a área de transferência
const copyToClipboard = async (text, element) => {
    try {
        await navigator.clipboard.writeText(text);
        element.innerText = "Copiado!";
        // Redefine o texto do elemento após 1 segundo
        setTimeout(() => {
            element.innerText = text;
        }, 1000);
    } catch (error) {
        alert("Falha ao copiar o texto!");
    }
};

// Função para exportar cores como arquivo de texto
const exportColors = () => {
    const colorText = pickedColors.join("\n");
    const blob = new Blob([colorText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Cores.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};

// Função para criar o popup de cor
const createColorPopup = (color) => {
    const popup = document.createElement("div");
    popup.classList.add("color-popup");
    popup.innerHTML = `
        <div class="color-popup-content">
            <span class="close-popup">x</span>
            <div class="color-info">
                <div class="color-preview" style="background: ${color};"></div>
                <div class="color-details">
                    <div class="color-value">
                        <span class="label">Hex:</span>
                        <span class="value hex" data-color="${color}">${color}</span>
                    </div>
                    <div class="color-value">
                        <span class="label">RGB:</span>
                        <span class="value rgb" data-color="${color}">${hexToRgb(color)}</span>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Botão de fechar dentro do popup
    const closePopup = popup.querySelector(".close-popup");
    closePopup.addEventListener('click', () => {
        document.body.removeChild(popup);
        currentPopup = null;
    });

    // Ouvintes de eventos para copiar valores de cor para a área de transferência
    const colorValues = popup.querySelectorAll(".value");
    colorValues.forEach((value) => {
        value.addEventListener('click', (e) => {
            const text = e.currentTarget.innerText;
            copyToClipboard(text, e.currentTarget);
        });
    });

    return popup;
};

// Função para exibir as cores escolhidas
const showColors = () => {
    colorList.innerHTML = pickedColors.map((color) =>
        `
            <li class="color">
                <span class="rect" style="background: ${color}; border: 1px solid ${color === "#ffffff" ? "#ccc" : color}"></span>
                <span class="value hex" data-color="${color}">${color}</span>
            </li>
        `
    ).join("");

    const colorElements = document.querySelectorAll(".color");
    colorElements.forEach((li) => {
        const colorHex = li.querySelector(".value.hex");
        colorHex.addEventListener('click', (e) => {
            const color = e.currentTarget.dataset.color;
            if (currentPopup) {
                document.body.removeChild(currentPopup);
            }
            const popup = createColorPopup(color);
            document.body.appendChild(popup);
            currentPopup = popup;
        });
    });

    const pickedColorsContainer = document.querySelector(".colors-list");
    pickedColorsContainer.classList.toggle("hide", pickedColors.length === 0);
};

// Função para converter um código de cor hexadecimal para formato RGB
const hexToRgb = (hex) => {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgb(${r}, ${g}, ${b})`;
};

// Função para ativar o conta-gotas para escolher cores
const activateEyeDropper = async () => {
    document.body.style.display = "none";
    try {
        // Abrir o conta-gotas e obter a cor selecionada
        const { sRGBHex } = await new EyeDropper().open();

        if (!pickedColors.includes(sRGBHex)) {
            pickedColors.push(sRGBHex);
            localStorage.setItem("colors-list", JSON.stringify(pickedColors));
        }

        showColors();
    } catch (error) {
        alert("Falha ao copiar o código de cor!");
    } finally {
        document.body.style.display = "block";
    }
};

// Função para limpar todas as cores escolhidas
const clearAllColors = () => {
    pickedColors = [];
    localStorage.removeItem("colors-list");
    showColors();
};

// Ouvintes de eventos para botões
clearBtn.addEventListener('click', clearAllColors);
pickerBtn.addEventListener('click', activateEyeDropper);
exportBtn.addEventListener('click', exportColors);

// Exibindo as cores escolhidas no carregamento do documento
showColors();
