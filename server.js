const db = require('./db');
const app = require('./app');
const {start} = require('./websockets')
const {socketServer} = require('./websockets')

const PORT = process.env.PORT || 3000;

db.sync()
    .then(() => {
        const server = app.listen(PORT, () => {
            console.log(`Listening on port ${PORT}`)
        });

        start(server);
    })
    .then(()=>{
        socketServer().on('connection', (socket)=>{
            socket.on("message", (message)=>{
                socket.broadcast.emit('message', message)
                console.log("I made it into the socket serrver 'message' event handler!" )
            })
        })
    })
