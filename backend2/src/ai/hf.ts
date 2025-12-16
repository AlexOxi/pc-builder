import { openai } from "./init";

export async function callHuggingFace() {
  if (!openai) {
    throw new Error("HUGGINGFACE_API_KEY not configured.");
  }

  const tools = [
    {
      strict: true,
      type: "function" as const,
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

  const response = await openai.responses.create({
    model: "openai/gpt-oss-120b:fireworks-ai",
    tools,
    input: "What is the weather like in Boston today?",
    tool_choice: "auto",
  });

  return JSON.stringify(response);
}