//具體處理邏輯
const { getAllPosts, createPost, uploadImageToS3 } = require("./model");

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await getAllPosts();
    res.render("index", { posts });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

exports.createPost = async (req, res) => {
  try {
    const { content } = req.body;
    let imageUrl = "";

    if (req.file) {
      imageUrl = await uploadImageToS3(req.file);
    }

    await createPost(content, imageUrl);
    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};
