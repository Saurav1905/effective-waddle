const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/blog_app");
app.set("view engine", ejs);
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
