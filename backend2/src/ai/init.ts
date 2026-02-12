import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config({ quiet: true });

// Optional: only needed if you use the Hugging Face route (/ai)
const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY;

if (!HUGGINGFACE_API_KEY) {
  console.warn(
    "HUGGINGFACE_API_KEY is not set. /ai route will be disabled until provided.",
  );
}

export const openai = HUGGINGFACE_API_KEY
  ? new OpenAI({
      baseURL: "https://router.huggingface.co/v1",
      apiKey: HUGGINGFACE_API_KEY,
    })
  : null;
