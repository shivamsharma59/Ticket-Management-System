import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { verifyOtp } from '../../services/verifyOtp';

function VerifyOtp() {
    const location = useLocation();
    const email = location.state?.email; // Get email from state
    const [otp, setOtp] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate


    const handleVerify = async (e) => {
        e.preventDefault();
        // Call the API to verify the OTP
        try {
            // Implement your verify OTP service here
            console.log(`Verifying OTP for ${email}: ${otp}`);
            const response = await verifyOtp({ email, otp });
            alert(response.data.msg);
            // Redirect to the login page
            navigate('/login');
        } catch (error) {
            console.error(error);
            alert("Error verifying OTP. Please try again.");
        }
    }

    return (
        <div className="container">
            <h1>Verify Your OTP</h1>
            <form onSubmit={handleVerify}>
                <label htmlFor="otp">Enter OTP:</label>
                <input
                    type="text"
                    id="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter the OTP sent to your email"
                />
                <button type="submit">Verify OTP</button>
            </form>
        </div>
    );
}

export default VerifyOtp;
