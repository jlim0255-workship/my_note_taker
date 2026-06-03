import "dotenv/config";
import { embedText } from "../src/services/embeddings.js";

const v = await embedText("hello second brain");
console.log("length:", v.length);
console.log("first 5 values:", v.slice(0, 5).map(n => n.toFixed(6)));