// we will build our api here
//basically the same thing, with different import ways
import express from "express" 
// const express = require("express")

import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";

// comnfig the whole .env file
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5001

connectDB();

app.use("/api/notes", notesRoutes);


app.listen(PORT, () => {
    console.log("server started on PORT:", PORT);
})

// 