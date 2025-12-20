import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

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

**Projects:**
- He builds high-performance, user-centric web applications.
- Focuses on optimization (e.g., reducing load times by 20%).
- Experience with full-stack development, API integration, and deployment.

**Contact Info:**
- Email: marloncopilot@gmail.com
- Phone: +63 994 818 0273
- Socials: LinkedIn, GitHub, Facebook.

**Behavior Guidelines:**
- Be helpful and polite.
- Keep answers relatively short (under 3 sentences usually).
- If asked about something outside this scope, politely bring the conversation back to Marlon.
- If you don't know an answer, say "I'm not sure about that detail, but you can contact Marlon directly at marloncopilot@gmail.com."
`;

export default async function handler(req, res) {
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
