import {sql} from "../config/db.js";

const SIMILARITY_THRESHOLD = 0.40;

export async function recomputeEdgesForNote(noteId, vector) {
  const vec = JSON.stringify(vector);

  const neighbors = await sql`
    SELECT id,
           1 - (embedding <=> ${vec}::vector) AS sim
    FROM   notes
    WHERE  id != ${noteId}
      AND  embedding_status = 'done'
      AND  1 - (embedding <=> ${vec}::vector) >= ${SIMILARITY_THRESHOLD}
  `;

  const delA = sql`DELETE FROM note_edges WHERE note_a = ${noteId}`;
  const delB = sql`DELETE FROM note_edges WHERE note_b = ${noteId}`;

  const inserts = neighbors.map(({ id: neighborId, sim }) => {
    const [a, b] = noteId < neighborId
      ? [noteId, neighborId]
      : [neighborId, noteId];
    return sql`
      INSERT INTO note_edges (note_a, note_b, similarity)
      VALUES (${a}, ${b}, ${sim})
      ON CONFLICT (note_a, note_b) DO UPDATE
        SET similarity = EXCLUDED.similarity
    `;
  });

  await sql.transaction([delA, delB, ...inserts]);
}