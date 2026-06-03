import "dotenv/config";
import { generateTitle } from "../src/services/titling.js";

const content = `Today I learned that vector embeddings represent 
text as high dimensional numerical arrays. Similar pieces of text 
end up close together in this vector space, which makes it possible 
to search by meaning rather than exact keywords.`;

const title = await generateTitle(content);
console.log("generated title:", title);