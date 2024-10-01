const User = require('../models/User.js');

const verifyOtp = async (email, otp) => {
    const user = await User.findOne({ email, otp, otpExpires: { $gt: Date.now() } });
    if (!user) return false;
    return user;
};

module.exports = verifyOtp;