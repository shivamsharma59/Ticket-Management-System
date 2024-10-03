const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket.js');
const mongoose = require('mongoose');
const Department = require('../models/Department.js');
const User = require('../models/User.js');
const auth = require('../middlewares/authMiddleware.js');

// Get all the tickets of the departments 
router.get('/:id', async (req, res) => {
    const departmentId = req.params.id;
    const tickets = await Ticket.find({ department: departmentId });
    if (!tickets) return res.status().json({ msg: "No Tickets available" });
    return res.status(200).json(tickets);
});

// create new ticket in the department
router.post('/:id', auth, async (req, res) => {
    const { title, description } = req.body;
    const departmentId = req.params.id;

    console.log("Request Body:", req.body);
    console.log("Department ID:", departmentId);

    // Check if departmentId is valid
    if (!mongoose.Types.ObjectId.isValid(departmentId)) {
        return res.status(400).json({ msg: "Invalid department ID" });
    }

    try {
        const department = await Department.findById(departmentId);
        if (!department) {
            return res.status(404).json({ msg: "Department does not exist" });
        }

        const newTicket = new Ticket({
            user: req.user.id,
            title: title,
            description: description,
            department: departmentId
        });

        console.log("New Ticket before saving:", newTicket);

        await newTicket.save();
        console.log("Ticket saved successfully!");

        return res.status(201).json({ msg: "Ticket Created Successfully!" });
    } catch (error) {
        console.error("Error creating ticket:", error);
        return res.status(500).json({ msg: "Error creating ticket" });
    }
});


module.exports = router;