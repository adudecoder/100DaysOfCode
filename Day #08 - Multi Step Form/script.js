var form1 = document.getElementById("form1");
var form2 = document.getElementById("form2");
var form3 = document.getElementById("form3");
var next1 = document.getElementById("next1");
var next2 = document.getElementById("next2");
var back1 = document.getElementById("back1");
var back2 = document.getElementById("back2");
var progress = document.getElementById("progress");

// Evento de clique para avançar do passo 1 para o passo 2
next1.onclick = function () {
    form1.style.left = "-450px";
    form2.style.left = "40px";
    progress.style.width = "240px";
}

// Evento de clique para voltar do passo 2 para o passo 1
back1.onclick = function () {
    form1.style.left = "40px";
    form2.style.left = "450px";
    progress.style.width = "120px";
}

// Evento de clique para avançar do passo 2 para o passo 3
next2.onclick = function () {
    form2.style.left = "-450px";
    form3.style.left = "40px";
    progress.style.width = "360px";
}

// Evento de clique para voltar do passo 3 para o passo 2
back2.onclick = function () {
    form2.style.left = "40px";
    form3.style.left = "450px";
    progress.style.width = "240px";
}
