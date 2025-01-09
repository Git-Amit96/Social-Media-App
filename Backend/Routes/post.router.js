const express = require("express");
const { CreatePost, GetUserPosts, GetFeedPosts } = require("../Controllers/Post.js");
const isSignIn = require("../Middlewares/isSignIn.js");
const upload = require("../Middlewares/multer.config.js");

const postRouter = express.Router();

postRouter.post("/create-post", isSignIn, upload.array("uploadedPost", 5), CreatePost);
postRouter.get("/get-user-posts", isSignIn, GetUserPosts);
postRouter.get("/get-feed-posts", isSignIn, GetFeedPosts);

module.exports = postRouter;

