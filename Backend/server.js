const express = require("express");
const connect = require("./Utils/dbConnect.js");
const auth = require("./Routes/auth.router.js");
const cookieParser = require('cookie-parser');
const profile = require("./Routes/profile.router.js");
const postRouter = require("./Routes/post.router.js");
const cors = require("cors");
require('dotenv').config();

const app = express();
app.use(cookieParser());
app.use(express.json()); // Middleware to parse JSON payloads
app.use(cors({
    origin: ['http://localhost:3000'], // List of allowed origins
    credentials: true,
    methods: ['GET', 'POST', "PATCH", "DELETE", "PUT", "HEAD"], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
}))

// Register the `auth` router
app.use("/user", auth);
app.use("/profile", profile);
app.use("/application/api", postRouter);

// Default Route Handler
// app.get("/", (_, res) => {
//     res.status(200).json({ name: "Amit Saini", message: "Hey there, how are you?" });
// });

// Connect to Database and Start Server
(async () => {
    try {
        await connect(); // Wait for the database connection
        console.log("Database connected successfully!");

        app.listen(2000, () => {
            console.log("Server is running on port 2000");
        });
    } catch (error) {
        console.error("Failed to connect to the database:", error.message);
        process.exit(1); // Exit the application on database connection failure
    }
})();

