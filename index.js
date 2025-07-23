const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const leaveRoutes = require('./routes/leaveRoutes');
app.use('/api/leaves', leaveRoutes);

const shiftRoutes = require('./routes/shiftRoutes');
app.use('/api/shifts', shiftRoutes);

const performanceRoutes = require('./routes/performanceRoutes');
app.use('/api/performances', performanceRoutes);

const payrollRoutes = require('./routes/payrollRoutes');
app.use('/api/payrolls', payrollRoutes);


const PORT = process.env.PORT || 3000;
app.use(express.static('public'));

// ✅ Import routes
const departmentRoutes = require('./routes/departmentRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes'); // <-- ✅ Added

// ✅ Use routes
app.use('/api/departments', departmentRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/appointments', appointmentRoutes); // <-- ✅ Added

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("✅ Connected to MongoDB");
}).catch((err) => {
  console.error("❌ MongoDB connection error:", err);
});

// ✅ Root route
app.get('/', (req, res) => {
  res.send("Hospital API is live.");
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
