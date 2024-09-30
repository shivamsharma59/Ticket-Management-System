import axios from 'axios';
const URL = import.meta.env.VITE_URL
const signup = async ({ username, email, password }) => {
    try {
        const res = await axios.post(`${URL}/auth/signup`, { username, email, password });
        return res.data;
    } catch (error) {
        console.error(error);
    }
};

export { signup };
