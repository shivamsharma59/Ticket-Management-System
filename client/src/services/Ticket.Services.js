import axios from 'axios';
const URL = import.meta.env.VITE_URL;
import Cookies from 'js-cookie';

let token = Cookies.get('token');

const getTickets = async (departmentId) => {
    try {
        const res = await axios.get(`${URL}/department/ticket/${departmentId}`);
        return res.data;
    } catch (error) {
        console.error("Error fetching tickets:", error.response ? error.response.data : error.message);
        throw error;
    }
};

const createTicket = async ({ departmentId, title, description }) => {
    try {
        const res = await axios.post(`${URL}/department/ticket/${departmentId}`, { title, description }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true
        });
        return res.data.msg;
    } catch (error) {
        console.error("Error creating ticket:", error.response ? error.response.data : error.message);
        throw error;
    }
};

export { getTickets, createTicket };
