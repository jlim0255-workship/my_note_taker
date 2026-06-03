import {sql} from "../config/db.js";

import {embedText} from "./embeddings.js";
import {recomputeEdgesForNote} from "./edges.js";

export async function indexNote(noteId, text) {
    try {
        const vector = await embedText(text);
        const vec = JSON.stringify(vector);

        await sql`
            UPDATE notes 
            SET embedding = ${vec}::vector, embedding_status = 'done'
            WHERE id = ${noteId}
        `;
        
        await recomputeEdgesForNote(noteId, vector);
    } catch (error) {
        await sql`
            UPDATE notes
            SET embedding_status = 'failed'
            WHERE id = ${noteId}
        `.catch(() => {}); // if the db failed, we don't want a second error to mask the first one

        console.error(`indexNote: Failed to index note ${noteId}`, error);
    }
}