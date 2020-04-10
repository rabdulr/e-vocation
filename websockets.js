const io = require('socket.io')
let _socketServer;

const start = (server)=>{
    _socketServer = io(server);
};

const socketServer = ()=> _socketServer;

module.exports ={
  start,
  socketServer
}
