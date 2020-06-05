const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/blog_app", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Schema
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  created: { type: Date, default: Date.now },
});
const Blog = mongoose.model("blog", blogSchema);

// Routes
app.get("/", (req, res) => {
  res.redirect("/blogs");
});
app.get("/blogs", async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.render("index", { blogs });
  } catch (error) {
    console.error("routing in Blogs", error);
  }
});

const port = 5000;
app.listen(5000, function () {
  console.log(`http://localhost:${port}`);
});
