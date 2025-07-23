const express = require('express');
const router = express.Router();
const Payroll = require('../models/Payroll');

router.post('/', async (req, res) => {
  const payroll = new Payroll(req.body);
  await payroll.save();
  res.json(payroll);
});

router.get('/', async (req, res) => {
  const payrolls = await Payroll.find().populate('employee');
  res.json(payrolls);
});

module.exports = router;
