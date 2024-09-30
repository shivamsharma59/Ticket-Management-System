import React, { useContext, useEffect, useRef, useState } from 'react'
import { TicketContext } from '../../contexts/Ticket.context';
import { departmentContext } from '../../contexts/Department.context';

function TicketForm() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const { addTicket } = useContext(TicketContext);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const formRef = useRef(null);
    const { departmentId } = useContext(departmentContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const msg = await addTicket({ departmentId, title, description });
            setTitle('');
            setDescription('');
            alert(msg);
        } catch (err) {
            console.error(err);
            setError('Failed to add ticket. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleClickOutside = (event) => {
        if (formRef.current && !formRef.current.contains(event.target)) {
            onClose(); // Hide form if clicked outside
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className='ticket-Form-container'>
            <form onSubmit={handleSubmit} className='ticket-form' ref={formRef}>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Ticket Title"
                    required
                />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Ticket Description"
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Adding...' : 'Add Ticket'}
                </button>
            </form>
            {error && <p className="error">{error}</p>}
        </div>
    );
}

export default TicketForm
