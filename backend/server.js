// we will build our api here
// import express from "express" #basically the same thing, with different import ways
const express = require("express")




const app = express()
app.listen(5001, () => {
    console.log("server started on PORT:5001");
})