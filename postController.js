//具體處理邏輯
const { getAllPosts, createPost, uploadImageToS3 } = require("./model");
const CLOUDFRONT_DOMAIN = "d2pw2kawgarfl9.cloudfront.net";

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

    // if (req.file) {
    //   imageUrl = await uploadImageToS3(req.file);
    // }
    if (req.file) {
      // 上傳圖片到 S3
      const s3Key = await uploadImageToS3(req.file);

      // 使用 CloudFront 域名build URL
      imageUrl = `https://${CLOUDFRONT_DOMAIN}/${s3Key}`;
    }
    await createPost(content, imageUrl);
    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};
