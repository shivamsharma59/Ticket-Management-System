import React, { createContext, useState } from 'react';
import { getDepartments, createDepartment } from '../services/Department.Services';

const departmentContext = createContext();

const DepartmentProvider = ({ children }) => {
    const [departments, setDepartments] = useState([]);
    const [departmentId, setDepartmentId] = useState(null); // set the selected department id 
    const [error, setError] = useState(null);

    const fetchDepartments = async () => {
        try {
            const departments = await getDepartments();
            setDepartments(departments);
        } catch (err) {
            setError('Failed to fetch departments. Please try again.');
        }
    }

    const addDepartment = async ({ DName, description }) => {
        try {
            await createDepartment({ DName, description });
            await fetchDepartments();
        } catch (err) {
            setError('Failed to add department. Please try again.');
        }
    }

    return (
        <departmentContext.Provider value={{ departments, fetchDepartments, addDepartment, error, departmentId, setDepartmentId }}>
            {children}
        </departmentContext.Provider>
    )
}

export { departmentContext, DepartmentProvider };
