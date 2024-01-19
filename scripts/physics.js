//Constants
const INITIAL       = 10,
    GRAVITY       =  0,
    REBOUND_RATIO =  0.5,
    DAMPING_RATIO =  0.995,
    MAX_SPEED = 10;

//Globals
var timer, t = 0,
    objects = [],
    mX = window.innerWidth / 2, 
    mY = window.innerHeight / 2;
  
var scoreP1 = 0;
var scoreP2 = 0;

function startScreen() {
  const startScreen = document.getElementById('startScreen')
  const startButton = document.getElementById('startButton')

  startScreen.style.display = null

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
  addSoccer(mX, mY, 50, 50)
  addP1(window.innerWidth / 4, mY, 150, 75)
  addP2((window.innerWidth / 4) * 3, mY, 150, 75)
  
  window.setInterval(update_soccer, 10);
  window.setInterval(update_p1, 10);
  window.setInterval(update_p2, 10);
  window.setInterval(collisionDetection, 10);
  window.setInterval(goalDetection, 10);
}

function resetGame() {
  window.clearInterval(1)
  window.clearInterval(2)
  window.clearInterval(3)
  window.clearInterval(4)
  window.clearInterval(5)

  objects[0].element.remove()
  objects[1].element.remove()
  objects[2].element.remove()

  objects = []

  document.getElementById('score1Display').firstChild.textContent = 0
  document.getElementById('score2Display').firstChild.textContent = 0

  startScreen()
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

function collisionDetection() {  
  let soccerBallRect = objects[0].element.getBoundingClientRect()
  let player1Rect = objects[1].element.getBoundingClientRect()
  let player2Rect = objects[2].element.getBoundingClientRect()

  //Player to player collision
  if(player1Rect.x < player2Rect.x + player2Rect.width &&
    player1Rect.x + player1Rect.width > player2Rect.x &&
    player1Rect.y < player2Rect.y + player2Rect.height &&
    player1Rect.height + player1Rect.y > player2Rect.y
  ) {
    var car_1_vx = objects[1].vx;
    var car_1_vy = objects[1].vy;

    var car_2_vx = objects[2].vx;
    var car_2_vy = objects[2].vy;

    objects[1].vx = (car_2_vx * 0.55) - (car_1_vx * 0.5);
    objects[2].vx = (car_1_vx * 0.55) - (car_2_vx * 0.5);

    objects[1].vy = (car_2_vy * 0.55) - (car_1_vy * 0.5);
    objects[2].vy = (car_1_vy * 0.55) - (car_2_vy * 0.5);

    setTimeout(300)
  }

  //Player to soccer ball collision
  if(player1Rect.x < soccerBallRect.x + soccerBallRect.width &&
    player1Rect.x + player1Rect.width > soccerBallRect.x &&
    player1Rect.y < soccerBallRect.y + soccerBallRect.height &&
    player1Rect.height + player1Rect.y > soccerBallRect.y
  ) {
    objects[0].vx = (objects[1].vx * 3.5) - (objects[0].vx * 0.75);
    objects[0].vy = (objects[1].vy * 3.5) - (objects[0].vy * 0.75);;

    // setTimeout(300)
  }

  if(player2Rect.x < soccerBallRect.x + soccerBallRect.width &&
    player2Rect.x + player2Rect.width > soccerBallRect.x &&
    player2Rect.y < soccerBallRect.y + soccerBallRect.height &&
    player2Rect.height + player2Rect.y > soccerBallRect.y
  ) {
    objects[0].vx = (objects[2].vx * 3.5) - (objects[0].vx * 0.75);
    objects[0].vy = (objects[2].vy * 3.5) - (objects[0].vy * 0.75);;

    // setTimeout(300);
  }
}


function update_soccer(){
    
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

    // collisionDetection();

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



function update_p1(){

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

    // collisionDetection()
    if(scoreP1 == 10) {
      scoreP1 = 0
      scoreP2 = 0

      resetGame();
      alert('Player 1 won! ');
    }
    //Increment time
    t++;
}

function update_p2(){ 
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

  if (scoreP2 == 1)  {
    scoreP1 = 0
    scoreP2 = 0

    resetGame()
    alert('Player 2 won! ');
  }
  //Increment time
  t++;
}

function goalDetection() {
  let net_1 = document.getElementById("net1").getBoundingClientRect();
  let net_2 = document.getElementById('net2').getBoundingClientRect();
  let soccer = objects[0].element.getBoundingClientRect();

  if(soccer.x < net_1.x + net_1.width &&
    soccer.x + soccer.width > net_1.x &&
    soccer.y < net_1.y + net_1.height &&
    soccer.height + soccer.y > net_1.y
  ) {
    alert("Player 2 Scored! ");
    scoreP2 += 1;

    document.getElementById('score2Display').firstChild.textContent = scoreP2
    
    objects[1].px = window.innerWidth / 4;
    objects[1].py = mY;

    objects[2].px = (window.innerWidth / 4) * 3;
    objects[2].py = mY;

    objects[0].px = mX;
    objects[0].py = mY;

    objects[0].px = mX;
    objects[0].py = mY;

    objects[0].vx = 0;
    objects[0].vy = 0;

    objects[1].vx = 0;
    objects[1].vy = 0;

    objects[2].vx = -0.001;
    objects[2].vy = 0;

    setTimeout(300)
  }

  if(soccer.x < net_2.x + net_2.width &&
    soccer.x + soccer.width > net_2.x &&
    soccer.y < net_2.y + net_2.height &&
    soccer.height + soccer.y > net_2.y
  ) {
    alert("Player 1 Scored! ");
    
    scoreP1 += 1;

    document.getElementById('score1Display').firstChild.textContent = scoreP1

    objects[1].px = window.innerWidth / 4;
    objects[1].py = mY;

    objects[2].px = (window.innerWidth / 4) * 3;
    objects[2].py = mY;

    objects[0].px = mX;
    objects[0].py = mY;

    objects[0].vx = 0;
    objects[0].vy = 0;

    objects[1].vx = 0;
    objects[1].vy = 0;

    objects[2].vx = -0.001;
    objects[2].vy = 0;

    setTimeout(300)
  }
}


document.addEventListener("DOMContentLoaded", function() {
    startScreen()

    //Player 1 controls
    document.addEventListener('keydown', function(event) {
      if (event.key == "w") {
        addForce(objects[1], 0, -2);
      }
    })
    document.addEventListener('keydown', function(event) {
      if (event.key == "a") {
        addForce(objects[1], -2, 0);
      }
    })

    document.addEventListener('keydown', function(event) {
      if (event.key == "s") {
        addForce(objects[1], 0, 2);
      }
    })

    document.addEventListener('keydown', function(event) {
      if (event.key == "d") {
        addForce(objects[1], 2, 0);
      }
    })

    //Player 2 controls
    document.addEventListener('keydown', function(event) {
      if (event.key == "ArrowUp") {
        addForce(objects[2], 0, -2);
      }
    })

    document.addEventListener('keydown', function(event) {
      if (event.key == "ArrowLeft") {
        addForce(objects[2], -2, 0);
      }
    })

    document.addEventListener('keydown', function(event) {
      if (event.key == "ArrowDown") {
        addForce(objects[2], 0, 2);
      }
    })

    document.addEventListener('keydown', function(event) {
      if (event.key == "ArrowRight") {
        addForce(objects[2], 2, 0);
      }
    })
  })


