// two ways to doing this: 
// 1) the arrow function way
// export const getAllNotes = (req, res) => {
//     res.status(200).send("You just fetched the notes");
// }

// 2) the normal function way
import Note from "../models/Note.js"


// RETRIEVE ALL NOTES
export async function getAllNotes(req, res) {
    try{
        const notes = await Note.find().sort({createdAt: -1}) // .-1 newest first, 1 older first
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
        const note = await Note.findById(req.params.id)
        if (!note) return res.status(404).json({message: "Note not found"})            
        res.status(200).json(note)

    }catch(error){
        console.log("Error in getNoteById controller", error)
        res.status(500).json({message: "Internal server error"})

    }

}

// CREATE NEW NOTE
export async function createNote(req, res) {
    // res.status(200).send("Note created successfully");
    try{
        // TODO: why the below does not work?
        // const {user_title, user_content} = req.body
        // const newNote = new Note({title: user_title, content: user_content})

        const {title, content} = req.body

        // old way
        // const newNote = new Note({title, content})
        // await newNote.save()
        // res.status(201).json({message:"Note created successfully!"})
        
        // another way of putting content in the newly created note
        // with better clarity
        const note = new Note({title, content})
        const savedNote = await note.save()        
        res.status(201).json(savedNote)
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

        //we called it id because it is id in the put request in notesRoutes.js
        // update the new title and content, based on the id

        // old way
        // await Note.findByIdAndUpdate(req.params.id, {title, content})

        // better way
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, {title, content})
        
        // leave message if note not found
        if (!updatedNote) return res.status(404).json({message:"Note not found!"})
        
        // leave successful message
        res.status(200).json({message: "Note updated successfully"})

    }catch(error){
        console.log("Error in updateNote controller", error)
        res.status(500).json({message: "Internal server error"})
    }
}

// DELETE A NOTE BY ID
export async function deleteNote(req, res){
    // res.status(200).json({message: "Note deleted successfully!"})
    try{
        // only need the note id to delete that note        
        const updatedNote = await Note.findByIdAndDelete(req.params.id)
        
        // leave message if note not found
        if (!updatedNote) return res.status(404).json({message:"Note not found!"})
        
        // leave successful message
        res.status(200).json({message: "Note deleted successfully"})

    }catch(error){
        console.log("Error in deleteNote controller", error)
        res.status(500).json({message: "Internal server error"})
    }
}