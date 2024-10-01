import axios from 'axios';
const URL = import.meta.env.VITE_URL

const login = async ({ email, password }) => {
    try {
        const res = await axios.post(`${URL}/auth/login`, { email, password });
        return res;
    } catch (error) {
        console.error(error);
    }
};

export { login };