require("dotenv").config();
const express = require("express");
const app = express();
const multer = require("multer");
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 限制文件大小為 5MB
  },
});
const postController = require("./postController");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.listen(3000, "0.0.0.0", () => {
  console.log("Server is running on port 3000");
});

app.get("/", postController.getAllPosts);
app.post("/post", upload.single("image"), postController.createPost);
