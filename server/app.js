const express = require('express');
const http = require('http');
const serverIO = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = serverIO(server, {
    cors: {
        origin: "*",
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }
});

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: "*",
    methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));


// Routes definition 
const indexRoutes = require('./routes/indexRoutes.js');
app.use('/', indexRoutes);

// socket definition
io.on('connection', (socket) => {
    console.log(`New Socket connected with id : ${socket.id}`);

    socket.on('join_ticket', ({ ticketId }) => {
        socket.join(ticketId);
    });

    socket.on('send_message', () => {
        const newMessage = {
            ticketId,
            sender,
            message,
            sender,
            timeStamp: new Date()
        }
        io.to(ticketId).emit('recieve_message', newMessage);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

module.exports = app;