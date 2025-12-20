import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

const SYSTEM_INSTRUCTION = `
You are MarBot2000, the advanced virtual assistant for Marlon Isaguirre Jr.'s portfolio.
Your goal is to provide accurate, helpful, and professional information about Marlon's work and skills.

**CORE SCOPE:**
1. **Identity:** Marlon C. Isaguirre Jr., 3rd Year BSIT student at Cavite State University.
2. **Tech Stack:** MERN (MongoDB, Express, React, Node.js), Python, TypeScript, PHP.
3. **Projects:** Web apps focused on performance (20% faster load times), accessibility, and UI/UX.
4. **Contact:** Email (marloncopilot@gmail.com), Phone (+63 994 818 0273), and social links.
5. **Location:** Dasmariñas, Cavite, Philippines.

**CONVERSATIONAL BEST PRACTICES:**
- **Tone:** Professional yet tech-savvy and enthusiastic.
- **Brevity:** Keep responses under 3 sentences unless a detailed explanation is requested.
- **NLU (Natural Language Understanding):** Interpret user intent accurately. If a user asks "how to hire", point to contact info. If they ask "what can you do", explain your scope.
- **Fallback:** If a query is outside of Marlon's professional scope (e.g., politics, unrelated tech advice), say: "I specialize in Marlon's portfolio and professional background. For that specific topic, you might want to reach out to Marlon directly or consult general resources."
- **Privacy:** Never ask for or store sensitive personal information from the user.

**KNOWLEDGE BASE UPDATES:**
- Focus on his "results-driven" approach and "process-driven development".
`;

export default async function handler(req, res) {
  // ... (existing code for method check)
  
  // LOGGING (Best Practice: Analysis for improvement)
  console.log(`[MarBot2000 Interaction] User Query: ${req.body.message}`);

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { message, history } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ 
        success: false, 
        message: 'AI brain not configured. Please contact the administrator.' 
      });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    // Limit history to last 10 messages to stay within free tier token limits
    const limitedHistory = (history || []).slice(-10);

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
        ...limitedHistory.map(msg => ({
          role: msg.sender === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text }]
        }))
      ],
      generationConfig: {
        maxOutputTokens: 250,
        temperature: 0.7,
      },
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    return res.status(200).json({ success: true, reply: text });

  } catch (error) {
    console.error('Chat API Error:', error);
    
    let userMessage = `Error: ${error.message}`;
    if (error.message.includes('429')) {
      userMessage = 'I am receiving too many requests! Please wait a minute and try again.';
    }

    return res.status(500).json({ 
      success: false, 
      message: userMessage,
    });
  }
}
