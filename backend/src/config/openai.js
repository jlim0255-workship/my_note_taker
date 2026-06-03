import OpenAI from 'openai';
export const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export const EMBED_MODEL = 'text-embedding-3-small';
export const EMBED_DIM = 1536;