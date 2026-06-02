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
import {sql} from "./config/db.js"
import morgan from "morgan"
import helmet from "helmet"


// comnfig the whole .env file
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5001

app.use(morgan("dev"))
app.use(helmet())
app.use(express.json())

async function initDB() {
    try {
        await sql`CREATE TABLE IF NOT EXISTS notes (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            content TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`
        console.log("Database initialized successfully!")
        
    } catch (error) {
        console.error("Error initializing database:", error)
    }
}

//middleware
// only do this in development
if (process.env.NODE_ENV !== "production"){
    app.use(cors({
    // origin: "http://localhost:5173",
    origin: '*',

    })) // allow request from 
}

// app.use(rateLimiter); //middleware to rate limit
app.use("/api/notes", notesRoutes);// middleware to call controllers in endpoints

// modified: connect the DB first, then listen to the server
initDB().then( () => {app.listen(PORT, () => {
    console.log("server started on PORT:", PORT);
    })
})