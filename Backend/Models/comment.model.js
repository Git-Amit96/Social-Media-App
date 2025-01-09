const mongoose= require("mongoose");

const CommentSchema= new mongoose.Schema({
    text:{
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profile",
        required: true
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true
    }
},
{
    timestamps: true
});

const Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;
