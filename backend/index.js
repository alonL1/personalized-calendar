const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

const { OpenAI } = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Middleware
app.use(cors());
app.use(express.json());

app.post('/user-preferences', async (req, res) => {
  const { location, interests } = req.body;

  const prompt = `Create a list of 5 local events happening within the next few months in or near ${location} that would be interesting to someone who likes ${interests}. Return the result as a JSON array. Each event should have: name, description, date.`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4.1',
      messages: [{ role: 'user', content: prompt }],
    });

    const rawText = response.choices[0].message.content;
    const events = JSON.parse(rawText);
    res.json(events)
  } catch (err) {
    console.error('Failed to parse GPT output as JSON:', err);
    console.log('Raw output:\n', rawText);
    res.status(500).json({ error: 'Failed to generate events. Try again later.' });
  }
});



// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});