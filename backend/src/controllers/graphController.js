import {sql} from "../config/db.js";

const TOP_K = 5;

export async function getGraph(req, res) {
    try {
        const notes = await sql`
            SELECT id, title, content, embedding_status
            FROM notes
            ORDER BY id
        `;

        const allEdges = await sql`
            SELECT note_a, note_b, similarity
            FROM note_edges
            ORDER BY similarity DESC
        `;

        // apply per node top k cap at read time
        const edgeCount = {};
        const links = [];

        for (const edge of allEdges) {
            const a = edge.note_a;
            const b = edge.note_b;
            edgeCount[a] = (edgeCount[a] ?? 0);
            edgeCount[b] = (edgeCount[b] ?? 0);

            if (edgeCount[a] < TOP_K && edgeCount[b] < TOP_K) {
                links.push({
                    source: a,
                    target: b,
                    similarity: edge.similarity,
                });
                edgeCount[a]++;
                edgeCount[b]++;
            }
        }

        const nodes = notes.map(note => ({
            id: note.id,
            title: note.title,
            // content: note.content,
            status: note.embedding_status,
        }));

        res.status(200).json({nodes, links});
    } catch (error) {
        console.log("Error in getGraph controller", error);
        res.status(500).json({message: "Failed to load graph"});
        
    }
}