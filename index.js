// index.js
const express = require("express");
const cors = require("cors");
const { OpenAI } = require("openai");

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post("/", async (req, res) => {
  try {
    const { messages } = req.body;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
    });

    res.json({
      choices: [
        {
          message: {
            content: response.choices[0].message.content,
          },
        },
      ],
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "OpenAI request failed" });
  }
});

// Optional health check route
app.get("/", (req, res) => {
  res.send("✅ MOSDAC Chatbot API is running");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
