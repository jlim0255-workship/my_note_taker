import express from "express"
import { createNote, deleteNote, getAllNotes, getNoteById, updateNote } from "../controllers/notesController.js";
import { getGraph } from "../controllers/graphController.js";

// create a router object
const router = express.Router();

// to modularise the endpoint, we refactor to this pattern using router
router.get("/", getAllNotes)
router.get("/graph", getGraph) // get request to fetch the graph data (nodes and edges)
router.get("/:id", getNoteById)
router.post("/", createNote) // post request to create a new note
router.put("/:id", updateNote) // put request to update a note
router.delete("/:id", deleteNote)

export default router;