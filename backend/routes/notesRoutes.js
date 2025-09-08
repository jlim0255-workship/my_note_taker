import express from "express"

const router = express.Router();

// to modularise the endpoint, we refactor to this pattern using router
router.get("/", (req, res) => {
    res.status(200).send("You just fetched the notes");
})

router.post("/", (req, res) => {
    res.status(200).send("Note created successfully");
})

router.put("/:id", (req, res) => {
    res.status(200).json({message: "Note updated successfully!"})
})

router.delete("/:id", (req, res) => {
    res.status(200).json({message: "Note deleted successfully!"})
})

export default router;