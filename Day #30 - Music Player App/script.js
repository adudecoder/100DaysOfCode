// Elementos da interface do usuário
const image = document.getElementById('cover'),
    title = document.getElementById('music-title'),
    artist = document.getElementById('music-artist'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-progress'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play'),
    background = document.getElementById('bg-img');

// Objeto de áudio
const music = new Audio();

// Lista de músicas
const songs = [
    {
        path: 'assets/1.mp3',
        displayName: 'The Charmer\'s Call',
        cover: 'assets/1.jpg',
        artist: 'Hanu Dixit',
    },
    {
        path: 'assets/2.mp3',
        displayName: 'You Will Never See Me Coming',
        cover: 'assets/2.jpg',
        artist: 'NEFFEX',
    },
    {
        path: 'assets/3.mp3',
        displayName: 'Intellect',
        cover: 'assets/3.jpg',
        artist: 'Yung Logos',
    }
];

let musicIndex = 0;
let isPlaying = false;

// Função para alternar entre tocar e pausar a música
function togglePlay() {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

// Função para reproduzir a música
function playMusic() {
    isPlaying = true;
    // Altera o ícone do botão de reprodução
    playBtn.classList.replace('fa-play', 'fa-pause');
    // Define o título do hover do botão
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

// Função para pausar a música
function pauseMusic() {
    isPlaying = false;
    // Altera o ícone do botão de pausa
    playBtn.classList.replace('fa-pause', 'fa-play');
    // Define o título do hover do botão
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

// Função para carregar uma música
function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}

// Função para trocar de música (avançar ou retroceder)
function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

// Função para atualizar a barra de progresso da música
function updateProgressBar() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    // Função para formatar o tempo em minutos:segundos
    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

// Função para definir a posição da música ao clicar na barra de progresso
function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

// Adiciona ouvintes de eventos aos botões e ao áudio
playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);

// Carrega a primeira música ao iniciar a página
loadMusic(songs[musicIndex]);
