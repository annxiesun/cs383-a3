let socketId;

const socket = io(
  "https://701a-2620-101-f000-700-00-dee0-a4c5.ngrok-free.app",
  {
    extraHeaders: {
      "ngrok-skip-browser-warning": true,
    },
  }
);

var space_image = new Image();
space_image.src = 'space/planet_bg.png';

var space_outline = new Image();
space_outline.src = 'space/planet.png';

var star_bg = new Image();
star_bg.src = 'space/star_bg.png';

var star_outline = new Image();
star_outline.src = 'space/star_outline.png';

var earth_bg = new Image();
earth_bg.src = 'space/earth_bg.png';

var earth_outline = new Image();
earth_outline.src = 'space/earth_outline.png';

var rock_bg = new Image();
rock_bg.src = 'space/rock_bg.png';

var rock_outline = new Image();
rock_outline.src = 'space/rock_outline.png';

var rings_bg = new Image();
rings_bg.src = 'space/rings_bg.png';

var rings_outline = new Image();
rings_outline.src = 'space/rings_outline.png';

var sun_bg = new Image();
sun_bg.src = 'space/sun_bg.png';

var sun_outline = new Image();
sun_outline.src = 'space/sun_outline.png';

var canvas = document.getElementById('canvas');
var canvas2 = document.getElementById('canvas2');

var ctx = canvas.getContext('2d');
var ctx2 = canvas2.getContext('2d');

let currBg = sun_bg;
let currOutline = sun_outline;

let btn1 = document.getElementById('1');
btn1.addEventListener('click', () => {
  console.log("clicked")

  ctx2.drawImage(currBg, 0,0)
  ctx2.globalCompositeOperation = "source-in";
  ctx2.drawImage(canvas, 175,50, 500,500, 0,0,500,500)

  ctx2.globalCompositeOperation = "destination-atop";
  ctx2.drawImage(currBg, 0, 0);

  ctx2.globalCompositeOperation = "source-over";
  
  var image = ctx2.getImageData(0, 0, 500, 500);
  var data = getImageURL(image, 500, 500);

  socket.emit("/root/addImage", { base64String: data });
})

socket.emit("/root/new_socket_connected");

// Socket events
// Whenever the server emits '/root/welcome' event, update website
socket.on("/root/welcome", welcomeUser);
// // Whenever the server emits '/root/update_socket_count' event, updates number of sockets connected
// socket.on("root/update_socket_count", updateSocketCount);
// // Whenever the server emits '/root/update_chat' event, add message to the chat
// socket.on('/root/update_chat', addMessage);

/********** HANDLE ACTIONS *********************/
// socket.on("/root/cheated", onCheated);
// socket.on("/root/done_good", onGood);
// socket.on("/root/both_cheated", onBothCheated);

function welcomeUser(data) {
  const { id } = data;
  // addMessage({ message, sender });
  socketId = id;
  console.log("SOCKET ID:", id);
}

function getImageURL(imgData, width, height) {
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  canvas.width = width;
  canvas.height = height;
  ctx.putImageData(imgData, 0, 0);
  return canvas.toDataURL(); //image URL
}

const sun = document.getElementById('sun');
const star = document.getElementById('star');
const planet = document.getElementById('planet');
const rock = document.getElementById('rock');
const rings = document.getElementById('rings');
const earth = document.getElementById('earth');

sun.addEventListener('click', () => {
  currBg = sun_bg;
  currOutline = sun_outline;
  redrawCanvas()
})

star.addEventListener('click', () => {
  currBg = star_bg;
  currOutline = star_outline;
  redrawCanvas()
})

planet.addEventListener('click', () => {
  currBg = space_image;
  currOutline = space_outline;
  redrawCanvas()
})

rock.addEventListener('click', () => {
  currBg = rock_bg;
  currOutline = rock_outline;
  redrawCanvas()
})

rings.addEventListener('click', () => {
  currBg = rings_bg;
  currOutline = rings_outline;
  redrawCanvas()
})

earth.addEventListener('click', () => {
  currBg = earth_bg;
  currOutline = earth_outline;
  redrawCanvas();
})

function redrawCanvas() {
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(currOutline, 175, 50);
  console.log("redraw")
}


/*****************************************/
/*****************************************/
/*****************************************/

function distanceBetween(point1, point2) {
  return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
}
function angleBetween(point1, point2) {
  return Math.atan2( point2.x - point1.x, point2.y - point1.y );
}

var canvas = document.getElementById('canvas');
var canvas2 = document.getElementById('canvas2');

var ctx = canvas.getContext('2d');
var ctx2 = canvas2.getContext('2d');
ctx.lineJoin = ctx.lineCap = 'round';

// ctx.globalCompositeOperation = "destination-atop";
// ctx.fillStyle = "#000";
ctx.globalCompositeOperation = "source-over";
// const offscreen = new OffscreenCanvas(800, 500);
// const ctx_offscreen = offscreen.getContext("2d");

var isDrawing, lastPoint;

const startDraw = (e) => {
  e.preventDefault();
  isDrawing = true;
  lastPoint = { 
    x: -canvas.getBoundingClientRect().left + e.clientX, 
    y: -canvas.getBoundingClientRect().top + e.clientY 
  };
}

const endDraw = (e) => {
  e.preventDefault();
  isDrawing = false;
}

canvas.addEventListener("touchstart", function(e) {
  startDraw(e)
});

canvas.addEventListener("mousedown", function(e) {
  startDraw(e)
});


let fillColor = "#fc0b03";

const size = 120;

canvas.onmousemove = function(e) {
  if (!isDrawing) return;
  
  var currentPoint = { 
    x: -canvas.getBoundingClientRect().left + e.clientX, 
    y: -canvas.getBoundingClientRect().top + e.clientY 
  };
  var dist = distanceBetween(lastPoint, currentPoint);
  var angle = angleBetween(lastPoint, currentPoint);

  for (var i = 0; i < dist; i += 0.5) {
    x = lastPoint.x + (Math.sin(angle) * i) ;
    y = lastPoint.y + (Math.cos(angle) * i) ;
    
    var radgrad = ctx.createRadialGradient(x,y,10,x,y,size/2);
    
    radgrad.addColorStop(0, fillColor+'10');
    radgrad.addColorStop(0.5, fillColor+'00');
    radgrad.addColorStop(1, fillColor+'00');
    
    ctx.fillStyle = radgrad;
     ctx.fillRect(x-(size/2), y-(size/2), size, size);

  }
  
  ctx.drawImage(currOutline, 175, 50);

  lastPoint = currentPoint;
  e.preventDefault();
};

canvas.addEventListener("touchend", function(e) {
  endDraw(e)
});

canvas.addEventListener("mouseup", function(e) {
  endDraw(e)
});

canvas.addEventListener("touchmove", function (e) {
  var touch = e.touches[0];
  var mouseEvent = new MouseEvent("mousemove", {
    clientX: touch.clientX,
    clientY: touch.clientY
  });
  canvas.dispatchEvent(mouseEvent);
  e.preventDefault();
}, false);


let red = document.getElementById('red');
red.addEventListener('click', () => {
  fillColor = "#fc0b03"
})

let pink = document.getElementById('pink');
pink.addEventListener('click', () => {
  fillColor = "#fc0380"
})

let yellow = document.getElementById('yellow');
yellow.addEventListener('click', () => {
  fillColor = "#fcce03"
})

let green = document.getElementById('green');
green.addEventListener('click', () => {
  fillColor = "#90d615"
})

let blue = document.getElementById('blue');
blue.addEventListener('click', () => {
  fillColor = "#15b6d6"
})

let deepblue = document.getElementById('deepblue');
deepblue.addEventListener('click', () => {
  fillColor = "#1515d6"
})
