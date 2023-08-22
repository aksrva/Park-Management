const express = require("express");
const rout = express.Router();
const { homePage } = require("../controller/Home");

rout.get("/", homePage);

exports.rout = rout;
