'use strict';

const net = require('net');

const port = process.env.PORT || 3001;
const server = net.createServer();

server.listen(port, () => console.log(`Server up on ${port}`) );

let socketPool = {};

server.on('connection', (socket) => {
  const id = `Socket ${Math.random()}`;
  socketPool[id] = socket;
  console.log(`${id} connected`)
  socket.on('data', (buffer) => {
    dispatchEvent(buffer)
  });
  socket.on('close', () => {
    console.log(`${id} disconnected`);
    delete socketPool[id];
  });
});

let dispatchEvent = (buffer) => {
  let text = buffer.toString().trim();
  const [eventName, payload] = text.split('--');
  for (let socket in socketPool) {
    socketPool[socket].write(`${eventName}--${payload}`);
  }
};


