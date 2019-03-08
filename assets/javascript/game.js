//global variables
var wordArr = ['cappuccino', 'affogato', 'irish coffee', 'flat white caffe mocha', 'caffe americano', 'long black', 'latte', 'turkish coffee', 'espresso', 'caffe macchiato', 'ristretto', 'cortado', 'cuban espresso', 'iced coffee', 'doppio', 'latte macchiato', 'cafe au lait', 'frappuccino']
var wrongLetter = []
var attemptsLeft = 7
var dashArray = []
var wordHidden = document.getElementById('hidden-word')
var guessedLetters = document.getElementById('wrongGuess')
var trackAttempts = document.getElementById('attempts')
//Generate a random word
var randWord = wordArr[Math.floor(Math.random()*wordArr.length)]
var textarea = document.getElementById('list');

//Initialize new game
function startNew (){   
    
    //generate underscore for each letter of random word    
    for (var i = 0; i < randWord.length; i++) {
        if (randWord[i] === (' ')){
            dashArray.push('&nbsp;')
        } else {
            dashArray.push('_')
        }        
    }
    wordHidden.innerHTML = dashArray.join(' ')
    //Display how many tries are left 
    trackAttempts.innerHTML = attemptsLeft
}
//check if letter pressed is correct
function checkLetter(x) {
        
    //track letters input
    if (randWord.indexOf(x) === -1) {
    attemptsLeft--
    trackAttempts.innerHTML = attemptsLeft
    wrongLetter.push(x)
    guessedLetters.innerHTML = wrongLetter.join(', ')
    } else {
        //reveal hidden letter on correct guess
        for (var j = 0; j < randWord.length; j++) {
            if (randWord[j] === x) {
                dashArray[j] = x                
            }
        }
        wordHidden.innerHTML = dashArray.join(' ')
    }   
}
//check for win or lose
function checkWinLose() {
    if (attemptsLeft === 0) {
        alert('Sorry, game over. You lose. The word was: ' + randWord)
        var playAgain = confirm('Would you like to play again?')
        if (playAgain === true) {
            location.reload();
        } else {
            alert('Well I don\'t know what to do from here. I\'ll just close the page I guess. It was fun. Call me sometime, we\'ll hang out. Ok, bye.')
            window.close()
        }        
    } else if (dashArray.indexOf('_') === -1) {
        alert('You WIN! Nice Job.')
        var playAgain = confirm('Would you like to play again?')
        if (playAgain === true) {
            location.reload();
        } else {
            alert('Well I don\'t know what to do from here. I\'ll just close the page I guess. It was fun. Call me sometime, we\'ll hang out. Ok, bye.')
            window.close()
        }
    }
}
//listen for user input
document.onkeyup = function (event) {
    var keyPressed = String.fromCharCode(event.keyCode).toLowerCase()
    if (!/^[a-z]+$/.test(keyPressed) || wrongLetter.includes(keyPressed) || dashArray.includes(keyPressed)) {
        alert('Only enter letters you have not used.')
    } else {
        checkLetter(keyPressed)
        setTimeout(function(){
            checkWinLose()
        },600)        
    }    
}
//reset
startNew()