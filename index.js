import { OpenAI } from "openai"; // For ESM (Node 18+)

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }]
    });

    const bot = response.choices[0].message.content;
    res.json({ response: bot });
  } catch (error) {
    console.error("OpenAI Error:", error);
    res.status(500).json({ error: "OpenAI error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server listening on port ${PORT}`));

