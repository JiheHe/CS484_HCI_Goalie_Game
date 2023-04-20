$(function(){

  let count = 0, score = 0, timer = 60; // to-be changed to 60 or 40 or 30, or 5(for testing)
  let isRunning = true;
  let request = null;

  // instead of listening to mousemove, listen to change in player position
  window.addEventListener("mousemove", (e) =>{
    gsap.to(".goalkeeper", {
        duration: 0.4,
        x: e.pageX - 750,
        y: e.pageY - 200,
    });
  });

  interval1 = setInterval(function(){
    $('.curtime').text(timer--);
    if (timer == 0){
        endGame();
    }
  }, 1000);

  interval2 = setInterval(function(){
    if (isRunning){
        footballShot(); 

        setTimeout( function() {
            $('.football').css({
                transform: 'scale(0.2)',
            })
        }, 1000);

        setTimeout( function() {
            let rect1 = document.querySelector(".football").getBoundingClientRect(),
            rect2 = document.querySelector(".goalkeeper").getBoundingClientRect();
            if (checkOverlap(rect1, rect2)){
                score += 1;
                if (score == 5){
                    reminderOfLevelUp();
                }
            } 
            editScore();
            $('.football').css("visibility", "hidden");

        }, 1700);
    } 

  }, 3000);


  function endGame(){
     isRunning = false;
     clearInterval(interval1);
     clearInterval(interval2);

     let reminder = document.querySelector('.timeup-reminder');
     reminder.style.display = "block";

     const readtime = 5;
     let count = readtime;
     let curinterval = setInterval(function() {
        count--;
        document.querySelector('.timeup-instruction').innerHTML = "Time's up! Let's go check your performance :D";
        document.querySelector('.timeup-timer').innerHTML = count + " s";
        if (count <= 0) {
            clearInterval(curinterval);
            reminder.style.display = "none";
            let url = '/leaderboard?score=' + score;
            if (request != null)
                request.abort();
            request = $.ajax({
                type: 'GET',
                url: url
            });
            window.location.replace(url);
        }
     }, 1000);
  }



  function reminderOfLevelUp(){
     isRunning = false;
     let reminder = document.querySelector('.levelup-reminder');
     reminder.style.display = "block";

     const readtime = 5;
     let count = readtime;
     let curinterval = setInterval(function() {
        count--;
        document.querySelector('.levelup-instruction').innerHTML = "You brilliantly saved 5 balls. <br/> Now let's try faster balls!";
        document.querySelector('.levelup-timer').innerHTML = count + " s";
        if (count <= 0) {
            clearInterval(curinterval);
            reminder.style.display = "none";
            $('.football').css("transition", "0.5s");
            isRunning = true;
        }
     }, 1000);
  }


  function checkOverlap(rect1, rect2){
     return res = !(rect1.right < rect2.left || 
        rect1.left > rect2.right || 
        rect1.bottom < rect2.top || 
        rect1.top > rect2.bottom);
  }


  function footballShot() {
    $('.football').css({
        left:  getRandomXandY(100, 1000),
        top: getRandomXandY(200, 400),
        transform: 'scale(1)'
    })

    setTimeout( function() {
        $('.football').css("visibility", "visible");
    }, 700);

    count += 1;
  }

  function editScore(){
    setTimeout( function() {
      $('.score').text( score + " - " + (count - score));
    }, 800);
  }

  function getRandomXandY(max, min) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

});
