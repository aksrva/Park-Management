// Admin--- user ID, password.
const mongoose = require("mongoose");
const { Schema } = mongoose;
const adminSchema = new Schema({
  userId: { type: String, required: true, lowercase: true, unique: true },
  password: { type: String, required: true },
});
exports.Admin = mongoose.model("Admin", adminSchema); // model of Admin
