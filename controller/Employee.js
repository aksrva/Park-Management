const { Employee } = require("../models/Employee");

// Employee Page
exports.employeePage = async (req, res) => {
  const empId = req.session.employeeId;
  const tasks = await Employee.findOne(
    { employeeId: empId },
    "tasks attendance -_id"
  );
  const attendance = tasks.attendance;
  let todayMark = false;
  const date = new Date();
  for (let attend of attendance) {
    if (attend === date.toDateString()) {
      todayMark = true;
    }
  }
  res.render("employee", { tasks: tasks.tasks, todayMark, attendance });
};

// Employee Change Work status
exports.employeeWorkUpdate = async (req, res) => {
  const taskId = req.query.id;
  let status = req.query.status;

  const resp = await Employee.updateOne(
    { employeeId: req.session.employeeId, "tasks._id": taskId },
    {
      $set: {
        "tasks.$.taskStatus": status,
      },
    }
  );
  res.redirect("/employee");
};

// login
exports.employeeloginform = (req, res) => {
  const error = req.query.error || "";
  res.render("form", { employee: true, error });
};

exports.employeeLogin = async (req, res) => {
  try {
    req.session = req.session || {};
    const { userId, password } = req.body;
    const isEmployee = await Employee.findOne({
      employeeId: userId,
      status: true,
    });
    if (!isEmployee) {
      throw new Error("Contact to your Administrator");
    }
    isPassmatch = (await password) == isEmployee.password;
    if (!isPassmatch) {
      throw new Error("Invalid password");
    }
    req.session.isEmployeeAuth = true;
    req.session.employeeId = userId;
    res.redirect("/employee");
  } catch (err) {
    console.log("Employee Login Error" + err.message);
    res.redirect("loginemployee?error=" + err.message);
  }
};
// Employee Attendance
exports.employeeAttendance = async (req, res) => {
  const empId = req.session.employeeId;
  const date = new Date();
  let todayMark = false;
  const tasks = await Employee.findOne(
    { employeeId: empId },
    "attendance -_id"
  );
  const attendance = tasks.attendance;
  for (let attend of attendance) {
    if (attend === date.toDateString()) {
      todayMark = true;
    }
  }
  if (!todayMark) {
    const resp = await Employee.updateOne(
      { employeeId: empId },
      { $push: { attendance: date.toDateString() } }
    );
  }
  res.redirect("/employee");
};

// admin login verified
exports.isEmployeeAuth = (req, res, next) => {
  if (req.session.isEmployeeAuth) {
    next();
  } else {
    res.redirect("/employee/loginemployee");
  }
};

// logout
exports.employeeLogout = (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    return res.redirect("/");
  });
};
