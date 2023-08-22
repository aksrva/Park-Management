const express = require("express");
const rout = express.Router();
const {
  employeeloginform,
  employeeLogin,
  employeePage,
  isEmployeeAuth,
  employeeLogout,
  employeeWorkUpdate,
  employeeAttendance,
} = require("../controller/Employee");

rout.get("/", isEmployeeAuth, employeePage);
rout.get("/loginemployee", employeeloginform);
rout.post("/employeelogin", employeeLogin);
rout.get("/employeelogout", isEmployeeAuth, employeeLogout);
rout.get("/taskstatus", isEmployeeAuth, employeeWorkUpdate);
rout.get("/attendance", isEmployeeAuth, employeeAttendance);

exports.rout = rout;
