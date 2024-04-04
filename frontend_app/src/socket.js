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


var canvas = document.getElementById('canvas');
var canvas2 = document.getElementById('canvas2');

var ctx = canvas.getContext('2d');
var ctx2 = canvas2.getContext('2d');


let btn1 = document.getElementById('1');
btn1.addEventListener('click', () => {
  // ctx2.globalCompositeOperation = "source-over";
  // ctx2.drawImage(space_image, 0,0)
  // ctx2.globalCompositeOperation = "source-in";
  console.log("clicked")
  ctx2.fillStyle = "#000";
  ctx2.fillRect(0, 0, canvas.width, canvas.height);

  ctx2.drawImage(space_image, 0,0)
  ctx2.globalCompositeOperation = "source-in";
  ctx2.drawImage(canvas, 175,75, 500,500, 0,0,500,500)

  ctx2.globalCompositeOperation = "destination-atop";
  ctx2.drawImage(space_image, 0, 0);

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