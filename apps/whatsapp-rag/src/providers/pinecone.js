// src/providers/pinecone.js
import { Pinecone } from "@pinecone-database/pinecone";

export function initPinecone(apiKey) {
  // v2: solo apiKey (nada de environment en el cliente)
  return new Pinecone({ apiKey });
}

// Crea el índice si no existe (384 dims, cosine, AWS us-east-1)
export async function ensureIndex(pine, indexName) {
  try {
    await pine.describeIndex(indexName);
  } catch (err) {
    // Si no existe, crearlo en modo serverless
    await pine.createIndex({
      name: indexName,
      dimension: 384,
      metric: "cosine",
      spec: {
        serverless: { cloud: "aws", region: "us-east-1" }
      }
    });
    await pine.waitUntilReady(indexName);
  }
  return pine.index(indexName);
}

export async function queryPinecone(pine, indexName, vector, topK = 3, threshold = 0.7) {
  const index = await ensureIndex(pine, indexName);
  const res = await index.query({
    topK,
    vector,
    includeMetadata: true,
  });
  const matches = (res.matches || []).filter(m => (m.score ?? 0) >= threshold);
  return matches;
}
