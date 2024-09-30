const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
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
    }
}, { timestamps: true });

module.exports = mongoose.model('Ticket', ticketSchema);