import axios from "axios";

export async function answerWithGroq({ apiKey, context, question }) {
  const body = {
    model: "llama-3.1-8b-instant",
    messages: [
      { role: "system", content: "Eres un asistente experto. Responde SOLO con el contexto." },
      { role: "user", content: `Contexto:\n${context}\n\nPregunta: ${question}` }
    ],
    temperature: 0.7,
    max_tokens: 500
  };

  const resp = await axios.post(
    "https://api.groq.com/openai/v1/chat/completions",
    body,
    { headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" }, timeout: 20000 }
  );
  return resp.data?.choices?.[0]?.message?.content?.trim() ?? "";
}
