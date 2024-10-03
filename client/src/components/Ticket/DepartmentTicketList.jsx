import React, { useContext, useEffect, useState } from 'react';
import { TicketContext } from '../../contexts/Ticket.context';
import { departmentContext } from '../../contexts/Department.context';
import { Link } from 'react-router-dom';
import TicketForm from './TicketForm';
import './DepartmentTicketList.css';

function DepartmentTicketList() {
    const { tickets, fetchTickets } = useContext(TicketContext);
    const { departmentId } = useContext(departmentContext);
    const [isFormVisible, setIsFormVisible] = useState(false);

    useEffect(() => {
        const getTickets = async () => {
            try {
                console.log("Department Id : ", departmentId);
                await fetchTickets(departmentId);
            } catch (error) {
                console.error('Failed to fetch Tickets:', error);
            }
        };

        getTickets();
    }, [departmentId]);

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
                            <div className='ticket-info'>
                                <div className='ticket-details'>
                                    <Link to={`/department/${departmentId}/ticket/${ticket._id}`} className='ticket-title'>
                                        {ticket.title}
                                    </Link>
                                    <p className='description'>{ticket.description}</p>
                                </div>
                                <p className={`status ${ticket.status.toLowerCase()}`}>{ticket.status}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <button onClick={toggleFormVisibility}>
                {isFormVisible ? 'Close Form' : 'Raise Ticket'}
            </button>
            {isFormVisible && <TicketForm onClose={toggleFormVisibility} />}
        </>
    );
}

export default DepartmentTicketList;
