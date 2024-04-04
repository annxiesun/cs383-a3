import { myP5Sketch } from ".";

/*************************************************/

/*************************************************/

// const cheatBtn = document.querySelector('#cheatBtn');
// const goodBtn = document.querySelector('#goodBtn');

const socket = io('https://0940-2620-101-f000-700-3dee-6e15-dee0-a4c5.ngrok-free.app', {
  extraHeaders: {
    "ngrok-skip-browser-warning": true
  }
});


socket.emit('/root/new_socket_connected');

// Socket events
// Whenever the server emits '/root/welcome' event, update website
socket.on('/root/welcome', welcomeUser);
// // Whenever the server emits '/root/update_socket_count' event, updates number of sockets connected
// socket.on('root/update_socket_count', updateSocketCount);
// // Whenever the server emits '/root/update_chat' event, add message to the chat
// socket.on('/root/update_chat', addMessage);

/********** HANDLE ACTIONS *********************/
socket.on('/root/addImageClient', addNewImage);


/***********************************/
function welcomeUser (data) {
  const { message, sender, id } = data;
  // addMessage({ message, sender });
  console.log("SOCKET ID:", id);
}

function addNewImage(data) {
  const { base64String } = data;
  myP5Sketch.addNewImage(base64String)
}
// function updateSocketCount (data) {
//   const { clientCount } = data;
//   console.log("CLIENT COUNT:", clientCount);
// }

