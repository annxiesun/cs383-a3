'use strict';

const io = require('socket.io')();
const eventHandlers = require('./eventHandlers');

io.on('connection', (socket) => {
  let clients = eventHandlers.addToDB(socket.id);
  const connectedClients = () => clients.length;

  socket.on('/root/new_socket_connected', () => {
    const clientCount = connectedClients();
    socket.emit('/root/welcome', { id: socket.id });
    io.sockets.emit('root/update_socket_count', { clientCount });
    console.log(socket.id)
  });

  socket.on('/root/addImage', (data) => {
    const { base64String } = data;
    console.log(base64String);

    eventHandlers.addImage(base64String).then(() => {
      io.sockets.emit('/root/addImageClient', { base64String });
    });
  });

  socket.on('disconnect', () => {
    clients = eventHandlers.onClientDisconnect(socket.id);
    const clientCount = connectedClients();
    socket.broadcast.emit('root/update_socket_count', { clientCount });
  });
});

module.exports = io;
