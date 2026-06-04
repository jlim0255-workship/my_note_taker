import "dotenv/config";
import { indexNote } from "../src/services/noteIndexer.js";

import {sql} from "../src/config/db.js";

const seeds = [
  {
    title: "What is a vector embedding?",
    content: `A vector embedding is a numerical representation of text as a high-dimensional array of floats. 
Similar pieces of text produce vectors that are close together in this vector space. 
This is the foundation of semantic search — instead of matching keywords, 
you compare meaning by measuring the distance between vectors.`,
  },
  {
    title: "How semantic search works",
    content: `Semantic search embeds the user's query into a vector, then finds notes whose vectors 
are closest to it using cosine similarity. Unlike keyword search, it understands meaning — 
searching "how do I lose weight" can surface a note titled "healthy eating habits" 
even if none of those words match exactly.`,
  },
  {
    title: "Understanding cosine similarity",
    content: `Cosine similarity measures the angle between two vectors rather than their magnitude. 
A score of 1.0 means the vectors point in exactly the same direction — identical meaning. 
A score of 0 means completely unrelated. Most semantically related text pairs score between 0.5 and 0.9.`,
  },
  {
    title: "pgvector and PostgreSQL",
    content: `pgvector is a PostgreSQL extension that adds a native vector column type and distance operators. 
The <=> operator computes cosine distance between two vectors. 
Combined with an HNSW index, it makes approximate nearest-neighbor search fast enough for real-time queries 
even on large datasets.`,
  },
  {
    title: "HNSW index explained",
    content: `HNSW stands for Hierarchical Navigable Small World. It builds a multi-layer graph where 
each node connects to its nearest neighbors. During search, it navigates from coarse upper layers 
down to the fine-grained bottom layer, finding approximate nearest neighbors much faster than a brute-force scan.`,
  },
  {
    title: "RAG — Retrieval Augmented Generation",
    content: `RAG combines a retrieval system with a language model. Instead of relying on the model's 
training data alone, it first retrieves relevant documents using semantic search, 
then passes them as context to the LLM. This grounds the response in real data 
and reduces hallucination significantly.`,
  },
  {
    title: "Kafka and stream processing",
    content: `Apache Kafka is a distributed event streaming platform. Producers publish events to topics, 
consumers read from those topics. Spark Structured Streaming can consume Kafka topics in real time, 
apply transformations and windowed aggregations, and write results to a sink like MongoDB.`,
  },
  {
    title: "Watermarks in Spark Structured Streaming",
    content: `Watermarks tell Spark how late data can arrive before it is dropped from a streaming window. 
Setting a watermark of 10 minutes means Spark holds state for each window 
for 10 minutes past its end time, then discards it. 
This makes stream-stream joins on event time tractable without unbounded state.`,
  },
  {
    title: "Model Context Protocol (MCP)",
    content: `MCP is a protocol that lets language models call external tools through a standardized interface. 
A server exposes tools — functions the model can invoke — and the model decides when and how to call them 
based on the user's request. This is the foundation of agentic AI systems 
that can search, create, update, and act on real data.`,
  },
  {
    title: "Knowledge graphs and second brains",
    content: `A second brain is a personal knowledge management system that captures, connects, and surfaces ideas. 
Representing notes as graph nodes and drawing edges based on semantic similarity 
creates an interconnected web of thought — ideas cluster naturally by topic 
without requiring manual tagging or folder organisation.`,
  },
  {
    title: "Reciprocal Rank Fusion for hybrid search",
    content: `Reciprocal Rank Fusion (RRF) combines rankings from multiple retrieval systems — 
typically keyword BM25 and semantic vector search — into a single ranked list. 
Each result is scored as 1 / (rank + k) across both lists and the scores are summed. 
This consistently outperforms either system alone without needing to tune weights.`,
  },
  {
    title: "Functional reactive programming with RxJS",
    content: `RxJS models asynchronous events as observable streams. 
Operators like map, filter, and merge let you compose complex event logic declaratively. 
In a game like Guitar Hero, keyboard input, note spawning, and the game clock 
each become streams that merge into a single state update pipeline — 
all without mutable shared state.`,
  },
];

async function seed() {
  console.log(`seeding ${seeds.length} notes...`);

  for (const { title, content } of seeds) {
    const result = await sql`
      INSERT INTO notes (title, content, source)
      VALUES (${title}, ${content}, 'seed')
      RETURNING *
    `;
    const note = result[0];
    console.log(`inserted note ${note.id}: ${note.title}`);
    await indexNote(note.id, `${note.title} ${note.content}`, note.title);
    console.log(`indexed note ${note.id}`);
  }

  console.log("seeding complete");

  const edges = await sql`SELECT COUNT(*) AS total FROM note_edges`;
  console.log("total edges in graph:", edges[0].total);
}

seed();