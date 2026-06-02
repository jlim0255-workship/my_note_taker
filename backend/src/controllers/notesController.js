// two ways to doing this: 
// 1) the arrow function way
// export const getAllNotes = (req, res) => {
//     res.status(200).send("You just fetched the notes");
// }

// 2) the normal function way
import Note from "../models/Note.js"
import {sql} from "../config/db.js"


// RETRIEVE ALL NOTES
export async function getAllNotes(req, res) {
    try{
        const notes = await sql`SELECT * FROM notes ORDER BY created_at DESC`
        res.status(200).json(notes)

    }catch(error){
        console.log("Error in getAllNotes controller", error)
        res.status(500).json({message: "Internal server error"})

    }
    
}

// GET A NOTE BY ID
export async function getNoteById(req, res) {
    // get id from the URL if there is
    try{
        const note = await sql`SELECT * FROM notes WHERE id = ${req.params.id}`

        if (note.length === 0) return res.status(404).json({message: "Note not found"})

        res.status(200).json({data: note[0], message: "Note fetched successfully!"})

    }catch(error){
        console.log("Error in getNoteById controller", error)
        res.status(500).json({message: "Internal server error"})

    }

}

// CREATE NEW NOTE
export async function createNote(req, res) {
    // res.status(200).send("Note created successfully");
    try{
        const {title, content} = req.body

        const newNote = await sql`INSERT INTO notes (title, content) VALUES (${title}, ${content}) RETURNING *`
        res.status(201).json({data: newNote[0], message: "Note created successfully!"})

    } catch(error){
        console.log("Error in createNote controller", error)
        res.status(500).json({message: "Internal server error"})
    }
}

export async function updateNote(req, res){
    // res.status(200).json({message: "Note updated successfully!"})
    try{
        // get the updated title and content from the user request
        // ONLY UPDATE the params passed in (still works if we just pass the title or content)
        const {title, content} = req.body

        const updatedNote = await sql`UPDATE notes SET title = ${title}, content = ${content} WHERE id = ${req.params.id} RETURNING *`
        if (updatedNote.length === 0) return res.status(404).json({message: "Note not found!"})
        res.status(200).json({ data: updatedNote[0], message: "Note updated successfully" })

    }catch(error){
        console.log("Error in updateNote controller", error)
        res.status(500).json({message: "Internal server error"})
    }
}

// DELETE A NOTE BY ID
export async function deleteNote(req, res){
    // res.status(200).json({message: "Note deleted successfully!"})
    try{

        const deletedNote = await sql`DELETE FROM notes WHERE id = ${req.params.id} RETURNING *`
        if (deletedNote.length === 0) return res.status(404).json({message: "Note not found!"})
        res.status(200).json({ data: deletedNote[0], message: "Note deleted successfully" })

    }catch(error){
        console.log("Error in deleteNote controller", error)
        res.status(500).json({message: "Internal server error"})
    }
}