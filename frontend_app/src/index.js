
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

function distanceBetween(point1, point2) {
  return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
}
function angleBetween(point1, point2) {
  return Math.atan2( point2.x - point1.x, point2.y - point1.y );
}

var el = document.getElementById('canvas');
var ctx = el.getContext('2d');
ctx.lineJoin = ctx.lineCap = 'round';

var isDrawing, lastPoint;

el.onmousedown = function(e) {
  isDrawing = true;
  lastPoint = { x: e.clientX, y: e.clientY };
};

el.addEventListener(
  "pointerdown",
  (event) => {
    console.log(event.pressure)
    if (event.pressure === 0) {
      // No pressure
    } else if (event.pressure === 1) {
      // Maximum pressure
    } else {
      // Default
    }
  },
  false,
);


el.onmousemove = function(e) {
  if (!isDrawing) return;
  
  var currentPoint = { x: e.clientX, y: e.clientY };
  var dist = distanceBetween(lastPoint, currentPoint);
  var angle = angleBetween(lastPoint, currentPoint);
  

  for (var i = 0; i < dist; i += 0.5) {
    x = lastPoint.x + (Math.sin(angle) * i) - 25;
    y = lastPoint.y + (Math.cos(angle) * i) - 25;
    
    ctx.save();
    
    ctx.translate(x,y)
    ctx.rotate((Math.random() * angle) * Math.PI/180)
    ctx.globalAlpha = 0.05;
    ctx.drawImage(img, 0, 0);
    ctx.restore();
    ctx.globalCompositeOperation = "source-in";

    // draw color
    ctx.fillStyle = "#09f";
    ctx.fillRect(0, 0, el.width, el.height);
    ctx.globalCompositeOperation = "source-over";

  }
  
  
  lastPoint = currentPoint;
};

el.onmouseup = function() {
  isDrawing = false;
};

el.addEventListener("touchmove", function (e) {
  var touch = e.touches[0];
  var mouseEvent = new MouseEvent("mousemove", {
    clientX: touch.clientX,
    clientY: touch.clientY
  });
  canvas.dispatchEvent(mouseEvent);
}, false);

el.addEventListener("touchstart", () => {
  var touch = e.touches[0];
  var mouseEvent = new MouseEvent("mousemove", {
    clientX: touch.clientX,
    clientY: touch.clientY
  });
  canvas.dispatchEvent(mouseEvent);
})


el.addEventListener("touchend", () => {
  var touch = e.touches[0];
  var mouseEvent = new MouseEvent("mousemove", {
    clientX: touch.clientX,
    clientY: touch.clientY
  });
  canvas.dispatchEvent(mouseEvent);
})