import { embedText } from "./providers/embeddings.js";
import { initPinecone, queryPinecone } from "./providers/pinecone.js";
import { answerWithGroq } from "./providers/groq.js";

export async function answerQuestionRAG(question, env) {
  // 1) Embeddings locales (Xenova)
  let qVec;
  try {
    qVec = await embedText(question);
  } catch (err) {
    console.error("Embeddings error:", err?.message || err);
    return await answerWithGroq({
      apiKey: env.GROQ_API_KEY,
      context: "(sin contexto: error de embeddings)",
      question,
    });
  }

  // 2) Pinecone (protegido)
  let contexto = "";
  try {
    const pine = initPinecone(env.PINECONE_API_KEY); // ✅ solo apiKey
    const matches = await queryPinecone(pine, env.PINECONE_INDEX, qVec, 3, 0.7);
    contexto = (matches || [])
      .map(m => (m?.metadata?.text ? `• ${m.metadata.text}` : ""))
      .filter(Boolean)
      .join("\n");
  } catch (err) {
    console.error("Pinecone error:", err?.message || err);
    contexto = "(sin contexto: error de Pinecone)";
  }

  // 3) Respuesta con Groq
  return await answerWithGroq({
    apiKey: env.GROQ_API_KEY,
    context: contexto || "(no hay contexto relevante)",
    question,
  });
}
