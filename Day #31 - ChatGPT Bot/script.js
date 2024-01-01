// Elementos do DOM
const chatLog = document.getElementById('chat-log'),
    userInput = document.getElementById('user-input'),
    sendButton = document.getElementById('send-button'),
    buttonIcon = document.getElementById('button-icon'),
    info = document.querySelector('.info');

// Adiciona ouvintes de eventos para o botão e a tecla "Enter"
sendButton.addEventListener('click', sendMessage);
userInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

// Função para enviar mensagens
function sendMessage() {
    const message = userInput.value.trim();

    // Se a mensagem for vazia, não faz nada
    if (message === '') {
        return;
    }
    // Se a mensagem for 'developer', exibe uma mensagem específica e faz uma simulação de carregamento
    else if (message === 'developer') {
        userInput.value = '';
        appendMessage('user', message);
        setTimeout(() => {
            appendMessage('bot', 'This Source Coded By Reza Mehdikhanlou \nYoutube : @AsmrProg');
            buttonIcon.classList.add('fa-solid', 'fa-paper-plane');
            buttonIcon.classList.remove('fas', 'fa-spinner', 'fa-pulse');
        }, 2000);
        return;
    }

    // Caso contrário, envia a mensagem do usuário e chama a API
    appendMessage('user', message);
    userInput.value = '';

    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': 'Your Key',
            'X-RapidAPI-Host': 'chatgpt53.p.rapidapi.com'
        },
        body: `{"messages":[{"role":"user","content":"${message}"}]}`
    };

    fetch('https://chatgpt53.p.rapidapi.com/', options)
        .then((response) => response.json())
        .then((response) => {
            appendMessage('bot', response.choices[0].message.content);
            buttonIcon.classList.add('fa-solid', 'fa-paper-plane');
            buttonIcon.classList.remove('fas', 'fa-spinner', 'fa-pulse');
        })
        .catch((err) => {
            if (err.name === 'TypeError') {
                appendMessage('bot', 'Error : Check Your Api Key!');
                buttonIcon.classList.add('fa-solid', 'fa-paper-plane');
                buttonIcon.classList.remove('fas', 'fa-spinner', 'fa-pulse');
            }
        });
}

// Função para adicionar uma mensagem à interface
function appendMessage(sender, message) {
    info.style.display = "none";
    buttonIcon.classList.remove('fa-solid', 'fa-paper-plane');
    buttonIcon.classList.add('fas', 'fa-spinner', 'fa-pulse');

    const messageElement = document.createElement('div');
    const iconElement = document.createElement('div');
    const chatElement = document.createElement('div');
    const icon = document.createElement('i');

    chatElement.classList.add("chat-box");
    iconElement.classList.add("icon");
    messageElement.classList.add(sender);
    messageElement.innerText = message;

    if (sender === 'user') {
        icon.classList.add('fa-regular', 'fa-user');
        iconElement.setAttribute('id', 'user-icon');
    } else {
        icon.classList.add('fa-solid', 'fa-robot');
        iconElement.setAttribute('id', 'bot-icon');
    }

    iconElement.appendChild(icon);
    chatElement.appendChild(iconElement);
    chatElement.appendChild(messageElement);
    chatLog.appendChild(chatElement);
    chatLog.scrollTo = chatLog.scrollHeight;
}
