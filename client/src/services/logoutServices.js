const URL = import.meta.env.VITE_URL;
import axios from 'axios';


const logout = async () => {
    try {
        const res = await axios.get(`${URL}/auth/logout`);
        return res;
    } catch (error) {
        console.error(error);
    }
}

export default logout;