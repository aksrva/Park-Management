const express = require("express");
const mongoose = require("mongoose");
const hbs = require("hbs");
const app = express();
const mongouri = "mongodb://127.0.0.1:27017/park";
const path = require("path");
const PORT = process.env.PORT || 3000;
const bodyParser = require("body-parser");
const abspath = path.join(__dirname, "public");
const adminRout = require("./routes/Admin");
const employeeRout = require("./routes/Employee");
const homeRout = require("./routes/Home");
// session
const session = require("express-session");
const mongoSession = require("connect-mongodb-session")(session);

// set the abspath
app.use(express.static(abspath));

// set view engine
app.set("view engine", "hbs");
app.set("views", abspath + "/views");
app.use(express.json());

// body parser
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
// Connect the database
mongoose
  .connect(mongouri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected"))
  .catch((err) => console.log("not connected" + err));

//   session
const store = new mongoSession({
  uri: mongouri,
  collection: "session",
});
app.use(
  session({
    secret: "secretkeyprovided",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);
// routing
app.use("/", homeRout.rout);
app.use("/admin", adminRout.rout);
app.use("/employee", employeeRout.rout);

// server listening
app.listen(PORT, () => {
  console.log(`Server is connected`);
});
