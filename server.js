import express from "express";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

if (!process.env.GEMINI_API_KEY) {
  console.error("Falta GEMINI_API_KEY en el archivo .env");
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.use(express.json());
app.use(express.static("."));

app.post("/api/chat", async (req, res) => {
  try {
    const message = String(req.body?.message || "").trim();
    if (!message) return res.status(400).json({ error: "Escribe un mensaje." });

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: [
        {
          role: "user",
          parts: [{ text: `Eres NOVA, un asistente útil, claro y amable. Responde en español salvo que el usuario pida otro idioma.\n\nUsuario: ${message}` }]
        }
      ]
    });

    res.json({ reply: response.text || "No recibí una respuesta de texto." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "No pude obtener una respuesta de la IA. Revisa tu API key, límites y configuración." });
  }
});

app.listen(port, () => console.log(`NOVA AI funcionando en http://localhost:${port}`));