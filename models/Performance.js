const mongoose = require('mongoose');

const performanceSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  reviewDate: { type: Date, required: true },
  score: { type: Number, min: 1, max: 10 },
  feedback: String
});

module.exports = mongoose.model('Performance', performanceSchema);
