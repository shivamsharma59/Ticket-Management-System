import React, { useContext, useEffect, useState } from 'react';
import { TicketContext } from '../../contexts/Ticket.context';
import { departmentContext } from '../../contexts/Department.context';
import { Link } from 'react-router-dom';
import TicketForm from './TicketForm';
import './DepartmentTicketList.css';

function DepartmentTicketList() {
    const { tickets, fetchTickets, addTicket } = useContext(TicketContext);
    const { departmentId } = useContext(departmentContext);
    const [isFormVisible, setIsFormVisible] = useState(false);

    useEffect(() => {
        const getTickets = async () => {
            try {
                await fetchTickets(departmentId);
            } catch (error) {
                console.error('Failed to fetch Tickets:', error);
            }
        };

        getTickets();
    }, []);


    const toggleFormVisibility = () => {
        setIsFormVisible(!isFormVisible);
    };

    return (
        <>
            <div className='tickets'>
                <h2>Tickets</h2>
                <ul className='ticket-list'>
                    {tickets.map(ticket => (
                        <li className='department' key={ticket._id}>
                            <Link to={`/department/${departmentId}/ticket/${ticket._id}`}>{ticket.title}</Link>
                        </li>
                    ))}
                </ul>
            </div >
            <button onClick={toggleFormVisibility}>
                {isFormVisible ? 'Close Form' : 'Raise Ticket'}
            </button>
            {isFormVisible && <TicketForm onClose={toggleFormVisibility} />}
        </>
    );
}

export default DepartmentTicketList;
