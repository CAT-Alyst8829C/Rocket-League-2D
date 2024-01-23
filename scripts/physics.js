//Constants
const INITIAL       = 10,
    GRAVITY       =  0,
    REBOUND_RATIO =  0.5,
    DAMPING_RATIO =  0.995,
    MAX_SPEED = 6;

//Globals
var timer, t = 0,
    objects = [],
    mX = window.innerWidth / 2, 
    mY = window.innerHeight / 2;
  
var scoreP1 = 0;
var scoreP2 = 0;
var deuce = 10;

var intervals = 5

var keyQueue = []

var gameIsInProgress = false;
var gameIsPaused = true;

function startScreen(winner) {
  const startScreen = document.getElementById('startScreen')
  const startScreenTitle = document.getElementById('startScreenTitle')
  const startButton = document.getElementById('startButton')

  startScreen.style.display = null

  if(winner !== 0) {
    startScreenTitle.textContent = `Player ${winner} won!`
    startButton.textContent = 'Play again?'
  }

  startButton.addEventListener('click', startGame)
}

function startGame() {
  const startScreen = document.getElementById('startScreen')
  const startButton = document.getElementById('startButton')

  startScreen.style.display = 'none'

  init()

  startButton.removeEventListener("click", startGame, false);
}

function init() {
  //Start the timer
  addSoccer((mX - 25), (((window.innerHeight * 0.9) / 2) - 25), 50, 50)
  addP1(((window.innerWidth / 4) - 150), ((window.innerHeight * 0.9) / 2) - 30, 150, 75)
  addP2(((window.innerWidth / 4) * 3), ((window.innerHeight * 0.9) / 2) - 30, 150, 75)
  
  window.setInterval(update_soccer, 10);
  window.setInterval(update_p1, 10);
  window.setInterval(update_p2, 10);
  window.setInterval(collisionDetection, 10);
  window.setInterval(addSpeed, 75);

  gameIsInProgress = true;
  gameIsPaused = true;

  countdown()
}

function resetGame(winner) {
  intervals += 5

  objects[0].element.remove()
  objects[1].element.remove()
  objects[2].element.remove()

  objects = []
  keyQueue = []

  document.getElementById('score1Display').firstChild.textContent = 0
  document.getElementById('score2Display').firstChild.textContent = 0

  startScreen(winner)

  gameIsInProgress = false;
}

function addSoccer(x, y, w, h){
  //Create DOM element
  element = document.createElement("div");
  element.style.left   = x+"px";
  element.style.top    = y+"px";
  element.style.width  = w+"px";
  element.style.height = h+"px";
  element.id = "soccerBall"

  document.getElementById('gameField').appendChild(element);
  //Create object
  let object = {
    element: element,
    width:  w,
    height: h,
    px: x, py: y,
    vx: 0, vy: 0,
    deg: 0
  };
  //Add object to array
  objects.push(object);
}

function addP1(x, y, w, h){
  //Create DOM element
  element = document.createElement("div");
  element.style.left   = x+"px";
  element.style.top    = y+"px";
  element.style.width  = w+"px";
  element.style.height = h+"px";
  element.id = "p1"

  document.getElementById('gameField').appendChild(element);
  //Create object
  let object = {
    element: element,
    width:  w,
    height: h,
    px: x, py: y,
    vx: 0, vy: 0,
    deg: 0
  };
  //Add object to array
  objects.push(object);
}

function addP2(x, y, w, h){
  //Create DOM element
  element = document.createElement("div");
  element.style.left   = x+"px";
  element.style.top    = y+"px";
  element.style.width  = w+"px";
  element.style.height = h+"px";
  element.id = "p2"

  document.getElementById('gameField').appendChild(element);
  //Create object
  let object = {
    element: element,
    width:  w,
    height: h,
    px: x, py: y,
    vx: -0.001, vy: 0,
    deg: 0
  };
  //Add object to array
  objects.push(object);
}

function addForce(obj, x, y) {
    //Adding movement
    if(!(Math.abs(obj.vx) >= MAX_SPEED)) {
      obj.vx += x;
    }

    if(!(Math.abs(obj.vy) >= MAX_SPEED)) {
      obj.vy += y;
    }
}

function countdown() {
  let image1 = document.getElementById('image1')
  let image2 = document.getElementById('image2')
  let image3 = document.getElementById('image3')

  image3.style.visibility = 'visible'
  image3.style.transform = 'rotate(360deg)'

  keyQueue = []

  setTimeout(() => {
    image3.style.visibility = 'hidden'

    image2.style.visibility = 'visible'
    image2.style.transform = 'rotate(360deg)'
  }, 1000)

  setTimeout(() => {
    image2.style.visibility = 'hidden'

    image1.style.visibility = 'visible'
    image1.style.transform = 'rotate(360deg)'

    objects[1].px = ((window.innerWidth / 4) - 150);
    objects[1].py = (((window.innerHeight * 0.9) / 2) - 30);

    objects[2].px = ((window.innerWidth / 4) * 3);
    objects[2].py = (((window.innerHeight * 0.9) / 2) - 30);

    objects[0].px = (mX - 25);
    objects[0].py = (((window.innerHeight * 0.9) / 2) - 25);

    objects[0].vx = 0;
    objects[0].vy = 0;

    objects[1].vx = 0;
    objects[1].vy = 0;

    objects[2].vx = -0.001;
    objects[2].vy = 0;
  }, 2000)

  setTimeout(() => {
    image1.style.visibility = 'hidden'

    gameIsPaused = false;
  }, 3000)

  image3.style.transform = null
  image2.style.transform = null
  image1.style.transform = null
}

function addSpeed() {
  if(gameIsPaused && !gameIsInProgress) return

  if (keyQueue.includes('w')) addForce(objects[1], 0, -1);
  if (keyQueue.includes('a')) addForce(objects[1], -1, 0);
  if (keyQueue.includes('s')) addForce(objects[1], 0, 1);
  if (keyQueue.includes('d')) addForce(objects[1], 1, 0);

  if (keyQueue.includes('arrowup')) addForce(objects[2], 0, -1);
  if (keyQueue.includes('arrowleft')) addForce(objects[2], -1, 0);
  if (keyQueue.includes('arrowdown')) addForce(objects[2], 0, 1);
  if (keyQueue.includes('arrowright')) addForce(objects[2], 1, 0);
}

function collisionDetection() {
  if(gameIsPaused && !gameIsInProgress) return

  let soccerBallRect = objects[0].element.getBoundingClientRect()
  let player1Rect = objects[1].element.getBoundingClientRect()
  let player2Rect = objects[2].element.getBoundingClientRect()

  let player1 = objects[1].element
  let player2 = objects[2].element

  let net_1 = document.getElementById("net1").getBoundingClientRect();
  let net_2 = document.getElementById('net2').getBoundingClientRect();

  if (isCollision(player1, player2)) {
    const overlapX = (player1Rect.width + player2Rect.width) * 0.5 - Math.abs(player1Rect.x - player2Rect.x);
    const overlapY = (player1Rect.height + player2Rect.height) * 0.5 - Math.abs(player1Rect.y - player2Rect.y);

    var car_1_vx = objects[1].vx;
    var car_1_vy = objects[1].vy;

    var car_2_vx = objects[2].vx;
    var car_2_vy = objects[2].vy;

    // Resolve overlap
    if (overlapX > overlapY) {
      if (player1Rect.x < player2Rect.x) {
        objects[1].px -= overlapX * 0.5;
        objects[2].px += overlapX * 0.5;
      } else {
        objects[1].px += overlapX * 0.5;
        objects[2].px -= overlapX * 0.5;
      }

      objects[1].vx = (car_2_vx * 0.55) - (car_1_vx * 0.5);
      objects[2].vx = (car_1_vx * 0.55) - (car_2_vx * 0.5);

      objects[1].vy = (car_2_vy * 0.55) - (car_1_vy * 0.5);
      objects[2].vy = (car_1_vy * 0.55) - (car_2_vy * 0.5);
    } else {
      if (player1Rect.y < player2Rect.y) {
        objects[1].py -= overlapY * 0.5;
        objects[2].py += overlapY * 0.5;
      } else {
        objects[1].py += overlapY * 0.5;
        objects[2].py -= overlapY * 0.5;
      }

      objects[1].vx = (car_2_vx * 0.55) - (car_1_vx * 0.5);
      objects[2].vx = (car_1_vx * 0.55) - (car_2_vx * 0.5);

      objects[1].vy = (car_2_vy * 0.55) - (car_1_vy * 0.5);
      objects[2].vy = (car_1_vy * 0.55) - (car_2_vy * 0.5);
    }
  }

  //Player to soccer ball collision
  if (player1Rect.x < soccerBallRect.x + soccerBallRect.width &&
    player1Rect.x + player1Rect.width > soccerBallRect.x &&
    player1Rect.y < soccerBallRect.y + soccerBallRect.height &&
    player1Rect.height + player1Rect.y > soccerBallRect.y
  ) {
    objects[0].vx = ((objects[1].vx * 3.75) - (objects[0].vx * 0.75));
    objects[0].vy = ((objects[1].vy * 3.75) - (objects[0].vy * 0.75));

  }

  if (player2Rect.x < soccerBallRect.x + soccerBallRect.width &&
    player2Rect.x + player2Rect.width > soccerBallRect.x &&
    player2Rect.y < soccerBallRect.y + soccerBallRect.height &&
    player2Rect.height + player2Rect.y > soccerBallRect.y
  ) {
    objects[0].vx = ((objects[2].vx * 3.75) - (objects[0].vx * 0.75));
    objects[0].vy = ((objects[2].vy * 3.75) - (objects[0].vy * 0.75));
  }

  if ((soccerBallRect.x < net_1.x + net_1.width &&
    soccerBallRect.x + soccerBallRect.width > net_1.x &&
    soccerBallRect.y < net_1.y + net_1.height &&
    soccerBallRect.height + soccerBallRect.y > net_1.y
  ) && !gameIsPaused) {
    scoreP2 += 1;

    document.getElementById('score2Display').firstChild.textContent = scoreP2
    
    gameIsPaused = true;

    objects[0].vx = 15;
    objects[1].vx = 15;
    objects[2].vx = 15;

    if (scoreP1 == (deuce - 1) && scoreP2 == (deuce - 1)) {
      deuce += 1;

      alert('Deuce!')

      countdown()
    } else if (scoreP2 == deuce)  {
      scoreP1 = 0
      scoreP2 = 0
  
      resetGame(2)
    } else {

      countdown()
    }
  }

  if ((soccerBallRect.x < net_2.x + net_2.width &&
    soccerBallRect.x + soccerBallRect.width > net_2.x &&
    soccerBallRect.y < net_2.y + net_2.height &&
    soccerBallRect.height + soccerBallRect.y > net_2.y
  ) && !gameIsPaused) {
    scoreP1 += 1;

    document.getElementById('score1Display').firstChild.textContent = scoreP1

    gameIsPaused = true;

    objects[0].vx = -15;
    objects[1].vx = -15;
    objects[2].vx = -15;
    
    if (scoreP1 == (deuce - 1) && scoreP2 == (deuce - 1)) {
      deuce += 1;

      alert('Deuce!')

      countdown()
    } else if (scoreP1 == deuce)  {
      scoreP1 = 0
      scoreP2 = 0
  
      resetGame(1)
    } else {
      countdown()
    }
  }
}

function update_soccer() {
  if(gameIsPaused && !gameIsInProgress) return

  // Apply rebound after collision
  if (objects[0].px < 0) {
    // Left
    objects[0].px = 0;
    objects[0].vx = Math.abs(objects[0].vx) * REBOUND_RATIO;
  } else if (objects[0].px + objects[0].width > window.innerWidth - 10) {
    // Right
    objects[0].px = window.innerWidth - objects[0].width - 10;
    objects[0].vx = -Math.abs(objects[0].vx) * REBOUND_RATIO;
  }
  if (objects[0].py < 0) {
    // Top
    objects[0].py = 0;
    objects[0].vy = Math.abs(objects[0].vy) * REBOUND_RATIO;
  } else if (objects[0].py + objects[0].height > window.innerHeight - 10) {
    // Bottom
    objects[0].py = window.innerHeight - objects[0].height - 10;
    objects[0].vy = -Math.abs(objects[0].vy) * REBOUND_RATIO;
  }

  //Apply damping
  objects[0].vx *= DAMPING_RATIO;
  objects[0].vy *= DAMPING_RATIO;

  //Apply gravity
  objects[0].vy += GRAVITY;

  //Update position
  objects[0].px += objects[0].vx;
  objects[0].py += objects[0].vy;
  objects[0].element.style.left = objects[0].px+"px";
  objects[0].element.style.top  = objects[0].py+"px";

  //Increment time
  t++;
}

function getRotatedRectVertices(object) {
  const objectRect = object.getBoundingClientRect();
  const angleRad = getRotationAngle(object) * (Math.PI / 180);

  const centerX = objectRect.left + objectRect.width / 2;
  const centerY = objectRect.top + objectRect.height / 2;

  const dx = objectRect.width / 2;
  const dy = objectRect.height / 2;

  const x1 = centerX + dx * Math.cos(angleRad) - dy * Math.sin(angleRad);
  const y1 = centerY + dx * Math.sin(angleRad) + dy * Math.cos(angleRad);

  const x2 = centerX - dx * Math.cos(angleRad) - dy * Math.sin(angleRad);
  const y2 = centerY + dx * Math.sin(angleRad) - dy * Math.cos(angleRad);

  const x3 = centerX - dx * Math.cos(angleRad) + dy * Math.sin(angleRad);
  const y3 = centerY - dx * Math.sin(angleRad) - dy * Math.cos(angleRad);

  const x4 = centerX + dx * Math.cos(angleRad) + dy * Math.sin(angleRad);
  const y4 = centerY - dx * Math.sin(angleRad) + dy * Math.cos(angleRad);

  return [
    { x: x1, y: y1 },
    { x: x2, y: y2 },
    { x: x3, y: y3 },
    { x: x4, y: y4 },
  ];
}

function isCollision(rect1, rect2) {
  const rect1Vertices = getRotatedRectVertices(rect1);
  const rect2Vertices = getRotatedRectVertices(rect2);

  // Check for intersection of the rectangles' vertices
  for (const vertex of rect1Vertices) {
    if (pointInsideRect(vertex.x, vertex.y, rect2Vertices)) {
      return true; // Collision detected
    }
  }

  for (const vertex of rect2Vertices) {
    if (pointInsideRect(vertex.x, vertex.y, rect1Vertices)) {
      return true; // Collision detected
    }
  }

  return false; // No collision
}

function getRotationAngle(element) {
  const style = window.getComputedStyle(element, null);
  const matrix = style.getPropertyValue('transform');
  const matrixValues = matrix.split('(')[1].split(')')[0].split(',');

  const a = matrixValues[0];
  const b = matrixValues[1];

  return Math.atan2(b, a) * (180 / Math.PI);
}

function pointInsideRect(x, y, vertices) {
  let inside = false;

  for (let i = 0, j = vertices.length - 1; i < vertices.length; j = i++) {
    const xi = vertices[i].x;
    const yi = vertices[i].y;
    const xj = vertices[j].x;
    const yj = vertices[j].y;

    const intersect =
      ((yi > y) !== (yj > y)) &&
      (x < ((xj - xi) * (y - yi)) / (yj - yi) + xi);

    if (intersect) {
      inside = !inside;
    }
  }

  return inside;
}

function update_p1(){
    if(gameIsPaused && !gameIsInProgress) return

    // Apply rebound after collision
    if (objects[1].px < 0) {
      // Left
      objects[1].px = 0;
      objects[1].vx = Math.abs(objects[1].vx) * REBOUND_RATIO;
    } else if (objects[1].px + objects[1].width > window.innerWidth - 10) {
      // Right
      objects[1].px = window.innerWidth - objects[1].width - 10;
      objects[1].vx = -Math.abs(objects[1].vx) * REBOUND_RATIO;
    }
    
    if (objects[1].py < 0) {
      // Top
      objects[1].py = 0;
      objects[1].vy = Math.abs(objects[1].vy) * REBOUND_RATIO;
    } else if (objects[1].py + objects[1].height > window.innerHeight - 10) {
      // Bottom
      objects[1].py = window.innerHeight - objects[1].height - 10;
      objects[1].vy = -Math.abs(objects[1].vy) * REBOUND_RATIO;
    }

    //Apply damping
    objects[1].vx *= 0.995;
    objects[1].vy *= 0.995;

    //Apply gravity
    objects[1].vy += GRAVITY;

    //Update position
    objects[1].px += objects[1].vx;
    objects[1].py += objects[1].vy;
    objects[1].element.style.left = objects[1].px+"px";
    objects[1].element.style.top  = objects[1].py+"px";
    
    //Update Rotation
    objects[1].deg = Math.atan2(objects[1].vy, objects[1].vx) * 180 / Math.PI
    objects[1].element.style.transform = `rotate(${objects[1].deg}deg)`

    t++;
}

function update_p2() {
  if(gameIsPaused && !gameIsInProgress) return

  // Apply rebound after collision
  if (objects[2].px < 0) {
    // Left
    objects[2].px = 0;
    objects[2].vx = Math.abs(objects[2].vx) * REBOUND_RATIO;
  } else if (objects[2].px + objects[2].width > window.innerWidth - 10) {
    // Right
    objects[2].px = window.innerWidth - objects[2].width - 10;
    objects[2].vx = -Math.abs(objects[2].vx) * REBOUND_RATIO;
  }
  if (objects[2].py < 0) {
    // Top
    objects[2].py = 0;
    objects[2].vy = Math.abs(objects[2].vy) * REBOUND_RATIO;
  } else if (objects[2].py + objects[2].height > window.innerHeight - 10) {
    // Bottom
    objects[2].py = window.innerHeight - objects[1].height - 10;
    objects[2].vy = -Math.abs(objects[2].vy) * REBOUND_RATIO;
  }

  // collisionDetection()

  //Apply damping
  objects[2].vx *= DAMPING_RATIO;
  objects[2].vy *= DAMPING_RATIO;

  //Apply gravity
  objects[2].vy += GRAVITY;

  //Update position
  objects[2].px += objects[2].vx;
  objects[2].py += objects[2].vy;
  objects[2].element.style.left = objects[2].px+"px";
  objects[2].element.style.top  = objects[2].py+"px";
  
  //Update Rotation
  objects[2].deg = Math.atan2(objects[2].vy, objects[2].vx) * 180 / Math.PI
  objects[2].element.style.transform = `rotate(${objects[2].deg}deg)`
  
  t++;
}

document.addEventListener("DOMContentLoaded", function() {
    startScreen(0)

    window.addEventListener('keydown', function(event) {
      if (gameIsPaused) return

      if ((event.key.toLowerCase() == "w" ||
        event.key.toLowerCase() == "a" ||
        event.key.toLowerCase() == "s" ||
        event.key.toLowerCase() == "d" ||
        event.key == "ArrowUp" ||
        event.key == "ArrowLeft" ||
        event.key == "ArrowDown" ||
        event.key == "ArrowRight"
      ) && keyQueue.indexOf(event.key.toLowerCase()) == -1){
        keyQueue.push(event.key.toLowerCase())
      }
    })

    window.addEventListener('keyup', function(event) {
      if (gameIsPaused) return
      
      if (event.key.toLowerCase() == "w" ||
        event.key.toLowerCase() == "a" ||
        event.key.toLowerCase() == "s" ||
        event.key.toLowerCase() == "d" ||
        event.key == "ArrowUp" ||
        event.key == "ArrowLeft" ||
        event.key == "ArrowDown" ||
        event.key == "ArrowRight"
      ) {
        keyQueue.splice(keyQueue.indexOf(event.key.toLowerCase()), 1)
      }
    })
  })