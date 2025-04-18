const  jwt  = require("jsonwebtoken");
const Profile = require("../Models/user.model");

const isSignIn = async(req, res, next)=>{
    try {
        const token = req.cookies.Token;
        if(!token){
            throw new Error("Access Denied");
        }
        const decoded = jwt.verify(token, "Auth@12345");

        const user = await Profile.findOne({_id: decoded.id});

        if (!user) {
            return res.status(400).json({ status: "Error", message: "User not found. Please Sign Up." });
        }
        
        req.user = user;
        next();  
    } catch (err) {
        res.status(500).json({ status: "Failed", message: err.message });
    }
}


const verify = async(req,res)=>{
    try {
        const token = req.cookies.Token;
        if(!token){
            throw new Error("Access Denied");
        }
        const decoded = jwt.verify(token, "Auth@12345");

        const user = await Profile.findOne({_id: decoded.id});

        if (!user) {
           
            return res.status(400).json({ status: "Error", message: "User not found. Please Sign Up." });
        }
        req.user = user;
        return res.status(200).json({ ok: true, data: user });
    } catch (err) {
        
        res.status(500).json({ status: "Failed",  });
    }
}

module.exports= {isSignIn, verify};