// Timer Code
var timeLeft = 30;
var current_time = document.getElementById('timer');
    
var timerId = setInterval(countdown, 1000);
    
function countdown() {
    if (timeLeft == -1) {
    clearTimeout(timerId);
    current_time.innerHTML = "TIME'S UP";
    } else {
        if (timeLeft < 10) {
            current_time.innerHTML = '00:0' + timeLeft;
            timeLeft--;
        } else {
             current_time.innerHTML = '00:' + timeLeft;
               timeLeft--;
        }
    }
}

// Code for Difficulty Easy = 0, Medium = 1, Hard = 2

var starting_level = 0;
var current_level = document.getElementById('level');

var levelId = setInterval(progression, 1000);

function progression() {
    current_level.innerHTML = 0
}
// Code for Score

var starting_score = 0;
var current_score = document.getElementById('score');

var levelId = setInterval(scoring, 1000);

function scoring() {
    current_score.innerHTML = 0
}