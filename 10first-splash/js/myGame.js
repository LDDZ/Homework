var randomNumber=Math.floor(Math.random() * 100) + 1;
console.log(randomNumber);

var guessField=document.querySelector('.guessField');
console.log(guessField);
var guesses = document.querySelector('.guesses');
console.log(guesses);
var lastResult=document.querySelector('.lastResult');
// console.log(lastResult);
var lowOrHi=document.querySelector('.lowOrHi');
// console.log(lowOrHi);
var guessSubmit=document.querySelector('.guessSubmit');
// console.log(guessSubmit);

var guessContn=1;
var resetButton;
guessField.focus();

function checkGuess(){
    guesses.innerHTML += guessField.value+' ';
    guesses.style.backgroundColor='red';
}

// checkGuess();

guessSubmit.addEventListener('click',checkGuess);

//猜数自增
guessContn++;