import { ollama, GEN_MODEL } from "../config/ollama.js";

export async function generateTitle(content) {
  try {
    const response = await ollama.chat({
      model: GEN_MODEL,
      messages: [
        {
          role: "user",
          content: `Give this note a short, specific title of 5 words or fewer, NOT MORE THAN 10 words
Return only the title, no punctuation, no quotes, no explanation.

Note:
${content.slice(0, 500)}`,
        },
      ],
    });
    return response.message.content.trim();
  } catch (err) {
    console.error("generateTitle failed:", err.message);
    return null;
  }
}