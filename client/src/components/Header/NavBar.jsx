import React, { useContext } from 'react'
import PersonIcon from '@mui/icons-material/Person';
import { Link } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import './NavBar.css';


function NavBar() {
    const { username, email, loggedIn } = useContext(UserContext)
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
                        <li className='list-items'> <PersonIcon /> {username}</li>
                    )}
                </ul>
            </div>
        </div>
    )
}

export default NavBar
