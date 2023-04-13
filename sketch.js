// Adapted from https://p5js.org/examples/interaction-snake-game.html
//
var host = "localhost:4444";
// var host = "cpsc484-04.yale.internal:8888" // this is to connect to the real time display data at hillhouse
$(document).ready(function() {
  frames.start();
  twod.start();
});

var frames = {
  socket: null,

  start: function() {
    var url = "ws://" + host + "/frames";
    frames.socket = new WebSocket(url);
    frames.socket.onmessage = function (event) {
      var command = frames.ProcessUpperbodyData(JSON.parse(event.data));
      // TODO: add a receiver function for the command; part of the game state implementation

      //if (command !== null) {
      //  sendWristCommand(command);
      //}
    }
  },

  // Takes in a frame, and returns the xyz position of the desired joint
  RetreiveJointPosition: function (playerId, jointId) { // this refers to the calling frame obj
    return {x: this.people[playerId].joints[jointId].position.x,
            y: this.people[playerId].joints[jointId].position.y,
            z: this.people[playerId].joints[jointId].position.z};
  },

  ProcessUpperbodyData: function (frame) {
    var command = null;
    // TODO: finish the no-data processing. 
    // If there's a game session running, then Pause
    // Else do nothing (Return null)
    if (frame.people.length < 1) { // no one present, or player id changed/disappeared due to reassignment (TODO)
      return command; 
    }

    // Assume single player for now. This step just extracts all the upperbody joint data. No normalization needed atm
    var pelvisPosition = frame.RetreiveJointPosition(0, 0);
    var spineNavalPosition = frame.RetreiveJointPosition(0, 1);
    var spineChestPosition = frame.RetreiveJointPosition(0, 2);
    var neckPosition = frame.RetreiveJointPosition(0, 3);
    var clavicleLeftPosition = frame.RetreiveJointPosition(0, 4);
    var shoulderLeftPosition = frame.RetreiveJointPosition(0, 5);
    var elbowLeftPosition = frame.RetreiveJointPosition(0, 6);
    var wristLeftPosition = frame.RetreiveJointPosition(0, 7);
    var handLeftPosition = frame.RetreiveJointPosition(0, 8);
    var handTipLeftPosition = frame.RetreiveJointPosition(0, 9);
    var thumbLeftPosition = frame.RetreiveJointPosition(0, 10);
    var clavicleRightPosition = frame.RetreiveJointPosition(0, 11);
    var shoulderRightPosition = frame.RetreiveJointPosition(0, 12);
    var elbowRightPosition = frame.RetreiveJointPosition(0, 13);
    var wristRightPosition = frame.RetreiveJointPosition(0, 14);
    var handRightPosition = frame.RetreiveJointPosition(0, 15);
    var handTipRightPosition = frame.RetreiveJointPosition(0, 16);
    var thumbRightPosition = frame.RetreiveJointPosition(0, 17);
    var headPosition = frame.RetreiveJointPosition(0, 26);
    var nosePosition = frame.RetreiveJointPosition(0, 27);
    var eyeLeftPosition = frame.RetreiveJointPosition(0, 28);
    var earLeftPosition = frame.RetreiveJointPosition(0, 29);
    var eyeRightPosition = frame.RetreiveJointPosition(0, 30);
    var earRightPosition = frame.RetreiveJointPosition(0, 31);

    // TODO: Implement some ways to utilize these data via helper functions and game structure coordinations
    // Idea: for each segment (pair of joints) following the humanoid skeleton structure, draw a rectangle (or two circles connected by tangents) wrapping them up.
    // then if certain % of the ball comes in contact with the shape, then output something to the gamestate, else other state.

    
    // Normalize by subtracting the root (pelvis) joint coordinates
    // This is from the example. Kept here as reference; not needed.
    /*var pelvis_x = frame.people[0].joints[0].position.x;
    var pelvis_y = frame.people[0].joints[0].position.y;
    var pelvis_z = frame.people[0].joints[0].position.z;
    var left_wrist_x = (frame.people[0].joints[7].position.x - pelvis_x) * -1;
    var left_wrist_y = (frame.people[0].joints[7].position.y - pelvis_y) * -1;
    var left_wrist_z = (frame.people[0].joints[7].position.z - pelvis_z) * -1;

    if (left_wrist_z < 100) {
      return command;
    }

    if (left_wrist_x < 200 && left_wrist_x > -200) {
      if (left_wrist_y > 500) {
        command = 73; // UP
      } else if (left_wrist_y < 100) {
        command = 75; // DOWN
      }
    } else if (left_wrist_y < 500 && left_wrist_y > 100) {
      if (left_wrist_x > 200) {
        command = 76; // RIGHT
      } else if (left_wrist_x < -200) {
        command = 74; // LEFT
      }
    }*/
    return command;
  }
};

// this function draws the player Silhoutte. Comes in handy later.
var twod = {
  socket: null,

  start: function() {
    var url = "ws://" + host + "/twod";
    twod.socket = new WebSocket(url);
    twod.socket.onmessage = function(event) {
      twod.show(JSON.parse(event.data));
    }
  },

  show: function(twod) {
    $('.twod').attr("src", 'data:image/pnjpegg;base64,'+twod.src);
  }
};


// anything below this point is related to the example given. Kept as a reference for now, will delete later!
// the snake is divided into small segments, which are drawn and edited on each 'draw' call
let numSegments = 10;
let direction = 'right';

const xStart = 0; //starting x coordinate for snake
const yStart = 250; //starting y coordinate for snake
const diff = 10;

let xCor = [];
let yCor = [];

let xFruit = 0;
let yFruit = 0;
let scoreElem;
let scoreContainer = document.getElementById('score-container');
let handContainer = document.getElementById('hand-container');

let leftArrow = document.getElementById('left-arrow');
let rightArrow = document.getElementById('right-arrow');
let upArrow = document.getElementById('up-arrow');
let downArrow = document.getElementById('down-arrow');

let startButton = document.getElementById('start-button');
startButton.addEventListener("click", () => {
  window.location.reload();
});

function setup() {
  let snakeCanvas = createCanvas(windowWidth/2, windowHeight/2);
  snakeCanvas.parent("canvas-container");
  frameRate(3);
  stroke(255);
  strokeWeight(10);
  updateFruitCoordinates();

  scoreElem = createDiv('Score = 0');
  scoreElem.parent("score-container");
  scoreElem.id = 'score';

  for (let i = 0; i < numSegments; i++) {
    xCor.push(xStart + i * diff);
    yCor.push(yStart);
  }
}

function draw() {
  background('#ff0000');
  for (let i = 0; i < numSegments - 1; i++) {
    line(xCor[i], yCor[i], xCor[i + 1], yCor[i + 1]);
    stroke('#0000ff');
  }
  updateSnakeCoordinates();
  updateHandContainer();
  checkGameStatus();
  checkForFruit();
}

/*
 The segments are updated based on the direction of the snake.
 All segments from 0 to n-1 are just copied over to 1 till n, i.e. segment 0
 gets the value of segment 1, segment 1 gets the value of segment 2, and so on,
 and this results in the movement of the snake.

 The last segment is added based on the direction in which the snake is going,
 if it's going left or right, the last segment's x coordinate is increased by a
 predefined value 'diff' than its second to last segment. And if it's going up
 or down, the segment's y coordinate is affected.
*/
function updateSnakeCoordinates() {
  for (let i = 0; i < numSegments - 1; i++) {
    xCor[i] = xCor[i + 1];
    yCor[i] = yCor[i + 1];
  }
  switch (direction) {
    case 'right':
      xCor[numSegments - 1] = xCor[numSegments - 2] + diff;
      yCor[numSegments - 1] = yCor[numSegments - 2];
      break;
    case 'up':
      xCor[numSegments - 1] = xCor[numSegments - 2];
      yCor[numSegments - 1] = yCor[numSegments - 2] - diff;
      break;
    case 'left':
      xCor[numSegments - 1] = xCor[numSegments - 2] - diff;
      yCor[numSegments - 1] = yCor[numSegments - 2];
      break;
    case 'down':
      xCor[numSegments - 1] = xCor[numSegments - 2];
      yCor[numSegments - 1] = yCor[numSegments - 2] + diff;
      break;
  }
}

function updateHandContainer() {
  // set all arrows to white
  leftArrow.className = 'left-arrow';
  upArrow.className = 'up-arrow';
  rightArrow.className = 'right-arrow';
  downArrow.className = 'down-arrow';

  switch (direction) {
    case 'right':
      rightArrow.className += ' active-right';
      break;
    case 'up':
      upArrow.className += ' active-up';
      break;
    case 'left':
      leftArrow.className += ' active-left';
      break;
    case 'down':
      downArrow.className += ' active-down';
      break;
  }
}

/*
 I always check the snake's head position xCor[xCor.length - 1] and
 yCor[yCor.length - 1] to see if it touches the game's boundaries
 or if the snake hits itself.
*/
function checkGameStatus() {
  if (
    xCor[xCor.length - 1] > width ||
    xCor[xCor.length - 1] < 0 ||
    yCor[yCor.length - 1] > height ||
    yCor[yCor.length - 1] < 0 ||
    checkSnakeCollision()
  ) {
    noLoop();
    const scoreVal = parseInt(scoreElem.html().substring(8));
    scoreElem.html('Game ended! Your score was : ' + scoreVal);
  }
}

/*
 If the snake hits itself, that means the snake head's (x,y) coordinate
 has to be the same as one of its own segment's (x,y) coordinate.
*/
function checkSnakeCollision() {
  const snakeHeadX = xCor[xCor.length - 1];
  const snakeHeadY = yCor[yCor.length - 1];
  for (let i = 0; i < xCor.length - 1; i++) {
    if (xCor[i] === snakeHeadX && yCor[i] === snakeHeadY) {
      return true;
    }
  }
}

/*
 Whenever the snake consumes a fruit, I increment the number of segments,
 and just insert the tail segment again at the start of the array (basically
 I add the last segment again at the tail, thereby extending the tail)
*/
function checkForFruit() {
  point(xFruit, yFruit);
  if (xCor[xCor.length - 1] === xFruit && yCor[yCor.length - 1] === yFruit) {
    const prevScore = parseInt(scoreElem.html().substring(8));
    scoreElem.html('Score = ' + (prevScore + 1));
    xCor.unshift(xCor[0]);
    yCor.unshift(yCor[0]);
    numSegments++;
    updateFruitCoordinates();
  }
}

function updateFruitCoordinates() {
  /*
    The complex math logic is because I wanted the point to lie
    in between 100 and width-100, and be rounded off to the nearest
    number divisible by 10, since I move the snake in multiples of 10.
  */

  xFruit = floor(random(10, (width - 100) / 10)) * 10;
  yFruit = floor(random(10, (height - 100) / 10)) * 10;
}

function sendWristCommand(command) {
  switch (command) {
    case 74:
      if (direction !== 'right') {
        direction = 'left';
      }
      break;
    case 76:
      if (direction !== 'left') {
        direction = 'right';
      }
      break;
    case 73:
      if (direction !== 'down') {
        direction = 'up';
      }
      break;
    case 75:
      if (direction !== 'up') {
        direction = 'down';
      }
      break;
  }
  console.log(direction);
}

