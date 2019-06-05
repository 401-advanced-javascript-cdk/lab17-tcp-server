'use strict';

const net = require('net');
const socket = net.Socket();

socket.connect(process.env.PORT || 3001, process.env.HOST_ADDRESS, () => {
  console.log(`socket connected to server`);
});

socket.on('error', buffer => {
  const errorMessage = {
    time: new Date(),
    type: 'error',
    message: buffer.toString().trim(),
  }
  console.log(errorMessage);
});

socket.on('data', buffer => {
  const [eventType, payload] = buffer.toString().trim().split('--');
  const message = {
    time: new Date(),
    type: eventType,
    message: payload,
  }
  console.log(message);
});

socket.on('close', () => {
  console.log ('socket connection closed');
});