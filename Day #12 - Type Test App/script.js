// Random quotes API endpoint
const quoteApiUrl = "https://api.quotable.io/random?minLength=80&maxLength=100";

// DOM elements
const quoteSection = document.getElementById("quote");
const userInput = document.getElementById("quote-input");

// Variables to track test progress
let quote = "";
let time = 60;
let timer = "";
let mistakes = 0;

// Display a new random quote
const renderNewQuote = async () => {
    const response = await fetch(quoteApiUrl);
    let data = await response.json();
    quote = data.content;

    // Convert each character in the quote into spans for styling
    let arr = quote.split("").map((value) => {
        return "<span class='quote-chars'>" + value + "</span>";
    });
    quoteSection.innerHTML = arr.join("");
};

// Event listener for user input
userInput.addEventListener("input", () => {
    let quoteChars = document.querySelectorAll(".quote-chars");
    quoteChars = Array.from(quoteChars);

    // User input characters
    let userInputChars = userInput.value.split("");

    quoteChars.forEach((char, index) => {
        // Compare user input with quote characters
        if (char.innerText == userInputChars[index]) {
            char.classList.add("success");
        } else if (userInputChars[index] == null) {
            // Handle backspace or no input
            if (char.classList.contains("success")) {
                char.classList.remove("success");
            } else {
                char.classList.remove("fail");
            }
        } else {
            // Handle incorrect input
            if (!char.classList.contains("fail")) {
                mistakes++;
                char.classList.add("fail");
            }
            document.getElementById("mistakes").innerText = mistakes;
        }

        // Check if all characters are correct
        let check = quoteChars.every((element) => {
            return element.classList.contains("success");
        });

        // End the test if all characters are correct
        if (check) {
            displayResult();
        }
    });
});

// Update timer function
function updateTimer() {
    if (time == 0) {
        // End the test if the timer reaches 0
        displayResult();
    } else {
        document.getElementById("timer").innerText = --time + "s";
    }
}

// Set timer and start the test
const timeReduce = () => {
    time = 60;
    timer = setInterval(updateTimer, 1000);
};

// Display the test result
const displayResult = () => {
    document.querySelector(".result").style.display = "block";
    clearInterval(timer);
    document.getElementById("stop-test").style.display = "none";
    userInput.disabled = true;
    let timeTaken = 1;
    if (time != 0) {
        timeTaken = (60 - time) / 100;
    }
    document.getElementById("wpm").innerText = (userInput.value.length / 5 / timeTaken).toFixed(2) + "wpm";
    document.getElementById("accuracy").innerText = Math.round(((userInput.value.length - mistakes) / userInput.value.length) * 100) + "%";
};

// Start the test
const startTest = () => {
    mistakes = 0;
    timer = "";
    userInput.disabled = false;
    timeReduce();
    document.getElementById("start-test").style.display = "none";
    document.getElementById("stop-test").style.display = "block";
};

// Initialize the page
window.onload = () => {
    userInput.value = "";
    document.getElementById("start-test").style.display = "block";
    document.getElementById("stop-test").style.display = "none";
    userInput.disabled = true;
    renderNewQuote();
};
