const Connection = require("../Models/connection.model.js");
const Profile = require("../Models/user.model.js");
const cloudinary = require("../Utils/Cloudinary.config.js");
const getDataUri = require("../Utils/DataURI.js");

const View = async (req, res) => {
    try {
        res.status(200).json({ status: "Success", profile: req.user });

    } catch (err) {
        res.status(500).send("Error Occured.");
    }
}

const Update = async (req, res) => {
    try {
        const updationAllowed = ["Name", "bio"];
        const body = req.body;
        const photo = req.file;
        const userId = req.user;
        let cloudinaryResponse;
        const areKeysPresent = Object.keys(body).every(key => updationAllowed.includes(key.toString()));
        if (!areKeysPresent) {
            return res.status(400).json({ status: "Failed", message: "Can't update field" });
        };
        if (photo) {
            const fileURI = getDataUri(photo);
            cloudinaryResponse = await cloudinary.uploader.upload(fileURI);
        }

        body.Name ? userId.Name = body.Name : userId.Name = userId.Name;
        photo ? userId.photoURL = cloudinaryResponse.secure_url : userId.photoURL = userId.photoURL;
        body.bio ? userId.bio = body.bio : userId.bio = userId.bio;
        await userId.save();
        return res.status(200).json({ status: "Success", message: "Profile updated successfully."});

    } catch (err) {
        return res.status(400).json({ status: "Failed", message: err.message });
    }
}

const SendRequest = async (req, res) => {
    try {
        const { receiverId, status } = req.params;
        const userId = req.user;

        // Validate input
        if (!receiverId || !status || status.toLowerCase() != "requested") {
            return res.status(400).json({ status: "Failed", message: "Invalid request made." });
        }

        if (receiverId == userId._id) {
            return res.status(400).json({ status: "Failed", message: "Cannot send request to yourself." });
        }
        // Check for existing connection in both directions
        const existingConnection = await Connection.findOne({
            $or: [
                { sender: userId._id, receiver: receiverId },
                { sender: receiverId, receiver: userId._id }
            ]
        });
        if (existingConnection) {
            return res.status(400).json({ status: "Failed", message: "Already a connection." });
        }

        // Validate if the receiver exists
        const validUser = await Profile.findOne({ _id: receiverId });
        if (!validUser) {
            return res.status(400).json({ status: "Failed", message: "Requested user does not exist." });
        }

        // Create a new connection
        const newConnection = new Connection({
            sender: userId._id,
            receiver: receiverId,
            status: "Requested",
        });
        await newConnection.save();

        return res.status(200).json({ status: "Success", message: "Connection created." });
    } catch (error) {
        return res.status(400).json({ status: "Failed", message: error.message });
    }
};

const ReviewConnection = async (req, res) => {
    try {
        let { requestedId, status } = req.params;
        const userId = req.user;

        const acceptedRequest = ["accepted", "rejected"];
        if (!acceptedRequest.includes(status.toLowerCase())) {
            return res.status(404).json({ status: "Failed", message: "Invalid status." })
        }

        const isConnectionExist = await Connection.findOne({
            receiver: userId,
            status: "Requested",
            sender: requestedId,
        })

        if (!isConnectionExist) {
            return res.status(404).json({ status: "Failed", message: "Connection Request not found." })
        }
        if (status.toLowerCase() === "accepted") {
            status = "Accepted";
        }
        else if (status.toLowerCase() === "rejected") {
            status = "Rejected";
        }
        isConnectionExist.status = status;
        await isConnectionExist.save();
        return res.status(200).json({ status: "Success", message: "Conection Confirmed." });

    }
    catch (err) {
        return res.status(400).json({ status: "Failed", message: err.message });
    }
}

const ViewConnections = async (req, res) => {
    try {
        const userId = req.user;
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const skip = (page - 1) * limit;
        const type = req.query.type.toLowerCase();
        const allowedType = ["followers", "following", "friends"];
        const isPresent = allowedType.includes(type);
        if (!isPresent) {
            return res.status(401).json({ status: "Failed", message: "Invalid Type" });
        }
        let requiredList = undefined;
        if (type == "followers") {
            requiredList = await Connection.find({
                $or: [
                    { receiver: userId._id },
                    { sender: userId._id, status: "Accepted" }
                ]
            }).select("sender receiver");
        }
        else if (type == "following") {
            requiredList = await Connection.find({
                $or: [
                    { sender: userId._id },
                    { receiver: userId._id, status: "Accepted" }
                ]
            }).select("sender receiver");
        }
        else if (type == "friends") {
            requiredList = await Connection.find({
                $or: [
                    { sender: userId._id, status: "Accepted" },
                    { receiver: userId._id, status: "Accepted" }
                ]
            }).select("sender receiver");
        }
        const allConnections = new Set();
        requiredList.forEach((entry) => {
            allConnections.add(entry.sender.toString());
            allConnections.add(entry.receiver.toString());
        });

        const userFeed = await Profile.find({
            _id: {
                $in: Array.from(allConnections),
                $ne: userId._id
            }
        }).select("Name bio photoURL").skip(skip).limit(limit);

        return res.status(200).json({ status: "Success", message: userFeed });

    } catch (err) {
        return res.status(400).json({ status: "Failed", message: err.message });
    }
}

const Feed = async (req, res) => {
    try {
        const userId = req.user;
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const skip = (page - 1) * limit;
        const allConnections = await Connection.find({
            $or: [
                { sender: userId._id },
                { receiver: userId._id },
            ]
        }).select("sender receiver");

        const connectionSet = new Set();

        allConnections.forEach((entry) => {
            connectionSet.add(entry.sender.toString());
            connectionSet.add(entry.receiver.toString());
        });


        const userFeed = await Profile.find({
            _id: {
                $nin: Array.from(connectionSet),
                $ne: userId._id
            }
        }).select("Name").skip(skip).limit(limit);

        return res.status(200).json({ status: "Success", message: userFeed });

    } catch (err) {
        return res.status(400).json({ status: "Failed", message: err.message });
    }
}

module.exports = { View, Update, SendRequest, ReviewConnection, ViewConnections, Feed };
