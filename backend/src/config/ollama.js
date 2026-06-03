import {Ollama} from "ollama";

export const ollama = new Ollama({
    host: process.env.OLLAMA_BASE_URL || "https://ollama.com",
    headers: {
        Authorization: `Bearer ${process.env.OLLAMA_API_KEY}`,
    }
});

export const GEN_MODEL = process.env.OLLAMA_GEN_MODEL || "gemma4";