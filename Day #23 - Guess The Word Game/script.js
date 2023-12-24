// DOM elements
const inputs = document.querySelector(".word"),
    hintTag = document.querySelector(".hint span"),
    guessLeft = document.querySelector(".guess span"),
    mistakes = document.querySelector(".wrong span"),
    resetBtn = document.querySelector(".reset"),
    hintBtn = document.querySelector(".showhint"),
    hintElement = document.querySelector(".hint"),
    typeInput = document.querySelector(".type-input");

// Game variables
let word, incorrectLetters = [], correctLetters = [], maxGuesses;

// Start a new game
function startNewGame() {
    // Initialize variables and UI
    alert("New Game Started! Guess New Word :)");
    hintElement.style.display = "none";
    hintElement.style.opacity = "0";

    // Choose a random word from the list
    const ranWord = wordList[Math.floor(Math.random() * wordList.length)];
    word = ranWord.word;

    // Set max guesses based on word length
    maxGuesses = word.length >= 5 ? 8 : 6;

    // Reset lists and UI elements
    incorrectLetters = [];
    correctLetters = [];
    hintTag.innerText = ranWord.hint;
    guessLeft.innerText = maxGuesses;
    mistakes.innerText = incorrectLetters;
    inputs.innerHTML = "";

    // Create an input for each letter of the word
    for (let i = 0; i < word.length; i++) {
        const input = document.createElement("input");
        input.type = "text";
        input.disabled = true;
        inputs.appendChild(input);
    }
}

// Handle user input and update game stats
function handleInput(e) {
    const key = e.target.value.toLowerCase();

    // Check if the input is a valid letter and not guessed before
    if (key.match(/^[a-z]+$/i) && !incorrectLetters.includes(`${key}`) && !correctLetters.includes(`${key}`)) {
        if (word.includes(key)) {
            // Update correct guess
            for (let i = 0; i < word.length; i++) {
                if (word[i] === key) {
                    inputs.querySelectorAll("input")[i].value += key;
                }
            }
            correctLetters += key;
        } else {
            // Update incorrect guess
            maxGuesses--;
            incorrectLetters.push(`${key}`);
            mistakes.innerText = incorrectLetters;
        }
    }

    guessLeft.innerText = maxGuesses;

    // Check for win or lose conditions
    if (correctLetters.length === word.length) {
        alert(`Congrats! You Found The Word ${word.toUpperCase()}`);
        startNewGame();
    } else if (maxGuesses < 1) {
        alert("Game Over! You Don't Have Remaining Guesses!");
        for (let i = 0; i < word.length; i++) {
            // Fill inputs with correct letters
            inputs.querySelectorAll("input")[i].value = word[i];
        }
    }

    typeInput.value = "";
}

// Show hint element
function showHintElement() {
    hintElement.style.display = "block";
    hintElement.style.opacity = "1";
}

// Event listeners
resetBtn.addEventListener("click", startNewGame);
hintBtn.addEventListener("click", showHintElement);
typeInput.addEventListener("input", handleInput);
inputs.addEventListener("click", () => typeInput.focus());
document.addEventListener("keydown", () => typeInput.focus());

// Initial game setup
startNewGame();
