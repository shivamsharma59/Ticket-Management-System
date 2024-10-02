import React, { useContext, useEffect, useState } from 'react'
import PersonIcon from '@mui/icons-material/Person';
import { Link } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import DropDown from '../DropDown/DropDown';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import './NavBar.css';


function NavBar() {
    const { username, email, setUsername, setEmail, loggedIn, setLoggedIn } = useContext(UserContext)
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            const decode = jwtDecode(token);
            const { username, email } = decode;
            setUsername(username);
            setEmail(email);
            setLoggedIn(true);
        }
    }, [loggedIn]);

    const toggleDropDown = () => {
        setIsOpen(!isOpen);
    }

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
                    {!loggedIn ? (
                        <li className="list-items">
                            <Link to='/Login' className='nav-links'>Login/Signup</Link>
                        </li>
                    ) : (
                        <li
                            className='list-items'
                            onMouseEnter={toggleDropDown}
                            onMouseLeave={toggleDropDown}
                            onClick={toggleDropDown}
                        > <PersonIcon /> {username}</li>
                    )}
                    {isOpen && <DropDown />}
                </ul>
            </div>
        </div>
    )
}

export default NavBar
