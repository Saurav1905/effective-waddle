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
Blog.create({
  title: "NBA owners, executives feeling hopeful for return of season",
  image:
    "https://cdn.vox-cdn.com/thumbor/vMb6EjjbZ0uN3NwBLN3UegRGRto=/0x0:2943x1962/920x613/filters:focal(1224x119:1694x589):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/66790111/1206534537.jpg.0.jpg",
  body:
    "It should go without saying that it’s critical the NBA doesn’t try to rush the return of games. There are so many important factors besides just the health of players and team personnel, who shouldn’t be returning before it’s completely safe to do so (for instance, the league also needs to consider the wellbeing of families, the availability of tests, and what effects coronavirus could have on someone after they’ve had it).",
});

app.listen(process.env.PORT, process.env.IP, function () {
  console.log("Blog Running...");
});
