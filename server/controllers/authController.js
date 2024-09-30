const User = require('../models/User.js');
const generateOtp = require('../utils/generateOtp.js');
const sendMail = require('../utils/sendMail.js');

const signup = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: "User already exists!" });
        }

        const otpObj = generateOtp();
        const newUser = new User({
            username,
            email,
            password,
            otp: otpObj.otp,
            otpExpires: otpObj.otpExpires
        });
        await newUser.save();
        await sendMail({ email, otp: otpObj.otp }); // Ensure you use otpObj.otp here

        return res.status(200).json({
            msg: "Signup successful! Please check your email for the OTP."
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal server error" });
    }
}

const login = async (req, res) => {
    const { username, email, password } = req.body;


    return res.status(200).json({ msg: "Login Success!" });
}

module.exports = { signup, login };