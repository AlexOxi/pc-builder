import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  console.error("OPENAI_API_KEY is not set in environment variables.");
  process.exit(1);
}

export const openaiDirect = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

