import express from "express"

const router = express.Router();

// to modularise the endpoint, we refactor to this pattern using router
router.get("/", (req, res) => {
    res.status(200).send("you have 20 notes");
})

export default router;

// What is endpoint
// a combination of URL + HTTP method that lets 
// the client interact with a specific resource

// app.get("/api/notes", (req, res) => {
//     res.status(200).send("you have 20 notes");
// })


// app.post("/api/notes", (req, res) => {
//     // 201 means something created successfully
//     // use send/ json (send in json)
//     res.status(201).json({message: "post created successfully!"})
// })


// app.put("/api/notes/:id", (req, res) => {
//     res.status(200).json({message: "post updated successfully!"})
// })

// app.delete("/api/notes/:id", (req, res) => {
//     res.status(200).json({message: "post deleted successfully!"})
// })
