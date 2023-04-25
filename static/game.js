$(function(){
  const GameState = {
    ONTUTORIAL: 0, // a game session is showing tutorial 
    RUNNING: 1, // a game session is ongoing
    PAUSED: 2, // a game session is paused
    ONMESSAGE: 3, // (unnecessary?) a game session is showing some message
    NOTINGAME: 4 // a game session hasn't started
  };
  let ballcount = 0, score = 0; //, timer = 60; // to-be changed to 60 or 40 or 30, or 5(for testing)
  let gameState = GameState.NOTINGAME;
  let request = null;

  let popup = document.querySelector('.popup');

  // Test only; disable later
  let popupBtn = document.getElementById("mockdata");
  popupBtn.onclick = function(){introCountDownToStart();};

  function introCountDownToStart() {
    gameState = GameState.ONMESSAGE;
    popup.style.display = "block";
    const readytime = 5;
    let count = readytime;
    let introinterval = setInterval(function() {
        count--;
        document.querySelector('.timer-instruction').innerHTML = "Game starts in";
        document.querySelector('.timer').innerHTML = count + " s";
        if (count <= 0) {
          clearInterval(introinterval);
          popup.style.display = "none";
          $('.intropage-container').css("display", "none");
          $('.gamepage-container').css("display", "block");
          gameState = GameState.ONTUTORIAL;
          playGame();
        }
    }, 1000);
  }


  function showTutorial(){
    let reminder = document.querySelector('.tutorial-reminder');
    if (gameState === GameState.ONTUTORIAL) {reminder.style.display = "block"};

     const readtime = 5;
     let count = readtime;
     let tutorialinterval = setInterval(function() {
        count--;
        document.querySelector('.tutorial-header').innerHTML = "Try to use your upper body to block the ball!";
        document.querySelector('.tutorial-instruction').innerHTML = "If you wanna leave the game, just leave the screen :)";
        document.querySelector('.tutorial-timer').innerHTML = count + " s";
        if (count <= 0) {
            clearInterval(tutorialinterval);
            reminder.style.display = "none";
            gameState = GameState.RUNNING;
        }
     }, 1000);
  }

  function playGame(){
    showTutorial();
    // window.addEventListener("mousemove", (e) =>{
    //   gsap.to(".goalkeeper", {
    //       duration: 0.4,
    //       // x: e.pageX - 750,
    //       // y: e.pageY - 200,
    //       x: e.pageX - 750,
    //       y: e.pageY - 800,
    //   });
    // });

    var timeLeft = 59;
    var current_time = document.getElementById('timer');
    var current_level = document.getElementById('level');

    interval1 = setInterval(function(){
      // console.log("reached interval 1 -- gameState: " + gameState);
      if (gameState === GameState.ONTUTORIAL) {
        if (timeLeft < 10){
          current_time.innerHTML = '00 : 0' + timeLeft;
        }else{
          current_time.innerHTML = '00 : ' + timeLeft;
        }
      }
      if (gameState === GameState.RUNNING){
        /*$('.curtime').text(timer--);
        if (timer == 0){
            endGame();
        }*/
        if (timeLeft == -1) { // Naheem's timer integrated
          clearTimeout(interval1);
          current_time.innerHTML = "TIME'S UP";
          endGame();
        } else {
            if (timeLeft < 10) {
                current_time.classList.add("timer2");
                current_time.innerHTML = '00 : 0' + timeLeft;
                timeLeft--;
            } else {
                 current_time.innerHTML = '00 : ' + timeLeft;
                   timeLeft--;
            }
        }
      }
    }, 1000);
  
    interval2 = setInterval(function(){
      if (gameState === GameState.RUNNING || gameState === GameState.ONTUTORIAL){
          footballShot(); 
  
          setTimeout( function() {
              $('.football').css({
                  transform: 'scale(0.2)',
              })
          }, 1000);
  
          setTimeout( function() {
              let rect1 = document.querySelector(".football").getBoundingClientRect(),
              // rect2 = document.querySelector(".goalkeeper").getBoundingClientRect();
              rect2 = document.querySelector(".goalkeeperBody").getBoundingClientRect(),
              rect3 = document.querySelector(".goalkeeperHead").getBoundingClientRect(),
              rect4 = document.querySelector(".goalkeeperRightHand").getBoundingClientRect(),
              rect5 = document.querySelector(".goalkeeperLeftHand").getBoundingClientRect();
              // if (checkOverlap(rect1, rect2)){
              if (checkOverlaps(rect1, [rect2, rect3, rect4, rect5])){
                score += 1;
                if (score == 5){
                    reminderOfLevelUp();
                }
              } 
              editScore();
              $('.football').css("visibility", "hidden");
  
              // Naheem's level
              if (score < 5) {
                  current_level.classList.add("level1");
                  current_level.innerHTML = "Easy";
                  // difficulty increased up there under reminderOfLeveUp()
              } else {
                  if (score < 10) {
                      current_level.classList.add("level2");
                      current_level.innerHTML = "Medium";
                      // increase difficulty
                  } else {
                      current_level.classList.add("level3");
                      current_level.innerHTML = "Hard";
                      // increase difficulty
                  }
              }
          }, 3000); // originally 2600
      } 
  
    }, 6000); // originally, 3000, 3800
  }

  function footballShot() {
    $('.football').css({
        left:  getRandomXandY(200, 1400),
        top: getRandomXandY(90, 450),
        transform: 'scale(1)'
    })

    setTimeout( function() {
        $('.football').css("visibility", "visible");
    }, 1000);

    ballcount += 1;
  }

  function pauseGame(){
    // gameState = GameState.PAUSED; // for now!!!
    gameState = GameState.NOTINGAME;
    let reminder = document.querySelector('.pause-reminder');
    reminder.style.display = "block";

    // for now!!!!
    clearInterval(interval1);
    clearInterval(interval2);

     const readtime = 7;
     let count = readtime;
     let pauseinterval = setInterval(function() {
        count--;
        document.querySelector('.pause-instruction').innerHTML = "Seems that you left the game! It will automatically end in";
        document.querySelector('.pause-timer').innerHTML = count + " s";
        if (count <= 0) {
            clearInterval(pauseinterval);
            reminder.style.display = "none";
            let url = '/';
            if (request != null)
                request.abort();
            request = $.ajax({
                type: 'GET',
                url: url
            });
            window.location.replace(url);
            location.reload();
        }
     }, 1000);
  }

  function endGame(){
     gameState = GameState.NOTINGAME;
     clearInterval(interval1);
     clearInterval(interval2);

     let reminder = document.querySelector('.timeup-reminder');
     reminder.style.display = "block";

     const readtime = 5;
     let count = readtime;
     let endinterval = setInterval(function() {
        count--;
        document.querySelector('.timeup-instruction').innerHTML = "Time's up! Let's go check your performance :D";
        document.querySelector('.timeup-timer').innerHTML = count + " s";
        if (count <= 0) {
            clearInterval(endinterval);
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
     gameState = GameState.ONMESSAGE; // double check!
     let reminder = document.querySelector('.levelup-reminder');
     reminder.style.display = "block";

     const readtime = 5;
     let count = readtime;
     let levelupinterval = setInterval(function() {
        count--;
        document.querySelector('.levelup-instruction').innerHTML = "You brilliantly saved 5 balls. <br/> Now let's try faster balls!";
        document.querySelector('.levelup-timer').innerHTML = count + " s";
        if (count <= 0) {
            clearInterval(levelupinterval);
            reminder.style.display = "none";
            $('.football').css("transition", "1.2s");
            gameState = GameState.RUNNING;
        }
     }, 1000);
  }

  function checkOverlaps(rect1, rects) {
    return atLeastARectOverlaps = rects.some(rect => checkOverlap(rect1, rect));
  }

  function checkOverlap(rect1, rect2){
     return res = !(rect1.right < rect2.left || 
        rect1.left > rect2.right || 
        rect1.bottom < rect2.top || 
        rect1.top > rect2.bottom);
  }


  function editScore(){
    // setTimeout( function() {
    //   $('.score').text( score + " - " + (ballcount - score));
    // }, 800); // change to 1600??
    $('.score').text( score + " - " + (ballcount - score));
  }

  function getRandomXandY(max, min) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  /* ------------- for the interaction with Display ------------- */
  function updateGoaliePosition(goalieBodyPart, partPosition, partOffset, partRotation = null) {
    if (partPosition !== null) {
      // console.log("Goalie position is: x = " + partPosition.x + " y = " + partPosition.y);
      let rect = document.querySelector(goalieBodyPart).getBoundingClientRect(); // need to center it. Image 0 coord is at bottom left, need to offset.
      /*let rotationDegrees = calculatePartRotation(partRotation, // for memory
        goalieBodyPart == ".goalkeeperLeftHand" ? angleHistoryLeft 
          : goalieBodyPart == ".goalkeeperRightHand" ? angleHistoryRight : null,
          goalieBodyPart); // check rotation*/
      let rotationDegrees = calculatePartRotation(partRotation, goalieBodyPart);
      rotationDegrees = rotationDegrees == null ? 0 : rotationDegrees;
      gsap.to(goalieBodyPart, {
          duration: 0.3,
          x: partPosition.x - rect.width/2 + partOffset.x,  // center first, then apply the offset for visual appeal
          y: partPosition.y - rect.height/2 + partOffset.y,
          rotation: rotationDegrees
      });
    }
  }

  // Don't think the smoothing version is necessary once I got parameters right... will keep as memory :3
  /*const smoothingFactor = 1; // Adjust this value to control the level of smoothing. Trade off between responding speed vs flucutation. Also a tuning parameter
  let angleHistoryLeft = [];
  let angleHistoryRight = [];
  function calculatePartRotation(partRotation, angleHistory, goalieBodyPart) {
    if (partRotation !== null) {
      const rotationDegrees = partRotation.yaw * (180 / Math.PI);
      angleHistory.push(rotationDegrees);
      if (angleHistory.length > smoothingFactor) {
        angleHistory.shift();
      }
      const averageRotation = angleHistory.reduce((a, b) => a + b, 0) / angleHistory.length;
      
      if (goalieBodyPart == ".goalkeeperLeftHand") return (-averageRotation + 90);
      else if (goalieBodyPart == ".goalkeeperRightHand") return (-averageRotation - 90);
    }
    return null;
  }*/

  function calculatePartRotation(partRotation, goalieBodyPart) {
    if (partRotation !== null) {
      const rotationDegrees = partRotation.yaw * (180 / Math.PI); // so glad yaw is the right one... did some playing around
      
      if (goalieBodyPart == ".goalkeeperLeftHand") return (-rotationDegrees + 90);
      else if (goalieBodyPart == ".goalkeeperRightHand") return (-rotationDegrees - 90);
    }
    return null;
  }

  function getElementSize(elementId) {
    const element = document.getElementById(elementId);
    // console.log(element);
    const width = element.offsetWidth;
    const height = element.offsetHeight;
  
    return { width, height };
  }

  function quaternionToEuler(q) {
    const { w, x, y, z } = q;
  
    // Calculate roll, pitch, yaw (in radians)
    const sinr_cosp = 2 * (w * x + y * z);
    const cosr_cosp = 1 - 2 * (x * x + y * y);
    const roll = Math.atan2(sinr_cosp, cosr_cosp);
  
    const sinp = 2 * (w * y - z * x);
    let pitch;
    if (Math.abs(sinp) >= 1)
      pitch = Math.sign(sinp) * Math.PI / 2;
    else
      pitch = Math.asin(sinp);
  
    const siny_cosp = 2 * (w * z + x * y);
    const cosy_cosp = 1 - 2 * (y * y + z * z);
    const yaw = Math.atan2(siny_cosp, cosy_cosp);
  
    return { roll, pitch, yaw };
  }

  /* ------------- Game Data Retrieval and Processing ------------- */

  var host = "cpsc484-04.yale.internal:8888" // to connect to the real time display data at hillhouse
  $(document).ready(function() {
    frames.start();
    // console.log("I'm executed" + (new Date()).getSeconds()); // TODO: delete later
    // twod.start();
  });

  const horizontalFOV = 120 * (Math.PI / 180); // Convert to radians // given that both FOVs are 120 degrees
  const verticalFOV = 120 * (Math.PI / 180); // Convert to radians
  let canvasWidth;
  let canvasHeight;
  let inSessionPlayerID = 12; // the id of the player in session, our targetID of focus. Just a test value. TODO.

  const confirmationWaitTime = 3;
  let timeAnchor = -1;
  let confirmerID = -1;

  var frames = {
    socket: null,

    start: function() { // only called once, for initializations
      let interactiveRangeSize = getElementSize("interactiveRangeBoundingbox");
      const scaleFactor = 1.6; // for how fast user's "speed" is
      canvasWidth = interactiveRangeSize.width * scaleFactor; // In pixels
      canvasHeight = interactiveRangeSize.height * scaleFactor; // In pixels

      var url = "ws://" + host + "/frames";
      frames.socket = new WebSocket(url);
      frames.socket.onmessage = function (event) {
        let processedData = frames.ProcessFrameData(JSON.parse(event.data)); // this function also takes care of state machine transition
        if (processedData !== null) { // time for classification of data type
          if (gameState === GameState.RUNNING) {
          // if (gameState == GameState.RUNNING) {
            // If a game session is running already, we know the data given will be that of a single goalie/player :D
            // So simply triggering position update functions for the current goalie
            var goaliePositionData = processedData;
            updateGoaliePosition(".goalkeeperBody", goaliePositionData.goalieBodyCenterPosition, {x:0, y:0});   // won't be affected by device scaling
            updateGoaliePosition(".goalkeeperHead", goaliePositionData.goalieHeadCenterPosition, {x:0, y:-5}); // can do this because will be relative to game space
            updateGoaliePosition(".goalkeeperLeftHand", goaliePositionData.goalieLeftHandCenterPosition, {x:0, y:0}, goaliePositionData.goalieLeftHandCenterRotation);
            updateGoaliePosition(".goalkeeperRightHand", goaliePositionData.goalieRightHandCenterPosition, {x:0, y:0}, goaliePositionData.goalieRightHandCenterRotation);
          }
          // Are the else if statements even necessary if we are already doing the state machine below? IDK we'll see. Finish bottom part first to see what data can be returned.
          else {
            
          }
        }
        // else Null data, useless, we ignore. DO NOTHING.
      }
    },

    // Takes in a frame, and returns the ids of all valid users ids detected
    RetrieveBodyIDs: function (frame) {
      let playerIDs = [];
      for (let i = 0; i < frame.people.length; i++) {
        let person = frame.people[i];
        playerIDs.push(person.body_id);
      }
      /*for (let i = 0; i < frame.groups.body_ids.length; i++) { // nvm don't grab the ordering from group. Grab from people. Orderings change!
        let idGroup = frame.groups.body_ids[i];
        for (let j = 0; j < idGroup.length; j++) {
          playerIDs.push(idGroup[j]);
        }
      }*/ 
      /*(frame.groups.body_ids).forEach(function(idGroup) { // foreach version
        idGroup.forEach(function(bodyID) {
          playerIDs.push(bodyID);
        });
      });*/
      return playerIDs;
    },

    // Processes the frame data to determine the next state of the state machine
    ProcessFrameData: function (frame) {
      // console.log(frame);
      // TODO: finish the no-data processing. 
      // If there's a game session running, then Pause
      // Else do nothing (Return null)
      if (frame.people.length < 1) { // no one present
        /*
        1) at Intro Page
           --- do nothing  
        2) at Game Page
           2.1) normal game process
                ---  (user want to leave early) call leaveEarly function
           2.2) window event
                2.2.1) Level up / Time's up
                       --- do nothing
                2.2.2) Leave Early Window
                       --- Finish the Game
        */
        // Case 2
        // if (gameState == GameState.RUNNING) { // if the game is alraedy running and no one is in scene, then we pause the game
        //   gameState = GameState.PAUSED;
        //   pauseGame();
        // }
        if (gameState === GameState.RUNNING) { // if the game is alraedy running and no one is in scene, then we pause the game
          pauseGame(); // uncomment me please!
        }
        confirmerID = -1; // no confirmer anyway
        document.getElementById("mockdata").style.opacity = 1;
        // Case 1
        return null; 
      }

      /*
        1) at Intro Page
           --- start the game 
        2) at Game Page
           2.1) normal game process
                ---  update user position info
           2.2) window event
                2.2.1) Level up / Time's up
                       --- do nothing
                2.2.2) Leave Early Window (tricky, what if there's other people??????)
                       --- Resume the Game
      */
      let bodyIDs = frames.RetrieveBodyIDs(frame); // now bodyIDs are retrieved with respect to the input people array indexing
      // console.log(bodyIDs);

      if (gameState === GameState.RUNNING) { // if game is already running, we only care about the data of our player of focus
        for (let bodyIndex = 0; bodyIndex < bodyIDs.length; bodyIndex++) {
          let bodyID = bodyIDs[bodyIndex];
          // console.log(bodyID);
          if (bodyID === inSessionPlayerID) {
            // console.log("Target found. at index " + bodyIndex + ". Updating data");
            // Player in session still exists! We want this one player's data ONLY.
            return frames.ProcessUpperbodyData(frame, bodyIndex);
          }
        }
        // Logically, as soon as multiple people in the same frame, everyone gets a unique id. Even if someone leaves, those who stay have the same id,
        // and it's HIGHLY UNLIKELY that someone leaves while another person joins at the SAME FRAME to have the same id transfer edge case happening. 
        // So we'll safely ignore that case. :). Potential issue: 1s data latency...
        // This means that if inSessionPlayerID is not found among the list of present IDs, then the player has left the view. So we pause the game.
        // gameState = GameState.PAUSED; // this line is included in pauseGame()
        pauseGame(); // uncomment me please
        return null;
      }
      else if (gameState === GameState.NOTINGAME){ // check for ANYONE that picks a choice; this is a per-user process
        // idea:
        // User hovers right hand over certain region, check for collision for certain number of seconds. First come first serve, ranked by Z depth.
        // update inSessionPlayerID to the choice selector if choose to continue
        let closestBodyData = null;
        let smallestZDepth = Infinity;
        // Find the user with the closest z axis (smallest number);
        for (let bodyIndex = 0; bodyIndex < bodyIDs.length; bodyIndex++) {
          let bodyData = frames.ProcessUpperbodyData(frame, bodyIndex);
          if (bodyData.goalieRightHandCenterPosition != null) { // someone's showing their right hand ;D
            let rightHandZDepth = bodyData.goalieRightHandCenterPosition.z;
            if (rightHandZDepth < smallestZDepth) {
              smallestZDepth = rightHandZDepth;
              closestBodyData = [ bodyData, bodyIDs[bodyIndex] ]; // stores calculated upperbody data and user id
            }
          }
        }
        // Update right hand data to it
        if (closestBodyData != null && closestBodyData[0].goalieLeftHandCenterPosition != null) {
          updateGoaliePosition(".goalkeeperLeftHand", closestBodyData[0].goalieLeftHandCenterPosition, {x:0, y:0}, closestBodyData[0].goalieLeftHandCenterRotation)
          // If goalie hand is in Option position, then start count down. First come first serve lock (i.e. first user that does this gets to retain ownership until leaving option)
          // probably use a boolean above.
          // quick start code below without considering timer and ownership yet
          let rect1 = document.getElementById("mockdata").getBoundingClientRect(),
              rect5 = document.querySelector(".goalkeeperLeftHand").getBoundingClientRect();
          if (checkOverlap(rect1, rect5)){ // assume there's people present rn
            if (confirmerID < 0) { // if the confirmation timer hasn't start yet
              // start!
              confirmerID = closestBodyData[1];
              timeAnchor = Date.now();
            }
            else { // confirmerID exists
              if (confirmerID != closestBodyData[1]) { // change of person, but still in contact
                confirmerID = closestBodyData[1];
                // keep the timer running!
              }
              // now update the time so far
              let timeElapsed = (Date.now() - timeAnchor) / 1000; // in seconds
              let timeDiffNow = confirmationWaitTime - timeElapsed;
              let transparencyPercentage = timeDiffNow / confirmationWaitTime;
              document.getElementById("mockdata").style.opacity = transparencyPercentage;
              if (timeDiffNow <= 0) { // go into the game!
                // Set the current user in session to the closest person
                inSessionPlayerID = confirmerID;
                confirmerID = -1; // resets
                introCountDownToStart();
              }
            }
          }
          else { // no overlap
            confirmerID = -1; 
            document.getElementById("mockdata").style.opacity = 1;
          }
        }
      }
      else if (gameState == GameState.PAUSED) { // game not running yet, check all present body's data for potential game starter

      }
      else if (gameState == GameState.ONMESSAGE) { // game is displaying some message, user has no control currently, so don't process any data
        return null;
      }
    },


    // Takes in a frame, and returns the xyz position of the desired joint
    RetreiveJointPosition: function (frame, playerId, jointId) { // this refers to the calling frame obj
      return {x: frame.people[playerId].joints[jointId].position.x,
              y: frame.people[playerId].joints[jointId].position.y,
              z: frame.people[playerId].joints[jointId].position.z};
    },

    // Takes in a frame, and returns the Euler rotation of the desired joint
    RetrieveJointOrientation: function (frame, playerId, jointId) { // return value in Euler
      return quaternionToEuler({w: frame.people[playerId].joints[jointId].orientation.w,
                                x: frame.people[playerId].joints[jointId].orientation.x,
                                y: frame.people[playerId].joints[jointId].orientation.y,
                                z: frame.people[playerId].joints[jointId].orientation.z});
    },

    // Takes in a frame, and returns the sensor data validity of the desired joint
    RetrieveJointPosValidity: function (frame, playerId, jointId) { 
      return frame.people[playerId].joints[jointId].valid;
    },

    // Takes in a frame, and returns the sensor data confidence of the desired joint
    RetrieveJointPosConfidence: function (frame, playerId, jointId) { 
      return frame.people[playerId].joints[jointId].confidence;
    },


    MapKinectPositionToCanvas(kinectPosition) {
      const userX = kinectPosition.x * -1; // *-1 because the x axis is flipped for kinect
      const userY = kinectPosition.y;
      const userZ = kinectPosition.z;

      const halfWidth = Math.tan(horizontalFOV / 2) * userZ;
      const halfHeight = Math.tan(verticalFOV / 2) * userZ;
    
      const normalizedX = (userX + halfWidth) / (2 * halfWidth);
      const normalizedY = (userY + halfHeight) / (2 * halfHeight);

      const canvasX = normalizedX * canvasWidth - canvasWidth / 2; // we can map x 1 to 1, so center it ;D
      const canvasY = normalizedY * canvasHeight - canvasHeight / 3 // not diving by 2 because we can't map y 1 to 1 due to display height diff; need some offsets. TUNABLE
    
      return { x: canvasX, y: canvasY, z: userZ }; // X and Y normalized, Z not normalized
    },


    // Converts user's upperbody data in Kinetic into the game space coord, as if he's a goalie
    ProcessUpperbodyData: function (frame, bodyIndex) { // bodyIndex is the index of body in array, not necessarily the ID! My bad earlier for using id interchangeably...
      // Assume single player for now. This step just extracts all the user raw upperbody joint data. No normalization needed atm
      // var pelvisPosition = frames.RetreiveJointPosition(frame, 0, 0);
      var spineNavalPosition = frames.RetreiveJointPosition(frame, bodyIndex, 1); // used for spawning body torso
      var spineNavalPosValidity = frames.RetrieveJointPosValidity(frame, bodyIndex, 1);
      var spineChestPosition = frames.RetreiveJointPosition(frame, bodyIndex, 2); // used for spawning body torso (a weighted avg between the two)
      var spineChestPosValidity = frames.RetrieveJointPosValidity(frame, bodyIndex, 2);
      //var neckPosition = frames.RetreiveJointPosition(frame, 0, 3);
      //var clavicleLeftPosition = frames.RetreiveJointPosition(frame, 0, 4);
      //var shoulderLeftPosition = frames.RetreiveJointPosition(frame, 0, 5);
      //var elbowLeftPosition = frames.RetreiveJointPosition(frame, 0, 6);
      //var wristLeftPosition = frames.RetreiveJointPosition(frame, 0, 7);
      var handLeftPosition = frames.RetreiveJointPosition(frame, bodyIndex, 8); // used for spawning left hand (or goalie's right hand)
      var handLeftRotation = frames.RetrieveJointOrientation(frame, bodyIndex, 8);
      var handLeftPosValidity = frames.RetrieveJointPosValidity(frame, bodyIndex, 8);
      //var handTipLeftPosition = frames.RetreiveJointPosition(frame, 0, 9);
      //var thumbLeftPosition = frames.RetreiveJointPosition(frame, 0, 10);
      //var clavicleRightPosition = frames.RetreiveJointPosition(frame, 0, 11);
      //var shoulderRightPosition = frames.RetreiveJointPosition(frame, 0, 12);
      //var elbowRightPosition = frames.RetreiveJointPosition(frame, 0, 13);
      //var wristRightPosition = frames.RetreiveJointPosition(frame, 0, 14);
      var handRightPosition = frames.RetreiveJointPosition(frame, bodyIndex, 15); // used for spawning right hand (or goalie's left hand)
      // console.log(handRightPosition);
      var handRightRotation = frames.RetrieveJointOrientation(frame, bodyIndex, 15);
      var handRightPosValidity = frames.RetrieveJointPosValidity(frame, bodyIndex, 15);
      //var handTipRightPosition = frames.RetreiveJointPosition(frame, 0, 16);
      //var thumbRightPosition = frames.RetreiveJointPosition(frame, 0, 17);
      //var headPosition = frames.RetreiveJointPosition(frame, 0, 26);
      //var nosePosition = frames.RetreiveJointPosition(frame, 0, 27); 
      var eyeLeftPosition = frames.RetreiveJointPosition(frame, bodyIndex, 28); // used for spawning head
      var eyeLeftPosValidity = frames.RetrieveJointPosValidity(frame, bodyIndex, 28);
      //var earLeftPosition = frames.RetreiveJointPosition(frame, 0, 29);
      var eyeRightPosition = frames.RetreiveJointPosition(frame, bodyIndex, 30); // used for spawning head
      var eyeRightPosValidity = frames.RetrieveJointPosValidity(frame, bodyIndex, 30);
      //var earRightPosition = frames.RetreiveJointPosition(frame, 0, 31);

      // post-process the data so it becomes viable in game. TODO: fine tune weights and certain ratios to transform from raw data to game space data
      // Could add in more positions for interpolation if needed
      // positions are relative to the goalie's view from the goal, inverse from user's
      var alpha = 0.5; // weight parameter.
      var goalieBodyCenterPosition = (spineNavalPosValidity && spineChestPosValidity) ? 
                                     frames.MapKinectPositionToCanvas({x: alpha * spineNavalPosition.x + (1-alpha) * spineChestPosition.x,
                                                                       y: alpha * spineNavalPosition.y + (1-alpha) * spineChestPosition.y,
                                                                       z: alpha * spineNavalPosition.z + (1-alpha) * spineChestPosition.z})
                                     : null;
      var goalieLeftHandCenterPosition = handRightPosValidity ? frames.MapKinectPositionToCanvas(handRightPosition) : null;
      var goalieLeftHandCenterRotation = handRightPosValidity ? handRightRotation : null;
      var goalieRightHandCenterPosition = handLeftPosValidity ? frames.MapKinectPositionToCanvas(handLeftPosition) : null;
      var goalieRightHandCenterRotation = handLeftPosValidity ? handLeftRotation : null;
      var goalieHeadCenterPosition = (eyeLeftPosValidity && eyeRightPosValidity) ? 
                                     frames.MapKinectPositionToCanvas({x: alpha * eyeLeftPosition.x + (1-alpha) * eyeRightPosition.x,
                                                                       y: alpha * eyeLeftPosition.y + (1-alpha) * eyeRightPosition.y,
                                                                       z: alpha * eyeLeftPosition.z + (1-alpha) * eyeRightPosition.z})
                                      : null;
      let data = {goalieHeadCenterPosition, goalieLeftHandCenterPosition, goalieRightHandCenterPosition, goalieBodyCenterPosition,
        goalieLeftHandCenterRotation, goalieRightHandCenterRotation};
      // console.log(goalieBodyCenterPosition.z);
      
      // return the post-processed data
      return data;
    }
  };

});

