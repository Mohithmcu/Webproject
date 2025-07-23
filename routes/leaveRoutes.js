const express = require('express');
const router = express.Router();
const Leave = require('../models/Leave');

router.post('/', async (req, res) => {
  const leave = new Leave(req.body);
  await leave.save();
  res.json(leave);
});

router.get('/', async (req, res) => {
  const leaves = await Leave.find().populate('employee');
  res.json(leaves);
});

router.patch('/:id/status', async (req, res) => {
  const { status } = req.body;
  const leave = await Leave.findByIdAndUpdate(req.params.id, { status }, { new: true });
  res.json(leave);
});

module.exports = router;
