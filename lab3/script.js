let correctNumber = Math.floor(Math.random() * 99) + 1;
let guessCount = 0;
const maxAttemps = 7;
let guessHistory = [];
let titleText = document.querySelector("#title");
let guessText = document.querySelector("#guessLast");
let hintText = document.querySelector("#hint");
let guessInput = document.querySelector("#guessInput");
let guessButton = document.querySelector("#guessButton");
let historyText = document.querySelector("#history");
guessButton.addEventListener("click", guessNumber);

guessInput.addEventListener("keyup", function (e) {
    if(e.key === 'Enter' || e.keyCode === 13) {
        guessNumber();
    }
});

function guessNumber() {
    let guess = guessInput.value;

    guessInput.value = "";
    hintText.style.color = 'white';

    if(guess === "") {
        hintText.textContent = "Enter something!";
        return;
    } else if(guess.charAt(0) == '-') {
        hintText.textContent = "Negatives not allowed..."
        return;
    } else if(!/^\d+$/.test(guess)) {
        hintText.textContent = "Guess a number instead...";
        return;
    }

    guess = Number(guess);
    guessText.textContent = guess;

    if(guess > 99) {
        hintText.textContent = "Out of bounds...";
        return;
    }

    guessHistory.push(guess);
    
    if(guess < correctNumber) {
        hintText.style.color = 'red';
        hintText.textContent = "Guess was too low...";
    } else if(guess > correctNumber) {
        hintText.style.color = 'yellow';
        hintText.textContent = "Guess was too high...";
    } else {
        hintText.style.color = 'green';
        hintText.textContent = "Guess was correct!"
        if(guessCount < health) {
            titleText.textContent = "SMARTY PARTY!!!";
        }
    }

    let historyTemp = "";
    for(let i = 0; i < guessHistory.length; i++) {
        historyTemp += guessHistory[i] + "... ";
    }

    historyText.textContent = historyTemp;

    guessCount++;

    
}
