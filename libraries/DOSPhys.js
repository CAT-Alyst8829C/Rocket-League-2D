window.onload = init;

//Constants
var INITIAL       = 10,
    GRAVITY       =  0.2,
    REBOUND_RATIO =  0.8,
    DAMPING_RATIO =  0.995;

//Globals
var timer, t = 0,
    objects = [],
    mX = window.innerWidth/2, 
    mY = window.innerHeight/2;

function init(){
  //Set up event callbacks
  window.onmousemove = onMouseMove;
  window.onclick     = onMouseClick;
  window.onkeypress  = onKeyPress;  
  //Generate a test object
  r = Math.random()*40 + 10;
  addObject(mX-(r/2), mY-(r/2), r, r);
  addForce(objects[objects.length-1], Math.random()*INITIAL*2-INITIAL, Math.random()*INITIAL*2-INITIAL);
  //Start the timer
  timer = window.setInterval(update, 10);
}

function onMouseMove(e){
  mX = e.pageX;
  mY = e.pageY;
}

function onMouseClick(){
  r = Math.random()*50 + 20;
  addObject(mX-(r/2), mY-(r/2), r, r);
  addForce(objects[objects.length-1], Math.random()*INITIAL*2-INITIAL, Math.random()*INITIAL*2-INITIAL);
}

function onKeyPress(){
  //Clear the array
  objects = [];
  //Clear all active and inactive elements
  var divs = document.getElementsByTagName("div");
  for(i=divs.length-1; i>=0; i--){
    document.body.removeChild(divs[i]);
  }
}

function addObject(x, y, w, h){
  //Create DOM element
  element = document.createElement("div");
  element.style.left   = x+"px";
  element.style.top    = y+"px";
  element.style.width  = w+"px";
  element.style.height = h+"px";
  document.body.appendChild(element);
  //Create object
  object = {
    element: element,
    width:  w,
    height: h,
    px: x, py: y,
    vx: 0, vy: 0
  };
  //Add object to array
  objects.push(object);
}

function addForce(obj, x, y){
    obj.vx += x;
    obj.vy += y;
}

function update(){
  for(i=objects.length-1; i>=0; i--){
    //Apply collisions
    if(objects[i].px < 0){
      //Left
      objects[i].px = 0;
      objects[i].vx *= -REBOUND_RATIO;
    }
    else if(objects[i].px + objects[i].width > window.innerWidth-10){
      //Right
      objects[i].px = window.innerWidth - objects[i].width - 10;
      objects[i].vx *= -REBOUND_RATIO;
    }
    if(objects[i].py < 0){
      //Top
      objects[i].py = 0;
      objects[i].vy *= -REBOUND_RATIO;
    } 
    else if(objects[i].py + objects[i].height > window.innerHeight-10){
      //Bottom
      objects[i].py = window.innerHeight - objects[i].height - 10;
      objects[i].vy *= -REBOUND_RATIO;
    }
    //Apply damping
    objects[i].vx *= DAMPING_RATIO;
    objects[i].vy *= DAMPING_RATIO;
    //Apply gravity
    objects[i].vy += GRAVITY;
    //Update position
    objects[i].px += objects[i].vx;
    objects[i].py += objects[i].vy;
    objects[i].element.style.left = objects[i].px+"px";
    objects[i].element.style.top  = objects[i].py+"px";
  }
  //Increment time
  t++;
}