import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/', async (req, res) => {
  try {
    const { messages } = req.body;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
    });

    const reply = response.choices[0].message.content;

    res.json({
      choices: [
        {
          message: {
            content: reply,
          },
        },
      ],
    });
  } catch (err) {
    console.error("OpenAI Error:", err.message);
    res.status(500).json({ error: "Something went wrong with OpenAI." });
  }
});

app.get('/', (req, res) => {
  res.send("✅ MOSDAC chatbot API running");
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
