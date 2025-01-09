const cloudinary = require("../Utils/Cloudinary.config");
const getDataUri = require("../Utils/DataURI");
const Post = require("../Models/post.model");
const Comment = require("../Models/comment.model");

const CreatePost = async (req, res) => {
    try {
        const loggedUser = req.user;
        const { caption } = req.body;
        const uploadedPost = req.files;
        const uploadedImages = [];
        if (uploadedPost) {
            for (const file of uploadedPost) {
                const fileUri = getDataUri(file); // Convert file to Data URI
                const cloudinaryResponse = await cloudinary.uploader.upload(fileUri); // Upload to Cloudinary
                uploadedImages.push(cloudinaryResponse.secure_url); // Store the URL of the uploaded image
            }
        }
        const newPost = new Post({
            author: loggedUser._id,
            media: uploadedImages,
            caption: caption
        });
        await newPost.save();
        return res.status(200).json({ success: true, message: "Post created successfully." })

    } catch (error) {
        res.status(500).json({ status: "Failed", message: "Error occured! Please try again" });
    }
}

const GetUserPosts = async (req, res) => {
    try {
        const loggedUser = req.user;
        const limit = req.query.limit;
        const page = req.query.page;
        const skip = (page - 1) * limit;

        const allPosts = await Post.find({
            author: loggedUser._id
        }).select("media capion like comments").populate("author", "Name").populate({
            path: "comments", // Populate the comments array
            select: "text user", // Include only 'text' and 'user' fields from Comment
            populate: {
                path: "user", // Populate the 'user' field inside each comment
                select: "Name", // Include only 'Name' field from the Profile
            },
        }).populate({
            path: "like",
            select: "Name"
        })
        .skip(skip).limit(limit);
        if (!allPosts) {
            return res.status(400).json({ success: "Failed", message: "You haven't created any post. Make your post" });
        }

        return res.status(200).json({ success: "Success", data: allPosts });


    } catch (error) {
        res.status(500).json({ status: "Failed", message: "Error occured! Please try again" });
    }

}

const GetFeedPosts = async (req, res) => {
    try {

        const loggedUser = req.user;
        const limit = req.query.limit;
        const page = req.query.page;
        const skip = (page - 1) * limit;

        const feedPosts = await Post.find({

            $or: [
                { author: loggedUser._id }, // Posts by logged user
                { author: { $ne: loggedUser._id } },
            ],

        }).populate("author", "Name").populate({
            path: "comments", // Populate the comments array
            select: "text user", // Include only 'text' and 'user' fields from Comment
            populate: {
                path: "user", // Populate the 'user' field inside each comment
                select: "Name", // Include only 'Name' field from the Profile
            },
        }).skip(skip).limit(limit);
        const response = new Array();
        feedPosts.forEach((entry) => {
            response.push({
                _id: entry._id,
                author: entry.author.Name,
                media: entry.media,
                likes: entry.like.length,
                comments: entry.comments,
                date: new Date(entry.createdAt.getTime()),
            })
        });
        return res.status(200).json({ success: "Success", message: "Your Feed", data: response });

    } catch (error) {
        res.status(500).json({ status: "Failed", message: "Error occured! Please try again" });
    }
}

const CommentAndLike = async (req, res) => {
    try {
        const loggedUser = req.user;
        const { postId, like, comment } = req.body;

        if (!postId || (!comment && !like)) {
            return res.status(400).json({ status: "Failed", message: "Invalid input" });
        }

        // Fetch the post data
        const PostData = await Post.findById(postId);
        if (!PostData) {
            return res.status(404).json({ status: "Failed", message: "Post not found" });
        }
        let commentObj;
        if (comment) {
            commentObj = new Comment({
                text: comment.toString(),
                user: loggedUser._id,
                postId: postId,
            })
            let commentResp = await commentObj.save();
            PostData.comments.push(commentResp._id);
        }

        if (like && !PostData.like.includes(loggedUser._id)) {
            PostData.like.push(loggedUser._id);
        }
        await PostData.save();
        return res.status(200).json({ success: true, message: "comment added successfully" });

    } catch (error) {
        res.status(500).json({ status: "Failed", message: "Error occured! Please try again" });
    }
}


module.exports = { CreatePost, GetUserPosts, GetFeedPosts, CommentAndLike };