import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApi } from "../useApi";
import type { Message } from "../types";

export default function ChatPage() {
  const navigate = useNavigate();
  const { callApi } = useApi();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const nextMessages: Message[] = [
      ...messages,
      { role: "user", content: trimmed },
    ];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const data = await callApi("/chat", {
        method: "POST",
        body: JSON.stringify({ messages: nextMessages }),
      });

      const text = data.message || "(no response)";
      setMessages([...nextMessages, { role: "assistant", content: text }]);
    } catch (err) {
      console.error(err);
      alert(err instanceof Error ? err.message : "Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
          <h1 className="text-xl font-semibold">PC Builder AI Chat</h1>
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <button
              onClick={() => navigate("/")}
              className="rounded-md border px-2 py-1 text-slate-600 hover:bg-slate-100"
            >
              Back to Home
            </button>
            <span>Backend proxy: /chat</span>
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-4xl flex-col gap-4 px-4 py-6">
        <div className="flex-1 space-y-3 rounded-lg border bg-white p-4 shadow-sm">
          {messages.length === 0 ? (
            <p className="text-sm text-slate-500">
              Ask anything about building a PC.
            </p>
          ) : (
            messages.map((m, idx) => (
              <div
                key={idx}
                className={`rounded-md p-3 text-sm ${
                  m.role === "user"
                    ? "bg-blue-50 text-blue-900"
                    : "bg-slate-100 text-slate-900"
                }`}
              >
                <div className="mb-1 text-[11px] uppercase tracking-wide text-slate-500">
                  {m.role}
                </div>
                <div className="whitespace-pre-wrap">{m.content}</div>
              </div>
            ))
          )}
        </div>

        <div className="flex flex-col gap-2 rounded-lg border bg-white p-4 shadow-sm">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about parts, budgets, or compatibility…"
            className="w-full rounded-md border px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            rows={3}
          />
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500">
              Uses model gpt-4o-mini
            </span>
            <button
              onClick={sendMessage}
              disabled={loading}
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
            >
              {loading ? "Thinking…" : "Send"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

