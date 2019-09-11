function game(w, image, music){
    this.curWord = []; //user guess
    this.remainingGuess = 12; //remaining guess number
    this.guessedLetters = []; //guessed letters not in the target word
    this.word = w;
    this.imageUrl = image;
    this.musicUrl = music;
    for (var i = 0; i < this.word.length; i++) {
        this.curWord [i]= "_";
    }

    this.guess = function(letter){
        if (this.word.toUpperCase().indexOf(letter) != -1) {
            if (this.curWord.indexOf(letter) == -1) {
                for (var i = 0; i < this.word.length; i++) {
                    if (this.word[i].toUpperCase() === letter) {
                        this.curWord[i]= letter;
                    }                    
                }
            }
        } //matched
        else {
            if (this.guessedLetters.indexOf(letter) == -1) {
                this.guessedLetters.push(letter);
                this.remainingGuess--;
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

