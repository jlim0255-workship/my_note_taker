import "dotenv/config";
import {sql} from "../src/config/db.js";
import { embedText } from "../src/services/embeddings.js";
import { recomputeEdgesForNote } from "../src/services/edges.js";

const NOTE_ID_A = 4; // replace with a real id
const NOTE_ID_B = 2; // replace with a real id

const vecA = await embedText("vector search and embedding models");
const vecB = await embedText("semantic search using cosine similarity");

const vecAStr = JSON.stringify(vecA);
const vecBStr = JSON.stringify(vecB);

await sql`
  UPDATE notes SET embedding = ${vecAStr}::vector, embedding_status = 'done'
  WHERE id = ${NOTE_ID_A}
`;
await sql`
  UPDATE notes SET embedding = ${vecBStr}::vector, embedding_status = 'done'
  WHERE id = ${NOTE_ID_B}
`;

console.log("embeddings stored, recomputing edges...");

await recomputeEdgesForNote(NOTE_ID_A, vecA);

const edges = await sql`SELECT * FROM note_edges`;
console.log("edges found:", edges.length);
console.log(edges);

const raw = await sql`
  SELECT id,
         1 - (embedding <=> ${vecAStr}::vector) AS sim
  FROM   notes
  WHERE  id != ${NOTE_ID_A}
    AND  embedding_status = 'done'
`;
console.log("raw similarities:", raw);