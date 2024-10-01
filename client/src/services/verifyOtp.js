import axios from 'axios';
const URL = import.meta.env.VITE_URL
const verifyOtp = async ({email, otp }) => {
    try {
        const res = await axios.post(`${URL}/auth/verifyOtp`, { email, otp });
        return res;
    } catch (error) {
        console.error(error);
    }
};

export { verifyOtp };
