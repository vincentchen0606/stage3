//資料庫操作
const mysql = require("mysql2/promise");
const AWS = require("aws-sdk");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

async function getAllPosts() {
  const [rows] = await pool.query(
    "SELECT * FROM posts ORDER BY content_time DESC"
  );
  return rows;
}

async function createPost(content, imageUrl) {
  const [result] = await pool.query(
    "INSERT INTO posts (content, content_time, content_url) VALUES (?, NOW(), ?)",
    [content, imageUrl]
  );
  return result.insertId;
}

async function uploadImageToS3(file) {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${Date.now()}-${file.originalname}`,
    Body: file.buffer,
  };

  const result = await s3.upload(params).promise();
  return result.Location;
}

module.exports = { getAllPosts, createPost, uploadImageToS3 };
