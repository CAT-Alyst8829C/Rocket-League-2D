//Constants
const INITIAL       = 10,
    GRAVITY       =  0,
    REBOUND_RATIO =  0.5,
    DAMPING_RATIO =  0.995;

//Globals
var timer, t = 0,
    objects = [],
    mX = window.innerWidth / 2, 
    mY = window.innerHeight / 2;

function init(){
  //Start the timer
  addSoccer(mX, mY, 50, 50)
  addP1(window.innerWidth / 4, mY, 100, 75)
  addP2((window.innerWidth / 4) * 3, mY, 100, 75)
  
  timer = window.setInterval(update_soccer, 10);
  timer_2 = window.setInterval(update_p1, 10);
  timer_3 = window.setInterval(update_p2, 10);
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
    vx: 0, vy: 0,
    deg: 0
  };
  //Add object to array
  objects.push(object);
}

function addForce(obj, x, y){
    obj.vx += x;
    obj.vy += y;
}

function collisionDetection() {
   if (((objects[0].px - 25 == obj[1].px + 50) || (objects[0].px + 25 == obj[1] - 50)) && ((objects[0].py + 25 == objects[1].py - 37.5) || (objects[0].py - 25 == objects[1].py + 37.5))) {
    objects[0].vx += objects[1].vx;
    addForce(objects[0], objects[1].vx, objects[1].vy);
    objects[0].vy += objects[1].vy;
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

    collisionDetection();

  

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
    
    //Update Rotation
    objects[0].deg = Math.atan2(objects[0].vy, objects[0].vx) * 180 / Math.PI
    objects[0].element.style.transform = `rotate(${objects[0].deg}deg)`

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

    //Increment time
  t++;
}


document.addEventListener("DOMContentLoaded", function() {
  init()


    
    //Player 1 controls
    document.addEventListener('keydown', function(event) {
      if (event.key == "w") {
        // addForce(objects[1], 0, -2.5);
        objects[1].vy += -2;
      }
    })
    document.addEventListener('keydown', function(event) {
      if (event.key == "a") {
        // addForce(objects[1], -2.5, 0);
        objects[1].vx += -2;
      }
    })

    document.addEventListener('keydown', function(event) {
      if (event.key == "s") {
        // addForce(objects[1], 0, 2.5);
        objects[1].vy += 2;
      }
    })

    document.addEventListener('keydown', function(event) {
      if (event.key == "d") {
        // addForce(objects[1], 2.5, 0);
        objects[1].vx += 2;
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


