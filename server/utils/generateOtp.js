const crypto = require('crypto');
const generateOtp = () => {
    const otp = crypto.randomInt(100000, 999999).toString(); // Generate 6-digit OTP
    const otpExpires = Date.now() + 15 * 60 * 1000; // OTP valid for 15 minutes

    console.log("Inside the generator : ",otp, otpExpires);

    return { otp, otpExpires };
}

module.exports = generateOtp;