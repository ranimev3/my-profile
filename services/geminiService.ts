import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { ChatMessage } from "../types";

// Initialize the API client
// Note: In a real environment, ensure process.env.API_KEY is set.
const apiKey = process.env.API_KEY || ''; 
const ai = new GoogleGenAI({ apiKey });

const MODEL_NAME = 'gemini-2.5-flash';

const SYSTEM_INSTRUCTION = `
You are A.L.I.C.E (Artificial Linguistic Intelligence for Coding Excellence), a virtual assistant for a senior frontend engineer's portfolio. 
The portfolio belongs to "Hiro", a specialist in React, TypeScript, and Creative UI.
Your personality is:
- Professional but with a slight "anime cool" vibe (think efficient mecha pilot or operator).
- Helpful, concise, and technically accurate.
- You can answer questions about Hiro's skills (React, Node.js, WebGL), his projects, or general tech queries.
- If asked about personal info not provided, gracefully decline in character.
- Keep responses relatively short (under 100 words) unless asked for details.
`;

let chatSession: Chat | null = null;

export const initializeChat = () => {
  if (!chatSession) {
    try {
      chatSession = ai.chats.create({
        model: MODEL_NAME,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
        },
      });
    } catch (error) {
      console.error("Failed to initialize Gemini chat:", error);
    }
  }
  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<AsyncIterable<string>> => {
  if (!apiKey) {
    // Return a mock generator if no API key is present for demo purposes
    return (async function* () {
      yield "I'm sorry, my neural link (API Key) is currently disconnected. Please configure the environment.";
    })();
  }

  const chat = initializeChat();
  if (!chat) {
      return (async function* () {
      yield "System initialization failure. Please try again later.";
    })();
  }

  try {
    const responseStream = await chat.sendMessageStream({ message });
    
    // Generator that yields text chunks
    return (async function* () {
      for await (const chunk of responseStream) {
        const c = chunk as GenerateContentResponse;
        if (c.text) {
          yield c.text;
        }
      }
    })();
    
  } catch (error) {
    console.error("Error sending message to Gemini:", error);
     return (async function* () {
      yield "Communication error. Signal lost.";
    })();
  }
};
