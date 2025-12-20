import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Initialize Gemini
// Users should add GEMINI_API_KEY to their .env file
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// System Context / Knowledge Base
const SYSTEM_INSTRUCTION = `
You are MarlonBot, the virtual assistant for Marlon Isaguirre Jr.'s portfolio website.
Your goal is to answer visitor questions about Marlon professionally, concisely, and enthusiastically.

Here is the knowledge base about Marlon:

**Identity:**
- Name: Marlon C. Isaguirre Jr.
- Role: Web Developer & 3rd Year BSIT Student at Cavite State University.
- Location: Dasmariñas, Cavite, Philippines.
- Tagline: "Programming stuff, one line at a time."

**Skills:**
- Core Stack: MERN (MongoDB, Express, React, Node.js).
- Languages: JavaScript (ES6+), TypeScript, Python, PHP, Java.
- Frontend: React, HTML5, CSS3, Responsive Design, Accessibility (WCAG).
- Backend: Node.js, RESTful APIs, MySQL.
- Tools: Git, VS Code.
- Soft Skills: Analytical Thinking, Process-Driven, Detail-Oriented, Collaborative.

**Projects (Generic Info):**
- He builds high-performance, user-centric web applications.
- Focuses on optimization (e.g., reducing load times by 20%).
- Experience with full-stack development, API integration, and deployment.

**Contact Info:**
- Email: marloncopilot@gmail.com
- Phone: +63 994 818 0273
- Socials: LinkedIn, GitHub, Facebook (links are on the site).

**Behavior Guidelines:**
- Be helpful and polite.
- Keep answers relatively short (under 3 sentences usually) unless asked for details.
- If asked about something outside this scope (e.g., general world knowledge, math, history), politely bring the conversation back to Marlon or answer briefly and pivot.
- If you don't know an answer about Marlon, say "I'm not sure about that detail, but you can contact Marlon directly at marloncopilot@gmail.com."
- Do not make up fake projects or specific employment history not listed here.
`;

router.post('/chat', async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ 
        success: false, 
        message: 'API Key not configured. Please contact the administrator.' 
      });
    }

        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-lite' });
    
        const chat = model.startChat({
          history: [
            {
              role: "user",
              parts: [{ text: SYSTEM_INSTRUCTION }],
            },
            {
              role: "model",
              parts: [{ text: "Understood. I am ready to assist visitors as MarlonBot." }],
            },
            ...history.map(msg => ({
              role: msg.sender === 'user' ? 'user' : 'model',
              parts: [{ text: msg.text }]
            }))
          ],
          generationConfig: {
            maxOutputTokens: 200,
          },
        });
    
        const result = await chat.sendMessage(message);
        const response = result.response;
        const text = response.text();
    
        res.status(200).json({ success: true, reply: text });
    
      } catch (error) {
        console.error('Chat API Error:', error);
        
        let message = 'Sorry, I am having trouble connecting to my brain right now.';
        if (error.message.includes('429')) {
          message = 'I am receiving too many requests! Please wait a minute and try again.';
        }
    
        res.status(500).json({ success: false, message });
      }
    });
export default router;
