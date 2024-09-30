import axios from 'axios';
const URL = import.meta.env.VITE_URL;

const getTickets = async (departmentId) => {
    try {
        const res = await axios.get(`${URL}/department/ticket/${departmentId}`);
        return res.data;
    } catch (error) {
        console.error("Error fetching tickets:", error);
        throw error;
    }
};

const createTicket = async ({ departmentId, title, description }) => {
    try {
        const res = await axios.post(`${URL}/department/ticket/${departmentId}`, { title, description });
        return res.data.msg;
    } catch (error) {
        console.error("Error creating ticket:", error);
        throw error;
    }
};

export { getTickets, createTicket };
