import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../components/TopBar";
import { useApi } from "../useApi";
import { loadPrefs } from "../utils/storage";
import { generateAlzaLink } from "../utils/alza";
import { BuildItem } from "../types";

export default function BuildPage() {
  const navigate = useNavigate();
  const { callApi } = useApi();
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<string | null>(null);
  const prefs = loadPrefs();
  const [initialized, setInitialized] = useState(false);

  const fallbackBuild: BuildItem[] = [
    { part: "CPU", model: "Intel Core i5-14600K", price: "$260", note: "Great 1440p gaming; strong single-core.", link: generateAlzaLink("CPU", "Intel Core i5-14600K") },
    { part: "GPU", model: "NVIDIA RTX 4070 Super", price: "$549", note: "High FPS at 1440p; DLSS 3.", link: generateAlzaLink("GPU", "RTX 4070 Super") },
    { part: "RAM", model: "32GB (2x16) DDR5-6000", price: "$110", note: "Plenty for modern games + multitask.", link: generateAlzaLink("RAM", "32GB DDR5-6000") },
    { part: "Storage", model: "1TB NVMe Gen4 SSD", price: "$90", note: "Fast load times; room for top titles.", link: generateAlzaLink("SSD", "1TB NVMe Gen4") },
    { part: "Motherboard", model: "Z790 WiFi ATX", price: "$190", note: "PCIe Gen4, good VRMs, WiFi 6.", link: generateAlzaLink("Motherboard", "Z790 WiFi") },
    { part: "PSU", model: "750W 80+ Gold (fully modular)", price: "$100", note: "Headroom for GPU; efficient.", link: generateAlzaLink("PSU", "750W 80+ Gold") },
    { part: "Case", model: "Mid-tower w/ airflow front", price: "$110", note: "Good thermals; tempered glass.", link: generateAlzaLink("Case", "Mid-tower") },
    { part: "Cooling", model: "240mm AIO / dual tower air", price: "$90", note: "Keeps CPU cool and quiet.", link: generateAlzaLink("CPU Cooler", "240mm AIO") },
  ];

  const [buildItems, setBuildItems] = useState<BuildItem[]>(fallbackBuild);
  const [total, setTotal] = useState("$1,499");

  const parseAIResult = (text: string) => {
    const cleaned = text
      .replace(/^```(?:json)?/i, "")
      .replace(/```$/, "")
      .trim();

    // Try JSON first
    try {
      const json = JSON.parse(cleaned);
      if (Array.isArray(json.build)) {
        const mapped = json.build
          .map((b: any) => ({
            part: String(b.part ?? b.name ?? ""),
            model: String(b.model ?? b.item ?? ""),
            price: String(b.price ?? ""),
            note: b.note ? String(b.note) : undefined,
            link: b.link || generateAlzaLink(String(b.part ?? b.name ?? ""), String(b.model ?? b.item ?? "")),
          }))
          .filter((b: BuildItem) => b.part && b.model);
        if (mapped.length) {
          setBuildItems(mapped);
          if (json.total) setTotal(String(json.total));
          return;
        }
      }
    } catch {
      // ignore JSON parse failure
    }

    // Fallback: regex scan for known parts
    const labels = ["CPU", "GPU", "RAM", "Storage", "Motherboard", "PSU", "Case", "Cooling"];
    const lines = cleaned.split("\n").map((l) => l.trim()).filter(Boolean);
    const found: BuildItem[] = [];
    for (const line of lines) {
      for (const label of labels) {
        const regex = new RegExp(`^${label}[:\\-]?\\s*(.+)$`, "i");
        const m = line.match(regex);
        if (m) {
          found.push({ 
            part: label, 
            model: m[1], 
            price: "", 
            note: undefined,
            link: generateAlzaLink(label, m[1])
          });
          break;
        }
      }
    }
    if (found.length) {
      setBuildItems(found);
    }
  };

  const regenerate = async () => {
    setLoading(true);
    setResult(null);
    try {
      const parts = [
        prefs.useCase && `Use case: ${prefs.useCase}`,
        prefs.games && `Games: ${prefs.games}`,
        prefs.resolution && `Resolution: ${prefs.resolution}`,
        prefs.fps && `Target FPS: ${prefs.fps}`,
        prefs.budget && `Budget: $${Number(prefs.budget).toLocaleString()}`,
        prefs.caseType && `Case type: ${prefs.caseType}`,
        prefs.prefGlass && "Prefers tempered glass",
        prefs.prefRgb && "Wants RGB",
        prefs.specs && `Extra specs: ${prefs.specs}`,
      ]
        .filter(Boolean)
        .join("\n");

      const data = await callApi("/chat", {
        method: "POST",
        body: JSON.stringify({
          messages: [
            {
              role: "user",
              content:
                "Provide a concise PC parts list based on these preferences:\n" +
                parts +
                "\nReturn JSON like { build: [{ part, model, price, note }], total }. Keep it short.",
            },
          ],
        }),
      });

      const msg = data.message || "(no response)";
      setResult(msg);
      parseAIResult(msg);
    } catch (err) {
      console.error("Build generation failed:", err);
      alert(err instanceof Error ? err.message : "Failed to generate build");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!initialized) {
      regenerate();
      setInitialized(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialized]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b0c2c] via-[#0e133b] to-[#0f0f17] text-slate-50">
      <TopBar />
      <main className="mx-auto flex max-w-6xl flex-col gap-8 px-6 pb-16">
        <div className="pt-6 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Your PC Build
          </h1>
          <p className="mt-2 text-sm text-slate-300">
            Based on your specs, here's a balanced build and price overview.
          </p>
        </div>

        <section className="grid gap-6 rounded-2xl bg-gradient-to-br from-[#0b0c2c]/50 via-[#0e133b]/60 to-[#0f0f17]/70 p-8 shadow-2xl ring-1 ring-white/5 md:grid-cols-3">
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-lg font-semibold text-slate-100">Parts list</h3>
            {loading ? (
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/30 px-4 py-6 text-sm text-slate-200">
                <span className="h-6 w-6 animate-spin rounded-full border-4 border-slate-500 border-t-transparent" />
                <span>Generating specs…</span>
              </div>
            ) : (
              <div className="divide-y divide-white/10 rounded-xl border border-white/10 bg-black/30">
                {buildItems.map((item: BuildItem) => (
                  <div
                    key={item.part}
                    className="flex flex-col gap-1 px-4 py-3 text-sm text-slate-100"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">{item.part}</span>
                      <span className="text-slate-200">{item.price}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-200">{item.model}</span>
                      {item.link && (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-400 hover:text-blue-300 underline"
                        >
                          View on Alza.sk →
                        </a>
                      )}
                    </div>
                    {item.note && (
                      <div className="text-xs text-slate-400">{item.note}</div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="rounded-xl border border-white/10 bg-black/30 p-4 text-sm text-slate-100 shadow-inner">
              <div className="mb-3 space-y-1 text-xs text-slate-300">
                {prefs.useCase && <div>Use case: {prefs.useCase}</div>}
                {prefs.games && <div>Games: {prefs.games}</div>}
                {prefs.resolution && <div>Resolution: {prefs.resolution}</div>}
                {prefs.fps && <div>Target FPS: {prefs.fps}</div>}
                {prefs.budget && <div>Budget: ${Number(prefs.budget).toLocaleString()}</div>}
                {prefs.caseType && <div>Case type: {prefs.caseType}</div>}
                {prefs.prefGlass && <div>Prefers tempered glass</div>}
                {prefs.prefRgb && <div>Wants RGB</div>}
                {prefs.specs && <div>Extra specs: {prefs.specs}</div>}
              </div>
              <div className="flex items-center justify-between text-base font-semibold">
                <span>Estimated total</span>
                <span>{total}</span>
              </div>
              <p className="mt-2 text-xs text-slate-300">
                Prices are rough estimates; confirm with your preferred retailer.
              </p>
              <div className="mt-4 flex flex-col gap-3">
                <button
                  onClick={() => navigate("/start")}
                  className="rounded-lg border border-slate-600 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:border-slate-300"
                >
                  Adjust specs
                </button>
                <button
                  onClick={regenerate}
                  disabled={loading}
                  className="rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
                >
                  {loading ? "Refreshing…" : "Regenerate with AI"}
                </button>
                <button
                  onClick={() => navigate("/chat")}
                  className="rounded-lg border border-slate-600 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:border-slate-300"
                >
                  Chat about this build
                </button>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-black/30 p-4 text-sm text-slate-100 shadow-inner h-[200px] overflow-auto">
              <h4 className="text-sm font-semibold mb-2">AI Notes</h4>
              {loading && <p className="text-slate-300">Thinking…</p>}
              {!loading && result && (
                <pre className="whitespace-pre-wrap break-words text-slate-100">
                  {result}
                </pre>
              )}
              {!loading && !result && (
                <p className="text-slate-400">
                  Click "Regenerate with AI" for a fresh suggestion based on a
                  balanced 1440p gaming build.
                </p>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

