const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateOtp = (user) => {
    return jwt.sign({ id: user._id, username: user.username, email: user.email }, process.env.JWT_SECERET, { expiresIn: '1h' });
}

// module.exports = generateOtp;
module.exports = generateOtp;