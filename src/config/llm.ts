import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatOllama } from "@langchain/ollama";

export const geminiModel = new ChatGoogleGenerativeAI({
  model: "models/gemini-2.5-flash",
  apiKey: process.env.GOOGLE_API_KEY,
  temperature: 0,
  maxOutputTokens: 256, // keep small
});

export const ollamaModel = new ChatOllama({
  model: "llama3",
  baseUrl: "http://localhost:11434",
  temperature: 0,
});

export async function hybridInvoke(messages: any) {
  try {
    return await geminiModel.invoke(messages);
  } catch (error) {
    console.log("Failed to get result from gemini", error);

    return await ollamaModel.invoke(messages);
  }
}
