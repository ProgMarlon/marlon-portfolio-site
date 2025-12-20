import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

console.log("API Key loaded:", process.env.GEMINI_API_KEY ? "Yes (" + process.env.GEMINI_API_KEY.substring(0,5) + "...)" : "No");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function listModels() {
  try {
    // For listing models, we don't need to specify a model first
    // But the SDK might not expose listModels easily on the top level in this version?
    // Let's try to just instantiate a model and see if we can get info, 
    // or use a direct fetch to the list models endpoint if SDK fails.
    
    // Actually, let's just try to generate content with a very basic model to test the key.
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent("Hello");
    console.log("Success with gemini-1.5-flash:", result.response.text());
  } catch (error) {
    console.error("Error with gemini-1.5-flash:", error.message);
    
    try {
        const modelPro = genAI.getGenerativeModel({ model: "gemini-pro" });
        const resultPro = await modelPro.generateContent("Hello");
        console.log("Success with gemini-pro:", resultPro.response.text());
    } catch (err2) {
        console.error("Error with gemini-pro:", err2.message);
    }
  }
}

listModels();
