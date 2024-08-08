// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   console.log("Let's play some scrabble! Enter a word:");
   let word = input.question("Enter a word: ");
   return word;
};

let newPointStructure = transform(oldPointStructure);

let simpleScorer = function (word){
   let wordPoints = word.length;
   return wordPoints;
}

let scoringObject1 = {
   name: "Simple Score",
   description: "Each letter is worth 1 point.",
   scorerFunction: simpleScorer
};

let vowelBonusScorer = function (word) {
   let wordPoints = 0;
   word = word.toUpperCase();
   for (let i = 0; i < word.length; i++) {
      if ((word.charAt(i).includes('A'))||(word.charAt(i).includes('E'))||
      (word.charAt(i).includes('I'))||(word.charAt(i).includes('O'))||
      (word.charAt(i).includes('U'))) {
         wordPoints += 3;
      }
      else {
         wordPoints +=1;
      }
   }
   return wordPoints;
}

let scoringObject2 = {
   name: "Bonus Vowels",
   description: "Vowels are 3 pts, consonants are 1 pt.",
   scorerFunction: vowelBonusScorer
};

let scrabbleScorer = function (word) {
   wordPoints = 0;
   word = word.toLowerCase();
   for (i = 0; i < word.length; i++){
      wordPoints += newPointStructure[word[i]];
   }
   return wordPoints;
} 

let scoringObject3 = {
   name: "Scrabble",
   description: "The traditional scoring algorithm.",
   scorerFunction: scrabbleScorer
};

const scoringAlgorithms = [scoringObject1, scoringObject2, scoringObject3];

function scorerPrompt(word) {
   console.log("Which socring algorith would you like to use?\n");
   for (let i = 0; i <scoringAlgorithms.length; i++){
      console.log(i + " - " + scoringAlgorithms[i].name + ": " + scoringAlgorithms[i].description);
   }
   let scoreChoice = input.question("Enter 0, 1, or 2: ");
   console.log("Score for '" + word + "': " + scoringAlgorithms[scoreChoice].scorerFunction(word));
}

function transform(oldPointStructure) {
   let newPointStructure = {};
   let newKey;
   let newValue;
   let arr = [];
   for (item in oldPointStructure){
      arr = oldPointStructure[item];
      for (i = 0; i < arr.length; i++){
         newKey = oldPointStructure[item][i].toLowerCase();
         newValue = Number(item);
         newPointStructure[newKey] = newValue;
      }
   }
   return newPointStructure;
};

function runProgram() {
   let word = initialPrompt();
   scorerPrompt(word);
   
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
