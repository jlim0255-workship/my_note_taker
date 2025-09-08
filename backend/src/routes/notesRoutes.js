import express from "express"
import { createNote, deleteNote, getAllNotes, updateNote } from "../controllers/notesController.js";

const router = express.Router();

// to modularise the endpoint, we refactor to this pattern using router
router.get("/", getAllNotes)
router.post("/", createNote)
router.put("/:id", updateNote)
router.delete("/:id", deleteNote)

export default router;