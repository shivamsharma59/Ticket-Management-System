import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { departmentContext } from '../../contexts/Department.context';
import './DepartmentList.css';
import DepartmentForm from './DepartmentForm';

function DepartmentList() {
    const { departments, fetchDepartments, setDepartmentId } = useContext(departmentContext);
    const [isFormVisible, setIsFormVisible] = useState(false);

    useEffect(() => {
        const getDeps = async () => {
            try {
                await fetchDepartments();
            } catch (error) {
                console.error('Failed to fetch Departments:', error);
            }
        };

        getDeps();
    }, []);

    const toggleFormVisibility = () => {
        setIsFormVisible(!isFormVisible);
    };

    return (
        <>
            <div className='departments'>
                <h2>Departments</h2>
                <ul className='department-list'>
                    {departments.map(department => (
                        <li className='department' key={department._id}>
                            <Link
                                to={`/department/ticket/${department._id}`}
                                onClick={() => { setDepartmentId(department._id) }}
                            > {department.departmentName} </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <button onClick={toggleFormVisibility}>
                {isFormVisible ? 'Close Form' : 'Add Department'}
            </button>
            {isFormVisible && <DepartmentForm onClose={toggleFormVisibility} />}
        </>
    );
}

export default DepartmentList;
