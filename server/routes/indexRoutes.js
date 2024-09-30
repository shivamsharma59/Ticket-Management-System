const express = require('express');
const router = express.Router();

const departmentRotues = require('./departmentRoutes.js');
const ticketRoutes = require('./ticketRoutes.js');
const authRoutes = require('./authRoutes.js');
router.use('/department', departmentRotues);
router.use('/ticket',ticketRoutes);
router.use('/auth',authRoutes);

module.exports = router;