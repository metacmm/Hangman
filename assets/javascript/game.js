function game(w, image, music){
    this.curWord = []; //user guess
    this.remainingGuess = 12; //remaining guess number
    this.guessedLetters = []; //guessed letters not in the target word
    this.word = w;
    this.imageUrl = image;
    this.musicUrl = music;
    for (var i = 0; i < curGame.word.length; i++) {
        this.curWord [i]= "_";
    }

    //DOM 
    var curWordText = document.getElementById("txt-curWord");
    var remainingGuessText = document.getElementById("txt-remainingGuess");
    var guessedLettersText = document.getElementById("txt-guessedLetters");
    var instructionText = document.getElementById("txt-instruction");
    var gameImage = document.getElementById("img-game");

    this.guess = function(letter){
        if (curGame.word.toUpperCase().indexOf(letter) != -1) {
            if (curWord.indexOf(letter) == -1) {
                for (var i = 0; i < curGame.word.length; i++) {
                    if (curGame.word[i].toUpperCase() === letter) {
                        curWord[i]= letter;
                    }                    
                }
            }
        } //matched
        else {
            if (guessedLetters.indexOf(letter) == -1) {
                guessedLetters.push(letter);
                remainingGuess--;
            }
        }//unmatched
    }

    this.isWon = function(){
        return this.curWord.indexOf("_") == -1;
    }

    this.isLost = function(){
        return this.remainingGuess == 0;
    }
}

