const mongoose = require("mongoose");

const ConnectionSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Types.ObjectId,
        ref: "Profile",
        required: true,
    },
    receiver: {
        type: mongoose.Types.ObjectId,
        ref: "Profile",
        required: true,
    },
    status: {
        type: String,
        enum: ["Requested", "Accepted", "Rejected", "Blocked"],
        default: undefined,
    }
}, { timestamps: true });


const Connection = mongoose.model("Connection", ConnectionSchema);

module.exports = Connection;