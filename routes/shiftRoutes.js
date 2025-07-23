const express = require('express');
const router = express.Router();
const Shift = require('../models/Shift');

router.post('/', async (req, res) => {
  const shift = new Shift(req.body);
  await shift.save();
  res.json(shift);
});

router.get('/', async (req, res) => {
  const shifts = await Shift.find().populate('employee');
  res.json(shifts);
});

module.exports = router;
