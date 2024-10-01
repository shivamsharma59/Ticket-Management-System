const mongoose = require('mongoose');

var validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
};

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address']
    },
    password: {
        type: String,
        require: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    idAdmin: {
        type: Boolean,
        default: false
    },
    token: {
        type: String,
        default: null
    },
    otp: {
        type: String
    },
    otpExpires: {
        type: Date
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);