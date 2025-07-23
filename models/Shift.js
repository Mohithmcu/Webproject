const mongoose = require('mongoose');

const shiftSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  date: { type: Date, required: true },
  shiftType: { type: String, enum: ['Morning', 'Afternoon', 'Night'], required: true }
});

module.exports = mongoose.model('Shift', shiftSchema);
