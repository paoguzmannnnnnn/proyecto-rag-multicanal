import axios from "axios";

const PHONE_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
const RAW_TOKEN = process.env.META_ACCESS_TOKEN || "";
const META_TOKEN = RAW_TOKEN.replace(/\s+/g, ""); // 🔧 sanitiza

export async function sendWhatsApp(to, message) {
  if (!PHONE_ID) throw new Error("Falta WHATSAPP_PHONE_NUMBER_ID");
  if (!META_TOKEN) throw new Error("Falta META_ACCESS_TOKEN");

  await axios.post(
    `https://graph.facebook.com/v21.0/${PHONE_ID}/messages`,
    {
      messaging_product: "whatsapp",
      to,
      type: "text",
      text: { body: message },
    },
    {
      headers: {
        Authorization: `Bearer ${META_TOKEN}`,
        "Content-Type": "application/json",
      },
      timeout: 10000,
    }
  );
}
