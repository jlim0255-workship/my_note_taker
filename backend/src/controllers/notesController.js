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
        const notes = await Note.find()
        res.status(200).json(notes)

    }catch(error){
        console.log("Error in getAllNotes controller", error)
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

export function updateNote(req, res){
    // res.status(200).json({message: "Note updated successfully!"})
    try{
        const


    }catch(error){

    }
}


export function deleteNote(req, res){
    res.status(200).json({message: "Note deleted successfully!"})
}