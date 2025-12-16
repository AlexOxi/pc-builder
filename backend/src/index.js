const express = require('express');
const axios = require('axios');
require('dotenv').config();
const OpenAI = require("openai");

const app = express();
app.use(express.json());

const openai = new OpenAI({
    baseURL: "https://router.huggingface.co/v1",
    apiKey: process.env.HF_API_KEY,
});


const tools = [
    {
        type: "function",
        name: "get_current_weather",
        description: "Get the current weather in a given location",
        parameters: {
            type: "object",
            properties: {
                location: {
                    type: "string",
                    description: "The city and state, e.g. San Francisco, CA",
                },
                unit: { type: "string", enum: ["celsius", "fahrenheit"] },
            },
            required: ["location", "unit"],
        },
    },
];
app.get('/api/openai', async (req, res) => {
    const response = await openai.responses.create({
        model: "openai/gpt-oss-120b:fireworks-ai",
        tools,
        input: "What is the weather like in Boston today?",
        tool_choice: "auto",
    });

    console.log(response);
    res.json(response);
});
// const OPENAI_API_KEY = process.env.HF_API_KEY; // Replace with your actual API key

// app.post('/api/openai', async (req, res) => {
//     try {
//         const { prompt } = req.body;
//         const response = await axios.post(
//             'https://api.openai.com/v1/chat/completions',
//             {
//                 model: 'gpt-3.5-turbo',
//                 messages: [{ role: 'user', content: prompt }]
//             },
//             {
//                 headers: {
//                     'Authorization': `Bearer ${OPENAI_API_KEY}`,
//                     'Content-Type': 'application/json'
//                 }
//             }
//         );
//         res.json(response.data);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});