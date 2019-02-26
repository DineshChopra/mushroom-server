const http = require('http');
const debug = require('debug')('node-angular');
const app = require('./app');

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
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
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
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  debug("Listening on " + bind);
};

const port  = normalizePort(process.env.PORT || '3000');
app.set('port' , port);

const server = http.createServer(app);
const io = require('socket.io').listen(server);

io.on('connection', (socket)=> {
  socket.on('join', function(data) {
    console.log('chat room joined ', data);
    const {userName, roomName} = data;
    socket.join(roomName);
    const message = `${userName} joined ${roomName} chat room`;
    const response = {userName, message};
    socket.broadcast.to(roomName).emit('new user joined', response);
  });
  
  socket.on('leave', function(data) {
    console.log('chat room left ', data);
    const {userName, roomName} = data;
    const message = `${userName} has left ${roomName} chat room`;
    const response = {userName, message};
    socket.broadcast.to(roomName).emit('left room', response);
    socket.join(roomName);
  });
});
server.on('error', onError);
server.on('listening', onListening);
server.listen(port);