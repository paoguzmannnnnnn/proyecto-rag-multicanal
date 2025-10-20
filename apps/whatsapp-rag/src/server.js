// src/server.js (añade esto)
import 'dotenv/config';
import express from "express";
import dotenv from "dotenv";
import { answerQuestionRAG } from "./rag.js";
dotenv.config();

const app = express();
app.use(express.json());

app.get("/health", (_req, res) => res.status(200).send("ok")); // <-- healthcheck p/ Render/Railway

app.get("/webhook", (req, res) => {
  const VERIFY_TOKEN = process.env.VERIFY_TOKEN;
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];
  if (mode && token && mode === "subscribe" && token === VERIFY_TOKEN) {
    return res.status(200).send(challenge);
  }
  return res.sendStatus(403);
});

app.post("/webhook", async (req, res) => {
  try {
    // Extrae texto y número; contesta incluso si Pinecone falla o está vacío
    const entry = req.body?.entry?.[0]?.changes?.[0]?.value;
    const msg = entry?.messages?.[0];
    const from = msg?.from;
    const text = msg?.text?.body?.trim();
    if (!from || !text) return res.sendStatus(200);

    const reply = await answerQuestionRAG(text, process.env); // ya tolera errores
    // envía por WhatsApp:
    await import("./providers/whatsapp.js").then(({ sendWhatsApp }) =>
      sendWhatsApp(from, reply, process.env)
    );

    return res.sendStatus(200);
  } catch (e) {
    console.error("Error webhook:", e?.response?.data || e.message);
    return res.sendStatus(200); // no romper la verificación
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`WhatsApp RAG listo en puerto ${PORT}`));
