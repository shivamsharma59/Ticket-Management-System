import React, { useContext, useState } from 'react';
import './LoginAndSignup.css';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import { login } from '../../services/loginServices';

function Login() {
    const [password, setPassword] = useState('');
    const { username, email, setUsername, setEmail, setLoggedIn } = useContext(UserContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await login({ username, email, password });
            alert(res.data.msg);
            if (res.status == 200) {
                setLoggedIn(true);
                // Navigate to the Home page 
                navigate('/');
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="container">
            <div className="card card-left">
                <h1 className='logo'>TMC</h1>
                <p className='welcome-text'>Manage the issues in a more organized and efficient way</p>
            </div>
            <div className="card card-right">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">UserName : </label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        placeholder='Your username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        autoComplete='on'
                    />
                    <label htmlFor="email">Email : </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder='abc@gmail.com'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete='on'
                    />
                    <label htmlFor="password">Password : </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder='***'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete='on'
                    />
                    <button type='submit'>Login</button>
                    <div>
                        <h3>Don't have an account?</h3>
                        <Link to='/signup'>Signup</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
