const { Admin } = require("../models/Admin");
const { Employee } = require("../models/Employee");

//! Employee
// Add Employee
exports.addEmployeeform = (req, res) => {
  res.render("add_employee");
};
exports.addEmployee = async (req, res) => {
  try {
    const newEmployee = new Employee(req.body);
    const response = await newEmployee.save();
    res.redirect("/admin");
  } catch (err) {
    console.log("Admin add Employee Error" + err.message);
    res.status(400).json({ ERROR: err.message });
  }
};

// activate deactivate
exports.activateDeactivate = async (req, res) => {
  const id = req.query.id;
  let status = false;
  const checkStatus = await Employee.findOne({ employeeId: id }, "status -_id");
  if (checkStatus.status == false) {
    status = true;
  }

  const response = await Employee.updateOne(
    {
      employeeId: id,
    },
    { $set: { status: status } }
  );
  res.redirect("/admin");
};

// task add
exports.taskform = (req, res) => {
  const id = req.query.id;
  res.render("taskform", { id });
};
exports.addtaskform = async (req, res) => {
  try {
    const employeeId = req.body.employeeId;
    let tasks = req.body.task;
    const date = new Date();
    const assigningTask = date.toDateString();
    const timing = req.body.timing;
    tasks = tasks.trim().split(",");
    for (let task of tasks) {
      task = task + `( ${timing} )`;
      const response = await Employee.updateOne(
        {
          employeeId: employeeId,
        },
        { $push: { tasks: { task, assigningTask, timing } } }
      );
    }
    res.redirect("/admin");
  } catch (err) {
    console.log("ERROR Task Update" + err.message);
    res.redirect("/admin");
  }
};
// Admin Register
exports.adminRegister = async (req, res) => {
  try {
    const newAdmin = new Admin(req.body);
    const response = await newAdmin.save();
    res.status(200).json({ Suceess: "success" });
  } catch (err) {
    console.log("Admin Register Error" + err.message);
    res.status(400).json({ ERROR: err.message });
  }
};

// Admin login
exports.adminloginform = (req, res) => {
  let error = req.query.error || "";
  res.render("form", { admin: true, error });
};
exports.adminLogin = async (req, res) => {
  try {
    req.session = req.session || {};
    const { userId, password } = req.body;
    const isAdmin = await Admin.findOne({ userId: userId });
    if (!isAdmin) {
      throw new Error("User is not exists");
    }
    isPassmatch = (await password) == isAdmin.password;
    if (!isPassmatch) {
      throw new Error("Invalid password");
    }
    req.session.isAdminAuth = true;
    res.redirect("/admin");
  } catch (err) {
    console.log("Admin Login Error" + err.message);
    res.redirect("adminlogin?error=" + err.message);
  }
};
// Admin Page
exports.adminPage = async (req, res) => {
  const employeelist = await Employee.find({});
  const attendance = employeelist[0].attendance;
  let todayMark = false;
  const date = new Date();
  for (let attend of attendance) {
    if (attend === date.toDateString()) {
      todayMark = true;
    }
  }
  employeelist.todayMark = todayMark;
  res.render("admin", { employeelist, todayMark });
};

// admin login verified
exports.isAdminAuth = (req, res, next) => {
  if (req.session.isAdminAuth) {
    next();
  } else {
    res.redirect("admin/adminlogin");
  }
};

// logout
exports.adminLogout = (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    return res.redirect("/");
  });
};
