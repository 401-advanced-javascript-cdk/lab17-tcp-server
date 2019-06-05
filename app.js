'use strict';

const fs = require('fs');
const net = require('net');
const socket = new net.Socket();

const {promisify} = require('util');
const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

const file = process.argv.slice(2).shift();

const transformText = (data) => {
  return data.toString().toUpperCase();
}

socket.connect(process.env.PORT || 3001, process.env.HOST_ADDRESS, () => {
  console.log(`socket connected to server`);
  readFileAsync(file)
    .then(rawData => transformText(rawData))
    .then(text => writeFileAsync(file, Buffer.from(text)))
    .then(() => {
      socket.end(`save--new text saved to ${file}`);
      console.log('file transformed, disconnecting')
    })
    .catch(error => {
      socket.end(`error--${error}`);
      console.log(`Error logged, disconnecting`)
  });
});

socket.on('close', () => {
  console.log(`socket connection closed`);
});