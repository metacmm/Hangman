$(document).ready(function () {
    var isNewGame; //boolean to indicate if it is a new game
    var curGame;

    //DOM 
    var curWordText = document.getElementById("txt-curWord");
    var remainingGuessText = document.getElementById("txt-remainingGuess");
    var guessedLettersText = document.getElementById("txt-guessedLetters");
    var instructionText = document.getElementById("txt-instruction");
    var gameImage = document.getElementById("img-game");

    function refreshScreen(status) {
        if (status === "new" || status === "inprogress"){
            curWordText.textContent = curGame.curWord.join(" ");
            remainingGuessText.textContent = curGame.remainingGuess;
            guessedLettersText.textContent = curGame.guessedLetters.join(" ");
            if(status === "new"){
                gameImage.setAttribute("src", "assets/images/start.jpeg");
                instructionText.textContent = "Type the letter you guessed"
            }
        } else if (status === "won"){
            gameImage.setAttribute("src", curGame.imageUrl);
            instructionText.textContent = "You Win! Press any key to restart a new game";
        } else if (status === "lost"){
            gameImage.setAttribute("src", "assets/images/lose.png");
            instructionText.textContent = "You Lose! Press any key to restart a new game";
        }
    }

    document.onkeyup = function (event) {
        if (typeof isNewGame === "undefined") {
            //first time
            isNewGame = true;
            return;
        }
        if (isNewGame) {
            var rndIdx = Math.floor(Math.random() * games.length);
            curGame = new game(games[rndIdx].word, games[rndIdx].imageUrl, games[rndIdx].musicUrl);
            refreshScreen("new");
            isNewGame = false;
        }
        else {
            //update the field based on current key
            var userGuess = event.key.toUpperCase();
            curGame.guess(userGuess);
            refreshScreen("inprogress");

            //win, all letters are gussed
            if (curGame.isWon()) {
                isNewGame = true;
                refreshScreen("won");
            } 
            //lose, remaining guess equal to 0
            else if (curGame.isLost()) {
                isNewGame = true;
                refreshScreen("lost");
            }
        }
    }
   
});
