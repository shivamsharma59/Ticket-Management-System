import React, { useState } from 'react';
import '../Login/LoginAndSignup.css';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../../services/signupServices';

function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await signup({ username, email, password });
            alert(res.data.msg);
            if (res.status == 200) {
                // Navigate to the Verify OTP page after successful signup
                navigate('/verify-otp', { state: { email } }); // Pass the email for OTP verification
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred. Please try again.");
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
                    <button type='submit'>Signup</button>
                    <div>
                        <h3>Already have an account?</h3>
                        <Link to='/login'>Login</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;
