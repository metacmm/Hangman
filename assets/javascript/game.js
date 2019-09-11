$(document).ready(function () {

    var curWord = "";
    var remainingGuess;
    var guessedLetters = "";
    var isNewGame;
    var curGame;
    var curWordText = document.getElementById("txt-curWord");
    var remainingGuessText = document.getElementById("txt-remainingGuess");
    var guessedLettersText = document.getElementById("txt-guessedLetters");

    document.onkeyup = function (event) {
        if (typeof isNewGame === "undefined") {
            console.log("press any key to start!");
            isNewGame = true;
            return;
        }
        if (isNewGame) {
            //randomly select a game
            console.log("Is new game.");
            var rndIdx = Math.floor(Math.random() * games.length);
            curGame = games[rndIdx];
            curWord = "";
            //initialization
            for (var i = 0; i < curGame.word.length; i++) {
                curWord += "_";
            }
            remainingGuess = 12;
            guessedLetters = "";
            isNewGame = false;
        }

        //update the field based on current key
        var userGuess = event.key.toUpperCase();

        if (curGame.word.toUpperCase().indexOf(userGuess) != -1) {
            if (curWord.indexOf(userGuess) == -1) {
                var curWordCopy = curWord;
                curWord = "";
                for (var i = 0; i < curGame.word.length; i++) {
                    if (curGame.word[i].toUpperCase() === userGuess) {
                        curWord += userGuess;
                    }
                    else {
                        curWord += curWordCopy[i];
                    }
                }
            }
        } //matched
        else {
            if (guessedLetters.indexOf(userGuess) == -1) {
                guessedLetters += userGuess;
                remainingGuess--;
            }
        }//unmatched


        if (!isNewGame) {
            console.log("curWord is " + curWord);
            curWordText.textContent = curWord;
            console.log(remainingGuess);
            remainingGuessText.textContent = remainingGuess;
            console.log(guessedLetters);

            guessedLettersText.textContent = guessedLetters;
        }

        /** if success (all words guessed), isNewGame = true, update image, music */
        if (curWord.indexOf("_") == -1) {
            isNewGame = true;
            console.log("Succeed!")

        } else if (remainingGuess == 0) {
            isNewGame = true;
            console.log("failed!");
        }


    }
});
