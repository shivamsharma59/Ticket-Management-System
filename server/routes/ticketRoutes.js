const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket.js');
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
    const department = await Department.find({ departmentId });
    if (!department) return res.status(404).json({ msg: "Department not exists" });
    const newTicket = await Ticket.create({
        user: req.user.id,
        department: departmentId,
        title: title,
        description: description,
    });
    await newTicket.save();
    return res.status(201).json({ msg: "Ticket Created Successfully!" });
});

module.exports = router;