const express = require("express");
const rout = express.Router();
const {
  adminPage,
  adminRegister,
  adminLogin,
  isAdminAuth,
  adminLogout,
  adminloginform,
  addEmployeeform,
  addEmployee,
  activateDeactivate,
  taskform,
  addtaskform,
} = require("../controller/Admin");

// Admin
rout.get("/", isAdminAuth, adminPage);
rout.get("/logoutadmin", adminLogout);
rout.post("/registeradmin", adminRegister);
rout.get("/adminlogin", adminloginform);
rout.post("/adminlogin", adminLogin);

// Employee
rout.get("/addemployee", isAdminAuth, addEmployeeform);
rout.post("/addemployee", isAdminAuth, addEmployee);
rout.get("/status", isAdminAuth, activateDeactivate);
rout.get("/addtask", isAdminAuth, taskform);
rout.post("/addtask", isAdminAuth, addtaskform);

exports.rout = rout;
