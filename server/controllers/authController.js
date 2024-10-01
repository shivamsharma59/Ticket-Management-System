const User = require('../models/User.js');
const generateOtp = require('../utils/generateOtp.js');
const sendMail = require('../services/sendMail.js');

const signup = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: "User already exists!" });
        }

        const { otp, otpExpires } = generateOtp();
        const newUser = new User({
            username,
            email,
            password,
            otp: otp,
            otpExpires: otpExpires
        });

        await newUser.save();
        await sendMail({ email, otp: otp }); // Ensure you use otpObj.otp here

        return res.status(200).json({
            msg: "Signup successful! Please check your email for the OTP."
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal server error" });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "User does not exist!" });
        }
        if (user.password !== password) {
            return res.status(400).json({ msg: "Invalid credentials!" });
        }
        if (!user.isVerified) {
            return res.status(400).json({ msg: "Please verify your email!" });
        }
        return res.status(200).json({ msg: "Login successful!" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal server error" });
    }
}


const verifyOtp = async (req, res) => {
    console.log("inside verify otp");
    const { email, otp } = req.body;

    const user = await User.findOne({ email, otp, otpExpires: { $gt: Date.now() } });

    if (!user) return res.status(400).json({ msg: "Invalid or expired OTP" });
    await User.updateOne({ email }, { isVerified: true, otp: null, otpExpires: null });
    return res.status(200).json({ msg: "OTP verified" });
}


module.exports = { signup, login, verifyOtp };