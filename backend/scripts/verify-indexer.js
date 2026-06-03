import "dotenv/config";
import {sql} from "../src/config/db.js";
import { indexNote } from "../src/services/noteIndexer.js";

const NOTE_ID = 5; // replace with a real pending note id

const { title, content } = (
  await sql`SELECT title, content FROM notes WHERE id = ${NOTE_ID}`
)[0];

console.log("indexing:", title);
await indexNote(NOTE_ID, `${title} ${content}`);

const result = await sql`
  SELECT id, embedding_status,
         embedding IS NOT NULL AS has_embedding
  FROM   notes
  WHERE  id = ${NOTE_ID}
`;
console.log("note after indexing:", result[0]);

const edges = await sql`
  SELECT * FROM note_edges
  WHERE note_a = ${NOTE_ID} OR note_b = ${NOTE_ID}
`;
console.log("edges for this note:", edges.length);
console.log(edges);