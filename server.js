const app = require("./backend/app");
const debug = require("debug")("business-case");
const http = require("http");
const WebSocket = require('ws');

const normalizePort = val => {
  var port = parseInt(val, 10);
  if (isNaN(port)) {
    // named pipe
    return val;
  }
  if (port >= 0) {
    // port number
    return port;
  }
  return false;
};

const onError = error => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
  debug("Listening on " + bind);
};

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const server = http.createServer(app);
server.on("error", onError);
server.on("listening", onListening);
server.listen(port);

const wss = new WebSocket.Server({ server:server });

// Triggering new messages
wss.on('connection', function connection(ws) {
  console.log(" A new client connected to the ws server");
  ws.send('Welcome New client');

  //
  ws.on('message', function incoming(message) {
    console.log('Received %s', message);
    ws.send('Got ur msg : ' + message);
  });
});
 