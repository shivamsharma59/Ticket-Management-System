import React, { createContext, useContext, useState } from 'react';
import { createTicket, getTickets } from '../services/Ticket.Services';

const TicketContext = createContext();

const TicketContextProvider = ({ children }) => {
    const [tickets, setTicket] = useState([]);

    const fetchTickets = async (departmentId) => {
        const tickets = await getTickets(departmentId);
        console.log(tickets);
        setTicket(tickets);
    }

    const addTicket = async ({ departmentId, title, description }) => {

        const msg = await createTicket({ departmentId, title, description });
        await fetchTickets(departmentId);
        return msg;
    }

    return (
        <TicketContext.Provider value={{ tickets, fetchTickets, addTicket }}>
            {children}
        </TicketContext.Provider>
    )
}

export { TicketContext, TicketContextProvider };