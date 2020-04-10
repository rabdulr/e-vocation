const db = require('./db');
const app = require('./app');
const io = require('socket.io')

const PORT = process.env.PORT || 3000;

db.sync()
    .then(() => {
        const server = app.listen(PORT, () => {
            console.log(`Listening on port ${PORT}`)
        });

        const socketServer = io(server);
    });
