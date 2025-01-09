const express = require("express");
const isSignIn = require("../Middlewares/isSignIn.js");
const { View, Update, SendRequest, ReviewConnection, ViewConnections, Feed } = require("../Controllers/Profile.js");
const upload = require("../Middlewares/multer.config.js");

const profile = express.Router();

profile.get("/view", isSignIn, View); //* To view user profile
profile.post("/update", isSignIn, upload.single("photo"), Update); //* To update user profile
profile.post("/connect/:receiverId/:status", isSignIn, SendRequest); //* To send connection request
profile.post("/review/:requestedId/:status", isSignIn, ReviewConnection); //* To review connection request
profile.get("/connections", isSignIn, ViewConnections); //* To get all connections list
profile.get("/feed", isSignIn, Feed); //* To show user's feed

module.exports = profile;
