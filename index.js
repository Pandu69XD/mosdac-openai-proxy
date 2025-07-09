const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Configuration, OpenAIApi } = require("openai");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post("/chat", async (req, res) => {
  try {
    const messages = req.body.messages || [];
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages,
    });
    res.json(completion.data);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: "OpenAI request failed" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
