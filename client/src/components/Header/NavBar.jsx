import React from 'react'
import PersonIcon from '@mui/icons-material/Person';
import { Link } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
    return (
        <div>
            <div className="navbar">
                <ul className="nav-left-part">
                    <h2 className="logo">TMC</h2>
                </ul>
                <ul className="nav-center-part">
                    <li className='list-items'>
                        <Link to="/" className='nav-links'>Home</Link>
                    </li>
                </ul>
                <ul className="nav-right-part">
                    <li className="list-items">
                        <Link to='/Login' className='nav-links'>Login/Signup</Link>
                    </li>
                    <li className='list-items'> <PersonIcon /> Username</li>
                </ul>
            </div>
        </div>
    )
}

export default NavBar
