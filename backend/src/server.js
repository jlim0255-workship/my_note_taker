// we will build our api here
//basically the same thing, with different import ways
import express from "express" 
// const express = require("express")

import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors"

// comnfig the whole .env file
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5001

//middleware
app.use(cors({
    origin: "http://localhost:5173",
})) // allow request from UI
app.use(express.json()); //middleware to parse req.body
app.use(rateLimiter); //middleware to rate limit
app.use("/api/notes", notesRoutes);// middleware to call controllers in endpoints


// modified: connect the DB first, then listen to the server
connectDB().then( () => {app.listen(PORT, () => {
    console.log("server started on PORT:", PORT);
    })
})