import React, { useState } from 'react'
import DashboardIcon from '@mui/icons-material/Dashboard';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import InfoIcon from '@mui/icons-material/Info';
import './AsideBar.css';
import { Link } from 'react-router-dom';

function AsideBar() {
    const [activeItem, setActiveItem] = useState('');

    const handleItemClick = (item) => {
        setActiveItem(item);
    };

    return (
        <>
            <div className="aside-bar">
                <ul className="aside-top">
                    <li className={activeItem === 'dashboard' ? 'active' : ''}>
                        <Link
                            to='/dashboard'
                            onClick={() => handleItemClick('dashboard')}
                        > <DashboardIcon /> Dashboard
                        </Link>
                    </li>
                    <li className={activeItem === 'departments' ? 'active' : ''}>
                        <Link
                            to='/departments'
                            onClick={() => handleItemClick('departments')}
                        > <LocalFireDepartmentIcon /> Departments
                        </Link>
                    </li>
                    <li className={activeItem === 'latestTickets' ? 'active' : ''}>
                        <Link
                            to='/latestTickets'
                            onClick={() => handleItemClick('latestTickets')}
                        > <LocalActivityIcon /> Latest Tickets
                        </Link>
                    </li>
                </ul>
                <ul className="aside-bottom">
                    <li> <SupportAgentIcon />  Contact Us</li>
                    <li>  <InfoIcon />  About</li>
                </ul>
            </div >
        </>
    )
}

export default AsideBar;
