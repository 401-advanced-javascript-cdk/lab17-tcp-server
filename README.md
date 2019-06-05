# Lab17 - TCP Server
Uses Node's Socket to create server and client communication through TCP
### Author: Chris Kozlowski

### Links and Resources
* [Submission PR](https://github.com/401-advanced-javascript-cdk/lab17-tcp-server/pull/1)
<!-- * [Travis]( --- ) -->
<!-- * [Heroku Deployment]( --- ) -->

### Modules
#### `server.js`
Creates a `net` server for managing socket connections.  Assigns id's to connected sockets and dispatches events to all connected clients.
#### `app.js`
Creates a TCP socket.  Holds functions for transforming a text file to all uppercase and uses events to send results to the server.
#### `logger.js`
Creates a TCP socket and listens for save or error events, and creates messages in the console


#### Operation
This application runs in three parts. First the server is created and begins listening for connected sockets.  Then the logger connects to the server and listens for events from the server.  Then the app connects to the server and performs a transformation on a text file whose path is given as a command line parameter.  After performing the transformation, the app sends a `data` event that is heard by the server.  The server takes the event and extracts the event type and any payload from the data, then sends out a new event with the event type.  From here the logger hears this event and creates a message object which is logged to the console.

All three components operate in seperate Node instances and connect to the server through sockets to a shared port.  This permits all three components to emit and listen for events in the same space. 