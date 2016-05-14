var read = require("./read");
var wordPicker = require("./word");

var MAX_GUESSES = 10;

var word = undefined;
var guesses = []; // ['A', 'B', 'Z']
var guessesLeft = MAX_GUESSES;

function main() {
	welcome();

	word = wordPicker.pickRandomWord().toUpperCase();

	while (true) {
		printBoard();
		var guess = getGuess();
		handleGuess(guess);
		if (determineWinLose()) {
			break;
		}
	}
}

function getBoardString() {
	var boardString = "";
	for (var index in word) {
		var c = word.charAt(index);
		if (c == ' ') {
			boardString += " ";
		} else if (guesses.indexOf(c) == -1) {
			boardString += "_";
		} else {
			boardString += c;
		}
		boardString += " ";
	}
	return boardString;
}

function welcome() {
	console.log("Welcome to Hangman");

}

function printBoard() {
	console.log(getBoardString());
	console.log( "You have " + guessesLeft + " guesses left");
}

function getGuess() {
	while (true) {
		var guess = read.read().replace('\r', '').replace('\n', '');
		if (!guess || guess.length != 1) {
			console.log("Enter a single letter for your guess");
		} else {
			return guess.toUpperCase();
		}
	}
}

function handleGuess(guess) {

	if( guesses.indexOf(guess) != -1 ) {
		// 1. guess already was picked
		console.log("letter already picked");
		return;
	}

	// add the new guess to the list of guesses
	guesses.push(guess);

	if( word.indexOf(guess) != -1 ) {
		// 2. letter is in word 
		console.log("Correct!");
	} else {
		// 3. letter is not in word
		guessesLeft--;
		console.log("Whoops... Incorrect.");
	}
}

function determineWinLose() {
	// set gameover to true if game is over
	// print "win!" or print "lose!" or do nothing
	if (wordWasGuessed()) {
		console.log ("Congratulations! You're a winner!!");
		console.log ("The answer was: " + word);
		return true;
	} else if (guessesLeft == 0) {
		console.log ("You killed the man :(");
		return true;
	}
	return false;
}

function wordWasGuessed() {
	// for loop for each index in `word`
	// letter in word is `word.charAt(index)`
	// if letter not in guesses, return false
	for ( var index in word) {
		var c = word.charAt(index);
		if (c != ' ' && guesses.indexOf(c) == -1) {
			return false;
		}
	}
	return true;
}


main();






