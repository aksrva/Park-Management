// employee--- user ID, password.
const mongoose = require("mongoose");
const { Schema } = mongoose;
const employeeSchema = new Schema({
  employeeId: { type: String, required: true, lowercase: true, unique: true },
  employeeName: { type: String, required: true, lowercase: true },
  employeeMobile: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  status: { type: Boolean, default: false, unique: false },
  attendance: { type: Array },
  tasks: [
    {
      task: String,
      assigningTask: String,
      timing: String,
      taskStatus: { type: Boolean, default: false },
    },
  ],
  password: { type: String, required: true, unique: false },
});
exports.Employee = mongoose.model("Employee", employeeSchema); // Model of Employee
