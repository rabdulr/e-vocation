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
        const history = []
        socketServer().on('connection', (socket)=>{
            socket.emit("history", history)
            socket.on("message", (message)=>{
                socket.broadcast.emit('message', message)
                history.push(message)
            })
        })
    })
