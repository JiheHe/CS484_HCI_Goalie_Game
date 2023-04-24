// Timer Code

var timeLeft = 15;
var current_time = document.getElementById('timer');
    
var timerId = setInterval(countdown, 1000);
    
function countdown() {
    if (timeLeft == -1) {
    clearTimeout(timerId);
    current_time.innerHTML = "TIME'S UP";
    } else {
        if (timeLeft < 10) {
            current_time.classList.add("timer2");
            current_time.innerHTML = '00:0' + timeLeft;
            timeLeft--;
        } else {
             current_time.innerHTML = '00:' + timeLeft;
               timeLeft--;
        }
    }
}

// Code for Score

var current_score = document.getElementById('score');

var scoreId = setInterval(scoring, 1000);

function scoring() {
    clearTimeout(scoreId);
    current_score.innerHTML = 12;
}

// Code for Difficulty, changes colors as difficulty increases

var current_level = document.getElementById('level');

var levelId = setInterval(progression, 1000);

function progression() {
    if (current_score.innerHTML < 10) {
        current_level.classList.add("level1");
        current_level.innerHTML = "Easy";
    } else {
        if (current_score.innerHTML <= 20) {
            clearTimeout(levelId);
            current_level.classList.add("level2");
            current_level.innerHTML = "Medium";
        } else {
            clearTimeout(levelId);
            current_level.classList.add("level3");
            current_level.innerHTML = "Hard";
        }
    }
}