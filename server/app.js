const express = require('express');
const http = require('http');
const serverIO = require('socket.io');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
const server = http.createServer(app);
const io = serverIO(server, {
    cors: {
        origin: "*",
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    }
});

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: "*",
    methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
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

    socket.on('send_message', ({ ticketId, sender, content }) => {
        const newMessage = {
            ticketId,
            sender,
            content,  // Ensure this matches your client
            timeStamp: new Date().getTime(), // Use a timestamp if needed
        };
        io.to(ticketId).broadcast.emit('recieve_message', newMessage);
    });    
    
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

module.exports = server;