const express = require("express");
const { signUp, signIn, newOtp, logout } = require("../Controllers/Authentication.js");
const {isSignIn, verify} = require("../Middlewares/isSignIn.js");

const auth = express.Router();

auth.post("/signUp", signUp);
auth.post("/signIn", signIn);
auth.get("/verify", verify);
auth.post("/newOtp", newOtp);
auth.post("/logout", logout);

module.exports = auth;
