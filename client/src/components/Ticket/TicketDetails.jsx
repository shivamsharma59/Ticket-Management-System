import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { TicketContext } from '../../contexts/Ticket.context';
import { io } from 'socket.io-client';
const socket = io('http://localhost:3000'); // Adjust the URL as needed

const TicketDetail = () => {
    const { ticketId } = useParams(); // Get ticketId from the URL
    const { tickets } = useContext(TicketContext);
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');

    const ticket = tickets.find(ticket => ticket._id === ticketId); // Fetch the specific ticket
    console.log("The Current Ticket is : ", ticket);

    useEffect(() => {
        socket.emit('join_ticket', { ticketId });

        const handleReceiveMessage = (newMessage) => {
            // Check for duplicates before adding the message
            const isDuplicate = messages.some(msg => msg.timeStamp === newMessage.timeStamp);
            if (!isDuplicate) {
                setMessages((prevMessages) => [...prevMessages, newMessage]);
            }
        };

        socket.on('recieve_message', handleReceiveMessage);

        return () => {
            socket.off('recieve_message', handleReceiveMessage);
        };
    }, [ticketId]); // Adding messages as dependency

    const sendMessage = () => {
        if (!messageInput.trim()) return; // Prevent sending empty messages

        const newMessage = {
            ticketId,
            sender: 'User', // Replace with the actual user data
            content: messageInput,
            timeStamp: new Date().getTime(), // Use a unique timestamp
        };

        // Emit the message to the server
        socket.emit('send_message', newMessage);

        // Add the message to state immediately to update UI
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setMessageInput('');
    };

    return (
        <div>
            <h2>{ticket.title}</h2>
            <p>{ticket.description}</p>
            <div className='chat-window'>
                {messages.map((msg, index) => (
                    <div key={index}>
                        <strong>{msg.sender}:</strong> {msg.content}
                    </div>
                ))}
            </div>
            <input
                type='text'
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder='Type your message...'
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default TicketDetail;
