$(document).ready(function () {

    var curWord = []; //user guess
    var remainingGuess = null; //remaining guess number
    var guessedLetters = []; //guessed letters not in the target word
    var isNewGame; //boolean to indicate if it is a new game
    var curGame; //randomly selected game for current round

    //DOM 
    var curWordText = document.getElementById("txt-curWord");
    var remainingGuessText = document.getElementById("txt-remainingGuess");
    var guessedLettersText = document.getElementById("txt-guessedLetters");
    var instructionText = document.getElementById("txt-instruction");
    var gameImage = document.getElementById("img-game");

    document.onkeyup = function (event) {
        if (typeof isNewGame === "undefined") {
            //first time
            isNewGame = true;
            return;
        }
        if (isNewGame) {
            startNewGame();
            refreshScreen();
        }
        else {
            //update the field based on current key
            var userGuess = event.key.toUpperCase();

            if (curGame.word.toUpperCase().indexOf(userGuess) != -1) {
                if (curWord.indexOf(userGuess) == -1) {
                    var curWordCopy = curWord;
                    for (var i = 0; i < curGame.word.length; i++) {
                        if (curGame.word[i].toUpperCase() === userGuess) {
                            curWord[i]= userGuess;
                        }                    }
                }
            } //matched
            else {
                if (guessedLetters.indexOf(userGuess) == -1) {
                    guessedLetters.push(userGuess);
                    remainingGuess--;
                }
            }//unmatched


            if (!isNewGame) {
                refreshScreen();
            }

            //win, all letters are gussed
            if (curWord.indexOf("_") == -1) {
                isNewGame = true;
                gameImage.setAttribute("src", curGame.imageUrl);
                instructionText.textContent = "You Win! Press any key to restart a new game";
            } 
            //lose, remaining guess equal to 0
            else if (remainingGuess == 0) {
                isNewGame = true;
                gameImage.setAttribute("src", "assets/images/lose.png");
                instructionText.textContent = "You Lose! Press any key to restart a new game";
            }
        }
    }
    function startNewGame() {
        curWord = [];
        guessedLetters = [];
        var rndIdx = Math.floor(Math.random() * games.length);
        curGame = games[rndIdx];
        for (var i = 0; i < curGame.word.length; i++) {
            curWord [i]= "_";
        }
        curGame = games[rndIdx];
        remainingGuess = 12;
        isNewGame = false;
        gameImage.setAttribute("src", "assets/images/start.jpeg");
        instructionText.textContent = "Type the letter you guessed"
    }

    function refreshScreen() {
        curWordText.textContent = curWord.join(" ");
        remainingGuessText.textContent = remainingGuess;
        guessedLettersText.textContent = guessedLetters.join(" ");
    }
});


