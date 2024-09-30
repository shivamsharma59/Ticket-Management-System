import axios from 'axios';
const URL = import.meta.env.VITE_URL;

const getDepartments = async () => {
    try {
        const res = await axios.get(`${URL}/department`);
        return res.data;
    } catch (error) {
        throw new Error('Error fetching departments: ' + error.message);
    }
}

const createDepartment = async ({ DName, description }) => {
    try {
        await axios.post(`${URL}/department`, { DName, description });
    } catch (error) {
        throw new Error('Error creating department: ' + error.message);
    }
}

export { getDepartments, createDepartment };
