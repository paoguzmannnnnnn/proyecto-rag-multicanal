// src/providers/embeddings.js
import { pipeline } from "@xenova/transformers";

let extractor = null;

export async function embedText(text) {
  if (!extractor) {
    extractor = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");
  }
  const output = await extractor(text, { pooling: "mean", normalize: true });
  // 384 floats → compatible con tu índice Pinecone (384/cosine)
  return Array.from(output.data);
}
