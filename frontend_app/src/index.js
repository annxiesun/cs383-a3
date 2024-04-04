
// Import CSS styles in JavaScript
import "./socket.js"
// Initialize p5.js
// p5 requires two arguments: new p5(sketch function, target DOM element)

// Enable live reload while developing (https://esbuild.github.io/api/#live-reload)
if (process.env.NODE_ENV !== 'production') {
  new EventSource('/esbuild').addEventListener('change', () =>
    location.reload(),
  )
}

console.log(window.location.pathname)


/*****************************************/
var img = new Image();
img.src = 'brush2.png';

var space_image = new Image();
space_image.src = 'space/planet_bg.png';

var space_outline = new Image();
space_outline.src = 'space/planet.png';



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

let btn1 = document.getElementById('1');
let btn2 = document.getElementById('2');


btn1.addEventListener('click', () => {
  // ctx2.globalCompositeOperation = "source-over";
  // ctx2.drawImage(space_image, 0,0)
  // ctx2.globalCompositeOperation = "source-in";
  ctx2.fillStyle = "#000";
  ctx2.fillRect(0, 0, canvas.width, canvas.height);

  ctx2.drawImage(space_image, 0,0)
  ctx2.globalCompositeOperation = "source-in";
  ctx2.drawImage(canvas, 0,0)

  ctx2.globalCompositeOperation = "destination-atop";
  ctx2.drawImage(space_image, 0, 0);

  ctx2.globalCompositeOperation = "source-over";
  
})

btn2.addEventListener('click', () => {
  var ImageData = ctx2.getImageData(0, 0, 500, 500);
  var MyImage = new Image();
  MyImage.src = getImageURL(ImageData, 500, 500);

  // append image element to body
  document.body.appendChild(MyImage);

  //var image = canvas2.toDataURL("image/png").replace("image/png", "image/octet-stream");  // here is the most important part because if you dont replace you will get a DOM 18 exception.
  // window.location.href=image; 
})

var isDrawing, lastPoint;

const startDraw = (e) => {
  e.preventDefault();
  isDrawing = true;
  lastPoint = { x: e.clientX, y: e.clientY };
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


// canvas.addEventListener(
//   "pointerdown",
//   (event) => {
//     console.log(event.pressure)
//     if (event.pressure === 0) {
//       // No pressure
//     } else if (event.pressure === 1) {
//       // Maximum pressure
//     } else {
//       // Default
//     }
//   },
//   false,
// );


canvas.onmousemove = function(e) {
  if (!isDrawing) return;
  
  var currentPoint = { x: e.clientX, y: e.clientY };
  var dist = distanceBetween(lastPoint, currentPoint);
  var angle = angleBetween(lastPoint, currentPoint);

  for (var i = 0; i < dist; i += 0.5) {
    x = lastPoint.x + (Math.sin(angle) * i) - 25;
    y = lastPoint.y + (Math.cos(angle) * i) - 25;
    
    ctx.globalCompositeOperation = "source-over";
    ctx.save();
    ctx.translate(x,y)
    ctx.rotate((Math.random() * angle) * Math.PI/180)
    ctx.globalAlpha = 0.05;
    ctx.drawImage(img, 0, 0);
    ctx.restore();
    ctx.globalCompositeOperation = "source-in";
    // // draw color
    ctx.fillStyle = "#09f";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.globalCompositeOperation = "source-over";

  }
  
  ctx.drawImage(space_outline, 0, 0);

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



function getImageURL(imgData, width, height) {
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  canvas.width = width;
  canvas.height = height;
  ctx.putImageData(imgData, 0, 0);
  return canvas.toDataURL(); //image URL
}