import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { TicketContext } from '../../contexts/Ticket.context';
import { io } from 'socket.io-client';
import './TicketDetails.css';

const socket = io('http://localhost:3000'); // Adjust the URL as needed

const TicketDetail = () => {
    const { ticketId } = useParams();
    const { tickets } = useContext(TicketContext);
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');

    const ticket = tickets.find(ticket => ticket._id === ticketId);

    useEffect(() => {
        socket.emit('join_ticket', { ticketId });

        const handleReceiveMessage = (newMessage) => {
            const isDuplicate = messages.some(msg => msg.timeStamp === newMessage.timeStamp);
            if (!isDuplicate) {
                setMessages((prevMessages) => [...prevMessages, newMessage]);
            }
        };

        socket.on('recieve_message', handleReceiveMessage);

        return () => {
            socket.off('recieve_message', handleReceiveMessage);
        };
    }, [ticketId]);

    const sendMessage = () => {
        if (!messageInput.trim()) return;

        const newMessage = {
            ticketId,
            sender: 'User', // Replace with the actual user data
            content: messageInput,
            timeStamp: new Date().getTime(),
        };

        socket.emit('send_message', newMessage);
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setMessageInput('');
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
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
                onKeyDown={handleKeyDown} // Add this line
                placeholder='Type your message...'
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default TicketDetail;
