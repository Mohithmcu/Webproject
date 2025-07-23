const express = require('express');
const router = express.Router();
const Performance = require('../models/Performance');

router.post('/', async (req, res) => {
  const perf = new Performance(req.body);
  await perf.save();
  res.json(perf);
});

router.get('/', async (req, res) => {
  const performances = await Performance.find().populate('employee');
  res.json(performances);
});

module.exports = router;
