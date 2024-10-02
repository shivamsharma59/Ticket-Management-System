const express = require('express');
const router = express.Router();
const Department = require('../models/Department.js');
const ticketRoutes = require('../routes/ticketRoutes.js');

// get all the deparments 
router.get('/', async (req, res) => {
    const departments = await Department.find();
    if (!departments) {
        return res.status(404).json({ msg: "Departments not found" });
    }
    return res.status(200).json(departments);
});

// get the tickets of the department
router.use('/ticket',ticketRoutes);

// create a new department
router.post('/', async (req, res) => {
    const { DName, description } = req.body;
    try {
        const newDepartment = await Department.create({
            departmentName: DName,
            description: description
        });
        await newDepartment.save();
        return res.status(200).json({ msg: "Department created" });
    } catch (error) {
        return res.status(400).json({ msg: "Failed to Create Department" });
    }
});

module.exports = router;