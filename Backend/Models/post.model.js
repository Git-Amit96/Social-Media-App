const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Profile"
    },

    media: [{
        type: String,
        required: true
    }],

    like: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profile"
    }],

    caption: {
        type: String,
        default: ""
    },

    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }]
},
{
    timestamps: true
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;