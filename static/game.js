$(function(){

  let count = 0, score = 0, timer = 60; // to-be changed to 60 or 40 or 30, or 5(for testing)
  let isRunning = true;
  let request = null;
  let goaliePosition = null;

  // instead of listening to mousemove, listen to change in player position
  /*window.addEventListener("mousemove", (e) =>{
    gsap.to(".goalkeeper", {
        duration: 0.4,
        x: e.pageX - 750,
        y: e.pageY - 200,
    });
  });*/

  interval1 = setInterval(function(){
    $('.curtime').text(timer--);
    if (timer == 0){
        endGame();
    }
    if (goaliePosition !== null) {
      let headPosition = goaliePosition.goalieHeadCenterPosition;
      gsap.to(".goalkeeper", {
          duration: 0.4,
          x: headPosition.x,
          y: headPosition.y,
      });
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

  ////////////////////////////////////////////////// Game data retrieval and processing ////////////////////////////////////
  //var host = "localhost:4444";
  var host = "cpsc484-04.yale.internal:8888" // this is to connect to the real time display data at hillhouse
  $(document).ready(function() {
    frames.start();
  });

  var frames = {
    socket: null,

    start: function() {
      var url = "ws://" + host + "/frames";
      frames.socket = new WebSocket(url);
      frames.socket.onmessage = function (event) {
        var goaliePositionData = frames.ProcessUpperbodyData(JSON.parse(event.data)); // separate function just in case for future pre processing
        // TODO: add a receiver function for the command; part of the game state implementation
        if (goaliePositionData !== null) {
          // feed these data into game.js by simply triggering position update function in game.js; no normalization atm
          // If game is running already
          goaliePosition = goaliePositionData;
          // UpdateObjectPosition (to be implemented in game state)
        }
        else if (goaliePositionData === null) { 
          // TODO: further classification with special codes. I.e. if user left (lack of data), id switch, or just nothing happens.
          // data can be returned with special codes. Also see game state
          // If game state is running, then pause
          // Else do nothing
        }
      }
    },

    // Takes in a frame, and returns the xyz position of the desired joint
    RetreiveJointPosition: function (playerId, jointId) { // this refers to the calling frame obj
      return {x: this.people[playerId].joints[jointId].position.x,
              y: this.people[playerId].joints[jointId].position.y,
              z: this.people[playerId].joints[jointId].position.z};
    },

    ProcessUpperbodyData: function (frame) {
      var data = null;
      // TODO: finish the no-data processing. 
      // If there's a game session running, then Pause
      // Else do nothing (Return null)
      if (frame.people.length < 1) { // no one present, or player id changed/disappeared due to reassignment (TODO)
        return data; 
      }

      // Assume single player for now. This step just extracts all the user raw upperbody joint data. No normalization needed atm
      var pelvisPosition = frame.RetreiveJointPosition(0, 0);
      var spineNavalPosition = frame.RetreiveJointPosition(0, 1); // used for spawning body torso
      var spineChestPosition = frame.RetreiveJointPosition(0, 2); // used for spawning body torso (a weighted avg between the two)
      var neckPosition = frame.RetreiveJointPosition(0, 3);
      var clavicleLeftPosition = frame.RetreiveJointPosition(0, 4);
      var shoulderLeftPosition = frame.RetreiveJointPosition(0, 5);
      var elbowLeftPosition = frame.RetreiveJointPosition(0, 6);
      var wristLeftPosition = frame.RetreiveJointPosition(0, 7);
      var handLeftPosition = frame.RetreiveJointPosition(0, 8); // used for spawning left hand (or goalie's right hand)
      var handTipLeftPosition = frame.RetreiveJointPosition(0, 9);
      var thumbLeftPosition = frame.RetreiveJointPosition(0, 10);
      var clavicleRightPosition = frame.RetreiveJointPosition(0, 11);
      var shoulderRightPosition = frame.RetreiveJointPosition(0, 12);
      var elbowRightPosition = frame.RetreiveJointPosition(0, 13);
      var wristRightPosition = frame.RetreiveJointPosition(0, 14);
      var handRightPosition = frame.RetreiveJointPosition(0, 15); // used for spawning right hand (or goalie's left hand)
      var handTipRightPosition = frame.RetreiveJointPosition(0, 16);
      var thumbRightPosition = frame.RetreiveJointPosition(0, 17);
      var headPosition = frame.RetreiveJointPosition(0, 26);
      var nosePosition = frame.RetreiveJointPosition(0, 27); // used for spawning head
      var eyeLeftPosition = frame.RetreiveJointPosition(0, 28);
      var earLeftPosition = frame.RetreiveJointPosition(0, 29);
      var eyeRightPosition = frame.RetreiveJointPosition(0, 30);
      var earRightPosition = frame.RetreiveJointPosition(0, 31);

      // post-process the data so it becomes viable in game. TODO: fine tune weights and certain ratios to transform from raw data to game space data
      // Could add in more positions for interpolation if needed
      // positions are relative to the goalie's view from the goal, inverse from user's
      var alpha = 0.5; // weight parameter.
      var goalieBodyCenterPosition = {x: alpha * spineNavalPosition.x + (1-alpha) * spineChestPosition.x,
                                      y: alpha * spineNavalPosition.y + (1-alpha) * spineChestPosition.y,
                                      z: alpha * spineNavalPosition.z + (1-alpha) * spineChestPosition.z};
      var goalieLeftHandCenterPosition = handRightPosition;
      var goalieRightHandCenterPosition = handLeftPosition;
      var goalieHeadCenterPosition = nosePosition;
      data = {goalieHeadCenterPosition, goalieLeftHandCenterPosition, goalieRightHandCenterPosition, goalieBodyCenterPosition};
      
      // return the post-processed data
      return data;
    }
  };

});
