const path = require('path');  // Add this at the top
const PORT = process.env.PORT ?? 9000;
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Load environment variables from .env file
dotenv.config();

// Create an instance of the express app
const app = express();

// Use CORS middleware
app.use(cors());

// Parse JSON requests
app.use(express.json());

// Initialize Google Generative AI with API key
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_KEY);
app.use(express.static(path.join(__dirname, 'build')));



app.post("/gemini", async (req, res) => {
  try {
    const { history, message } = req.body;
    const model = await genAI.getGenerativeModel({ model: "gemini-pro" });

    const chat = await model.startChat({ history });
    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    res.send(text);
  } catch (error) {
    console.error("Error in /gemini route:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start the server
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));


