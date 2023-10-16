
const express = require("express");
const adminRoute = express.Router();

const admins = require("../db/admins");

adminRoute.get("/", (req, res) => {
    res.send(admins);
  });
  
module.exports = adminRoute;