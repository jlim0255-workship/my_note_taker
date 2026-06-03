import {openai, EMBED_MODEL, EMBED_DIM} from "../config/openai.js";

export async function embedText(text) {
    const input = (text ?? "").trim();

    if (!input) {
        throw new Error("embedText: Input text is empty");
    }

    const response = await openai.embeddings.create({
        model: EMBED_MODEL,
        input,
    })

    const vector = response.data[0].embedding;

    if (vector.length !== EMBED_DIM) {
        throw new Error(`embedText: Expected embedding dimension ${EMBED_DIM}, got ${vector.length}`);
    }

    return vector;
}