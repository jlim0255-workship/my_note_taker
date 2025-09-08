// we will build our api here
//basically the same thing, with different import ways
import express from "express" 
// const express = require("express")

import notesRoutes from "./routes/notesRoutes.js"

const app = express()

app.use("/api/notes", notesRoutes);


app.listen(5001, () => {
    console.log("server started on PORT:5001");
})