import { Request, Response, Express } from "express";
import { callHuggingFace } from "./ai/hf";
import { openaiDirect } from "./ai/openaiDirect";
import { openai as huggingFaceClient } from "./ai/init";

type ChatMessage = { role: "user" | "assistant"; content: string };

export function initRoutes(app: Express) {
  app.get("/", (_req: Request, res: Response) => {
    res.send("Hello from TypeScript + Express!");
  });

  app.get("/oxi", (_req: Request, res: Response) => {
    res.send("Oxi is the best!");
  });

  app.get("/ai", async (_req: Request, res: Response) => {
    if (!huggingFaceClient) {
      return res
        .status(503)
        .json({ error: "HUGGINGFACE_API_KEY not configured on server" });
    }
    const result = await callHuggingFace();
    res.send(result);
  });

  // POST /chat expects: { messages: [{ role: "user" | "assistant", content: string }] }
  app.post("/chat", async (req: Request, res: Response) => {
    const messages = req.body?.messages as ChatMessage[] | undefined;

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: "messages array required" });
    }

    const normalized = messages
      .filter(
        (m): m is ChatMessage =>
          (m.role === "user" || m.role === "assistant") &&
          typeof m.content === "string" &&
          m.content.trim().length > 0,
      )
      .map((m) => ({ role: m.role, content: m.content.trim() }));

    if (normalized.length === 0) {
      return res.status(400).json({ error: "no valid messages" });
    }

    try {
      const completion = await openaiDirect.chat.completions.create({
        model: "gpt-4o-mini",
        messages: normalized,
      });

      const reply =
        completion.choices[0]?.message?.content?.trim() ?? "(no response)";

      res.json({ message: reply });
    } catch (err: any) {
      // Surface common OpenAI errors so the frontend can display something meaningful.
      const status = err?.status ?? 500;
      const code = err?.code ?? err?.error?.code;
      const message =
        err?.error?.message ||
        err?.message ||
        "Chat request failed. Check server logs.";

      console.error("Chat error:", { status, code, message });
      res.status(status).json({ error: message, code });
    }
  });
}