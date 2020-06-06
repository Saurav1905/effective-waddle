const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose");
const methodOverride = require("method-override");
mongoose.connect("mongodb://localhost/blog_app", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
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
// Index Routes
app.get("/blogs", async (req, res) => {
  try {
    const blogs = await Blog.find();

    res.render("index", { blogs: blogs });
  } catch (error) {
    console.error("routing in Blogs", error);
  }
});
// New Form
app.get("/blogs/new", (req, res) => {
  res.render("new");
});

// Create
app.post("/blogs", async (req, res) => {
  try {
    await Blog.create(req.body.blog);
    res.redirect("/blogs");
  } catch (error) {
    console.error("Create new blog", error);
  }
});
// Show Route
app.get("/blogs/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    res.render("blogPage", { blog: blog });
  } catch (error) {
    res.redirect("/blogs");
    console.log("BlogPage Error", error);
  }
});
// edit
app.get("/blogs/:id/edit", async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  res.render("edit", { blog: blog });
});
app.put("/blogs/:id", async (req, res) => {
  try {
    await Blog.findByIdAndUpdate(req.params.id, req.body.blog);
    res.redirect("/blogs/" + req.params.id);
  } catch (error) {
    res.redirect("/blogs");
    console.log("Editing Error", error);
  }
});
const port = 5000;
app.listen(5000, function () {
  console.log(`http://localhost:${port}`);
});
