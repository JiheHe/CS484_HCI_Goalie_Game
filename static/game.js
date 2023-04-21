$(function(){
  const GameState = {
    RUNNING: 0, // a game session is ongoing
    PAUSED: 1, // a game session is paused
    ONMESSAGE: 2, // a game session is showing some message
    INACTIVE: 3 // a game session hasn't started
  };

  let count = 0, score = 0, timer = 60; // to-be changed to 60 or 40 or 30, or 5(for testing)
  let gameState = GameState.RUNNING; // true; // TODO: isRunning should start false. And the intro scene logic should enable it to true if a session is confirmed
  let request = null;

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
  }, 1000);

  interval2 = setInterval(function(){
    if (gameState == GameState.RUNNING){
        footballShot(); 

        setTimeout( function() {
            $('.football').css({
                transform: 'scale(0.2)',
            })
        }, 1000);

        setTimeout( function() {
            let rect1 = document.querySelector(".football").getBoundingClientRect(),
            rect2 = document.querySelector(".goalkeeperBody").getBoundingClientRect(),
            rect3 = document.querySelector(".goalkeeperHead").getBoundingClientRect(),
            rect4 = document.querySelector(".goalkeeperRightHand").getBoundingClientRect(),
            rect5 = document.querySelector(".goalkeeperLeftHand").getBoundingClientRect();
            if (checkOverlaps(rect1, [rect2, rect3, rect4, rect5])){
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
     gameState = GameState.INACTIVE;
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
     gameState = GameState.ONMESSAGE;
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


  function footballShot() {
    $('.football').css({
        left:  getRandomXandY(100, 1000), // Can hard tune since game space pixel. But % better always
        top: getRandomXandY(200, 300),  // NOTE: ball spawn Y location is restricted, since user interaction range is scaled
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
    console.log(element);
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

  ////////////////////////////////////////////////// Game data retrieval and processing ////////////////////////////////////
  //var host = "localhost:4444";
  var host = "cpsc484-04.yale.internal:8888" // this is to connect to the real time display data at hillhouse
  $(document).ready(function() {
    frames.start();
    // twod.start();
  });

  const horizontalFOV = 120 * (Math.PI / 180); // Convert to radians // given that both FOVs are 120 degrees
  const verticalFOV = 120 * (Math.PI / 180); // Convert to radians
  let canvasWidth;
  let canvasHeight;

  let inSessionPlayerID = 502; // the id of the player in session, our targetID of focus. Just a test value. TODO.

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
          if (gameState == GameState.RUNNING) {
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

    // Takes in a frame, and returns the ids of all valid users ids detected
    RetrieveBodyIDs: function (frame) {
      let playerIDs = [];
      for (let i = 0; i < frame.groups.body_ids.length; i++) {
        let idGroup = frame.groups.body_ids[i];
        for (let j = 0; j < idGroup.length; j++) {
          playerIDs.push(idGroup[j]);
        }
      }
      /*(frame.groups.body_ids).forEach(function(idGroup) { // foreach version
        idGroup.forEach(function(bodyID) {
          playerIDs.push(bodyID);
        });
      });*/
      return playerIDs;
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

    // Processes the frame data to determine the next state of the state machine
    ProcessFrameData: function (frame) {
      // console.log(frame);
      // TODO: finish the no-data processing. 
      // If there's a game session running, then Pause
      // Else do nothing (Return null)
      if (frame.people.length < 1) { // no one present
        if (gameState == GameState.RUNNING) { // if the game is alraedy running and no one is in scene, then we pause the game
          gameState = GameState.PAUSED;
        }
        return null; 
      }

      let bodyIDs = frames.RetrieveBodyIDs(frame);
      console.log(bodyIDs);

      if (gameState == GameState.RUNNING) { // if game is already running, we only care about the data of our player of focus
        for (let bodyIndex = 0; bodyIndex < bodyIDs.length; bodyIndex++) {
          let bodyID = bodyIDs[bodyIndex];
          // console.log(bodyID);
          if (bodyID === inSessionPlayerID) {
            console.log("Target found. Updating data");
            // Player in session still exists! We want this one player's data ONLY.
            return frames.ProcessUpperbodyData(frame, bodyIndex);
          }
        }
        // Logically, as soon as multiple people in the same frame, everyone gets a unique id. Even if someone leaves, those who stay have the same id,
        // and it's HIGHLY UNLIKELY that someone leaves while another person joins at the SAME FRAME to have the same id transfer edge case happening. 
        // So we'll safely ignore that case. :). Potential issue: 1s data latency...
        // This means that if inSessionPlayerID is not found among the list of present IDs, then the player has left the view. So we pause the game.
        gameState = GameState.PAUSED;
        return null;
      }
      else if (gameState == GameState.PAUSED) { // check for ANYONE that picks a choice; this is a per-user process
        console.log("GAME IS PAUSED");
        // idea:
        // User hovers right hand over certain region, check for collision for certain number of seconds. First come first serve, ranked by Z depth.
        // update inSessionPlayerID to the choice selector if choose to continue
        for (let bodyIndex = 0; bodyIndex < bodyIDs.length; bodyIndex++) {
          // Find the user with the closest z axis. 
        }
      }
      else if (gameState == GameState.INACTIVE) { // game not running yet, check all present body's data for potential game starter

      }
      else if (gameState == GameState.ONMESSAGE) { // game is displaying some message, user has no control currently, so don't process any data
        return null;
      }
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
      
      // return the post-processed data
      return data;
    }
  };

});
