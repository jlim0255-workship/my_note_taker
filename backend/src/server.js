// we will build our api here
//basically the same thing, with different import ways
import express from "express" 
// const express = require("express")

import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors"
import path from "path"


// comnfig the whole .env file
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5001

// create a variable (source of backend)
const __dirname = path.resolve()

//middleware
// only do this in development
if (process.env.NODE_ENV !== "production"){
    app.use(cors({
    origin: "http://localhost:5173",
    })) // allow request from UI
}


app.use(express.json()); //middleware to parse req.body
app.use(rateLimiter); //middleware to rate limit
app.use("/api/notes", notesRoutes);// middleware to call controllers in endpoints

// only do this in production
if (process.env.NODE_ENV === "production"){
    // serve the optimized react app (frontend dist) as a static assest
    // go one layer up to frontend to get dist
    // make the front end alive and built
    app.use(express.static(path.join(__dirname, "../frontend/dist")))


    // when they visit any route, just give the respective route in front end view
    app.get("*", (req, res) =>{
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
    })
}


// modified: connect the DB first, then listen to the server
connectDB().then( () => {app.listen(PORT, () => {
    console.log("server started on PORT:", PORT);
    })
})