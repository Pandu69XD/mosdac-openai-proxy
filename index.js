// index.js - ESM version
import express from 'express';
import cors from 'cors';
import { OpenAI } from 'openai';

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post('/', async (req, res) => {
  try {
    const { messages } = req.body;
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages
    });
    res.json({
      choices: [
        {
          message: {
            content: response.choices[0].message.content
          }
        }
      ]
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '❌ OpenAI request failed' });
  }
});

app.get('/', (req, res) => {
  res.send("✅ MOSDAC Chatbot API is running");
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`✅ Server listening on port ${PORT}`));

