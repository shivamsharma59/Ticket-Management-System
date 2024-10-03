const express = require('express');
const http = require('http');
const serverIO = require('socket.io');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
const server = http.createServer(app);
const io = serverIO(server, {
    cors: {
        origin: '*', // Specify your frontend origin
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true
    }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: '*', // Specify your frontend origin
    methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

const indexRoutes = require('./routes/indexRoutes.js');
app.use('/', indexRoutes);

io.on('connection', (socket) => {
    console.log(`New Socket connected with id : ${socket.id}`);

    socket.on('join_ticket', ({ ticketId }) => {
        socket.join(ticketId);
        console.log(`Socket ${socket.id} joined ticket: ${ticketId}`);
    });

    socket.on('send_message', ({ ticketId, sender, content }) => {
        const newMessage = {
            ticketId,
            sender,
            content,
            timeStamp: new Date().getTime(),
        };
        socket.to(ticketId).emit('recieve_message', newMessage);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

module.exports = server;
