const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
    departmentName : {
        type : String,
        require : true
    },
    description : {
        type : String, 
        required : true
    },
    totalMembers : {
        type : Number, 
        default : 0
    },
    tickets : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Ticket'
    }
}, {timestamps : true});

module.exports = mongoose.model('Department', departmentSchema);