import React from 'react'
import DashboardIcon from '@mui/icons-material/Dashboard';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import InfoIcon from '@mui/icons-material/Info';
import './AsideBar.css';
import { Link } from 'react-router-dom';

function AsideBar() {
    return (
        <>
            <div className="aside-bar">
                <ul className="aside-top">
                    <li> <Link to='/dashboard' > <DashboardIcon /> Dashboard</Link> </li>
                    <li> <Link to='/departments' > <LocalFireDepartmentIcon /> Departments</Link> </li>
                    <li> <Link to='/latestTickets' > <LocalActivityIcon /> Latest Tickets</Link> </li>
                </ul>
                <ul className="aside-bottom">
                    <li> <SupportAgentIcon />  Contact Us</li>
                    <li>  <InfoIcon />  About</li>
                </ul>
            </div>
        </>
    )
}

export default AsideBar;
