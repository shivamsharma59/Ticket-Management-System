const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    department : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Department'
    },
    title: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true
    },
    messages : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Message'
    },
    status : {
        type : String,
        enum : ['pending', 'resolved'],
        default : 'pending'
    }
}, { timestamps: true });

module.exports = mongoose.model('Ticket', ticketSchema);