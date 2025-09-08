// two ways to doing this: 
// 1) the arrow function way
export const getAllNotes = (req, res) => {
    res.status(200).send("You just fetched the notes");
}

// 2) the normal function way
export function createNote(req, res) {
    res.status(200).send("Note created successfully");
}

export function updateNote(req, res){
    res.status(200).json({message: "Note updated successfully!"})
}


export function deleteNote(req, res){
    res.status(200).json({message: "Note deleted successfully!"})
}