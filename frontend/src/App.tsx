import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import "./App.css";
import { useApi } from "./useApi";

type Message = { role: "user" | "assistant"; content: string };

type StoredPrefs = {
  useCase?: string;
  specs?: string;
  budget?: string;
  caseType?: string;
  prefGlass?: boolean;
  prefRgb?: boolean;
  games?: string;
  resolution?: string;
  fps?: string;
};

const STORAGE_KEY = "pcbuilder_prefs";

function loadPrefs(): StoredPrefs {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function savePrefs(update: Partial<StoredPrefs>) {
  const current = loadPrefs();
  const next = { ...current, ...update };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}

function TopBar() {
  return (
    <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 text-sm text-slate-200">
      <div className="flex items-center gap-2">
        <Link
          to="/help"
          className="flex items-center gap-2 rounded-full border border-slate-500/70 bg-black/40 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-200 transition hover:border-slate-200 hover:text-white"
        >
          <span className="flex h-5 w-5 items-center justify-center rounded-full border border-slate-400 text-sm">
            ?
          </span>
          <span>Help</span>
        </Link>
      </div>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <span className="text-lg">★</span>
          <span className="text-xs uppercase tracking-wide text-slate-300">
            Profile
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-lg">★</span>
          <span className="text-xs uppercase tracking-wide text-slate-300">
            Login
          </span>
        </div>
      </div>
    </header>
  );
}

function GetStartedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b0c2c] via-[#0e133b] to-[#0f0f17] text-slate-50">
      <TopBar />

      <main className="mx-auto flex max-w-6xl flex-col gap-10 px-6 pb-16">
        <div className="text-center pt-4">
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight">
            PC Builder
          </h1>
        </div>

        <section className="grid items-center gap-10 rounded-2xl bg-gradient-to-br from-[#0b0c2c]/50 via-[#0e133b]/60 to-[#0f0f17]/70 p-8 shadow-2xl ring-1 ring-white/5 md:grid-cols-2">
          <div className="overflow-hidden rounded-xl border border-white/5 bg-black/20 shadow-xl object-contain max-h-[440px] max-w-[440px]">
            <img
              src="https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="PC build"
              className="h-full w-full object-contain"
            />
          </div>

          <div className="flex flex-col gap-6 text-left">
            <div className="space-y-4">
              <h2 className="text-4xl font-semibold leading-tight text-slate-50">
                Build the pc of your dreams in minutes
              </h2>
              <p className="text-lg text-slate-200/80">
                Choose your parts, ensure compatibility, and get a ready-to-go
                list optimized for performance, thermals, and budget.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <Link
                to="/start"
                className="w-full rounded-xl bg-slate-800 px-6 py-4 text-center text-base font-semibold text-slate-100 transition hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-transparent sm:w-auto"
              >
                Let's Get Started
              </Link>
              <Link
                to="/chat"
                className="w-full rounded-xl border border-slate-500/60 px-6 py-4 text-center text-base font-semibold text-slate-100 transition hover:border-slate-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-transparent sm:w-auto"
              >
               Test
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function StartFormPage() {
  const navigate = useNavigate();
  const [useCase, setUseCase] = useState("Gaming");
  const [specs, setSpecs] = useState("");
  const [budget, setBudget] = useState("1500");
  const [caseType, setCaseType] = useState("Mid tower");
  const [prefGlass, setPrefGlass] = useState(false);
  const [prefRgb, setPrefRgb] = useState(false);

  useEffect(() => {
    const stored = loadPrefs();
    if (stored.useCase) setUseCase(stored.useCase);
    if (stored.specs) setSpecs(stored.specs);
    if (stored.budget) setBudget(stored.budget);
    if (stored.caseType) setCaseType(stored.caseType);
    if (typeof stored.prefGlass === "boolean") setPrefGlass(stored.prefGlass);
    if (typeof stored.prefRgb === "boolean") setPrefRgb(stored.prefRgb);
  }, []);

  const persist = (update: Partial<StoredPrefs>) => savePrefs(update);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b0c2c] via-[#0e133b] to-[#0f0f17] text-slate-50">
      <TopBar />

      <main className="mx-auto flex max-w-6xl flex-col gap-10 px-6 pb-16">
        <div className="pt-6 text-center">
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight">
            Let’s get started.
          </h1>
        </div>

        <section className="grid gap-10 rounded-2xl bg-gradient-to-br from-[#0b0c2c]/50 via-[#0e133b]/60 to-[#0f0f17]/70 p-8 shadow-2xl ring-1 ring-white/5 md:grid-cols-2">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm text-slate-200">Use of the pc</label>
              <select
                value={useCase}
                onChange={(e) => {
                  setUseCase(e.target.value);
                  persist({ useCase: e.target.value });
                }}
                className="w-full rounded-lg border border-slate-600 bg-slate-900/40 px-3 py-2 text-sm text-slate-100"
              >
                <option>Gaming</option>
                <option>Workstation</option>
                <option>Streaming</option>
                <option>Everyday</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-slate-200">Desired specifications</label>
              <textarea
                value={specs}
                onChange={(e) => {
                  setSpecs(e.target.value);
                  persist({ specs: e.target.value });
                }}
                className="w-full rounded-lg border border-slate-600 bg-slate-900/40 px-3 py-2 text-sm text-slate-100"
                rows={3}
                placeholder="Intel/AMD CPU, Nvidia/AMD GPU, 16GB RAM, 1TB SSD, 1000W PSU, etc."
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-slate-200 flex items-center justify-between">
                <span>Budget</span>
                <span className="text-xs font-semibold text-blue-400">${Number(budget).toLocaleString()}</span>
              </label>
              <input
                type="range"
                min={500}
                max={5000}
                step={100}
                value={Number(budget)}
                onChange={(e) => {
                  setBudget(e.target.value);
                  persist({ budget: e.target.value });
                }}
                className="w-full accent-blue-400"
              />
              <div className="flex justify-between text-xs text-slate-400">
                <span>$500</span>
                <span>$2,750</span>
                <span>$5,000</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-slate-200">Case type</label>
              <select
                value={caseType}
                onChange={(e) => {
                  setCaseType(e.target.value);
                  persist({ caseType: e.target.value });
                }}
                className="w-full rounded-lg border border-slate-600 bg-slate-900/40 px-3 py-2 text-sm text-slate-100"
              >
                <option>Mid tower</option>
                <option>Mini ITX</option>
                <option>Full tower</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-slate-200">Preferences</label>
              <div className="flex flex-col gap-3 text-sm text-slate-200">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={prefGlass}
                    onChange={(e) => {
                      setPrefGlass(e.target.checked);
                      persist({ prefGlass: e.target.checked });
                    }}
                    className="accent-blue-400"
                  />
                  Tempered glass
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={prefRgb}
                    onChange={(e) => {
                      setPrefRgb(e.target.checked);
                      persist({ prefRgb: e.target.checked });
                    }}
                    className="accent-blue-400"
                  />
                  RGB
                </label>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start gap-10">
            <p className="text-sm text-slate-200/80">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Let’s narrow it down a little bit.
            </p>
            <button
              type="button"
              onClick={() => navigate(useCase === "Gaming" ? "/gaming" : "/narrow")}
              className="w-full max-w-xs rounded-xl bg-slate-800 px-6 py-4 text-center text-base font-semibold text-slate-100 transition hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-transparent"
            >
              Let's Go
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

function GamingPage() {
  const navigate = useNavigate();
  const [games, setGames] = useState("");
  const [resolution, setResolution] = useState("1080p");
  const [fps, setFps] = useState("60 FPS");

  useEffect(() => {
    const stored = loadPrefs();
    if (stored.games) setGames(stored.games);
    if (stored.resolution) setResolution(stored.resolution);
    if (stored.fps) setFps(stored.fps);
  }, []);

  const persist = (update: Partial<StoredPrefs>) => savePrefs(update);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b0c2c] via-[#0e133b] to-[#0f0f17] text-slate-50">
      <TopBar />
      <main className="mx-auto flex max-w-6xl flex-col gap-10 px-6 pb-16">
        <div className="pt-6 text-center">
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight">
            Write Down which Games you want to play
          </h1>
        </div>

        <section className="space-y-8 rounded-2xl bg-gradient-to-br from-[#0b0c2c]/50 via-[#0e133b]/60 to-[#0f0f17]/70 p-8 shadow-2xl ring-1 ring-white/5">
          <div className="space-y-2">
            <label className="text-sm text-slate-200">
              Specify what games you will be playing
            </label>
            <textarea
              value={games}
              onChange={(e) => {
                setGames(e.target.value);
                persist({ games: e.target.value });
              }}
              className="w-full rounded-lg border border-slate-600 bg-white text-slate-900 px-3 py-3 text-sm"
              rows={3}
              placeholder="e.g., Apex Legends, Cyberpunk 2077, Valorant..."
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm text-slate-200">Target resolution</label>
              <select
                value={resolution}
                onChange={(e) => {
                  setResolution(e.target.value);
                  persist({ resolution: e.target.value });
                }}
                className="w-full rounded-lg border border-slate-600 bg-white text-slate-900 px-3 py-2 text-sm"
              >
                <option>1080p</option>
                <option>1440p</option>
                <option>4K</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-slate-200">Target FPS</label>
              <select
                value={fps}
                onChange={(e) => {
                  setFps(e.target.value);
                  persist({ fps: e.target.value });
                }}
                className="w-full rounded-lg border border-slate-600 bg-white text-slate-900 px-3 py-2 text-sm"
              >
                <option>60 FPS</option>
                <option>120 FPS</option>
                <option>144 FPS</option>
                <option>240 FPS</option>
              </select>
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={() => navigate("/build")}
              className="w-full max-w-xs rounded-xl bg-slate-800 px-6 py-4 text-center text-base font-semibold text-slate-100 transition hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-transparent"
            >
              Let’s See the PC
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

type BuildItem = { part: string; model: string; price: string; note?: string };

function BuildPage() {
  const navigate = useNavigate();
  const { callApi } = useApi();
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<string | null>(null);
  const prefs = loadPrefs();
  const [initialized, setInitialized] = useState(false);

  const fallbackBuild: BuildItem[] = [
    { part: "CPU", model: "Intel Core i5-14600K", price: "$260", note: "Great 1440p gaming; strong single-core." },
    { part: "GPU", model: "NVIDIA RTX 4070 Super", price: "$549", note: "High FPS at 1440p; DLSS 3." },
    { part: "RAM", model: "32GB (2x16) DDR5-6000", price: "$110", note: "Plenty for modern games + multitask." },
    { part: "Storage", model: "1TB NVMe Gen4 SSD", price: "$90", note: "Fast load times; room for top titles." },
    { part: "Motherboard", model: "Z790 WiFi ATX", price: "$190", note: "PCIe Gen4, good VRMs, WiFi 6." },
    { part: "PSU", model: "750W 80+ Gold (fully modular)", price: "$100", note: "Headroom for GPU; efficient." },
    { part: "Case", model: "Mid-tower w/ airflow front", price: "$110", note: "Good thermals; tempered glass." },
    { part: "Cooling", model: "240mm AIO / dual tower air", price: "$90", note: "Keeps CPU cool and quiet." },
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
          found.push({ part: label, model: m[1], price: "", note: undefined });
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
            Based on your specs, here’s a balanced build and price overview.
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
                    <div className="text-slate-200">{item.model}</div>
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
                  Click “Regenerate with AI” for a fresh suggestion based on a
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

function HelpPage() {
  const navigate = useNavigate();
  const faqs = [
    {
      q: "What parts do I need to build a gaming PC?",
      a: "At minimum: CPU, GPU, motherboard, RAM, storage (SSD/HDD), power supply (PSU), case, and cooling. You’ll also need a monitor, keyboard, mouse, and an operating system like Windows.",
    },
    {
      q: "Is building a PC hard for beginners?",
      a: "It’s mostly plugging the right parts into the right slots. If you follow a step-by-step guide and take your time, it’s very doable even as a first project.",
    },
    {
      q: "How big should my power supply be?",
      a: "Add up the estimated wattage of your CPU and GPU, then choose a quality PSU with around 30–40% extra headroom. For most mid-range gaming PCs that’s 650–750W 80+ Gold.",
    },
    {
      q: "How much RAM do I need for gaming?",
      a: "16GB is the minimum for modern gaming; 32GB is ideal if you stream, multitask heavily, or play very demanding titles.",
    },
    {
      q: "Should I prioritize CPU or GPU?",
      a: "For gaming, the GPU usually matters more, especially at 1440p and 4K. For productivity (video editing, 3D, coding) a stronger CPU can be just as important.",
    },
    {
      q: "Do all parts fit together?",
      a: "You must match the CPU socket to the motherboard, check RAM type (DDR4 vs DDR5), ensure your case supports the motherboard size (ATX, mATX, ITX), and confirm the GPU length and PSU wattage/connector support.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b0c2c] via-[#0e133b] to-[#0f0f17] text-slate-50">
      <TopBar />
      <main className="mx-auto flex max-w-4xl flex-col gap-6 px-6 pb-16">
        <div className="pt-6 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            PC Building Help
          </h1>
          <p className="mt-2 text-sm text-slate-300">
            Quick answers to the most common questions when planning your first
            build.
          </p>
        </div>

        <section className="space-y-4 rounded-2xl bg-gradient-to-br from-[#0b0c2c]/60 via-[#0e133b]/70 to-[#0f0f17]/80 p-6 shadow-2xl ring-1 ring-white/5">
          {faqs.map((item) => (
            <div
              key={item.q}
              className="rounded-xl border border-white/10 bg-black/20 p-4 text-sm text-slate-100"
            >
              <h3 className="text-sm font-semibold">{item.q}</h3>
              <p className="mt-1 text-xs text-slate-200">{item.a}</p>
            </div>
          ))}
        </section>

        <div className="mt-2 flex flex-wrap gap-3 text-xs text-slate-300">
          <button
            onClick={() => navigate("/start")}
            className="rounded-lg border border-slate-600 px-4 py-2 font-semibold text-slate-100 transition hover:border-slate-300"
          >
            Go start a build
          </button>
          <button
            onClick={() => navigate("/chat")}
            className="rounded-lg border border-slate-600 px-4 py-2 font-semibold text-slate-100 transition hover:border-slate-300"
          >
            Ask the AI chat
          </button>
        </div>
      </main>
    </div>
  );
}

function NarrowSpecsPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b0c2c] via-[#0e133b] to-[#0f0f17] text-slate-50">
      <TopBar />
      <main className="mx-auto flex max-w-6xl flex-col gap-8 px-6 pb-16">
        <div className="pt-6 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Narrow your specs
          </h1>
          <p className="mt-2 text-sm text-slate-300">
            Dial in the details before we generate your build.
          </p>
        </div>

        <section className="grid gap-8 rounded-2xl bg-gradient-to-br from-[#0b0c2c]/50 via-[#0e133b]/60 to-[#0f0f17]/70 p-8 shadow-2xl ring-1 ring-white/5 md:grid-cols-2">
          <div className="space-y-4">
            <div>
              <label className="text-sm text-slate-200">CPU preference</label>
              <select className="mt-2 w-full rounded-lg border border-slate-600 bg-slate-900/40 px-3 py-2 text-sm text-slate-100">
                <option>No preference</option>
                <option>Intel</option>
                <option>AMD</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-slate-200">GPU target</label>
              <select className="mt-2 w-full rounded-lg border border-slate-600 bg-slate-900/40 px-3 py-2 text-sm text-slate-100">
                <option>Balanced (1080p/1440p)</option>
                <option>High-end (1440p/4K)</option>
                <option>Entry</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-slate-200">Storage</label>
              <select className="mt-2 w-full rounded-lg border border-slate-600 bg-slate-900/40 px-3 py-2 text-sm text-slate-100">
                <option>1TB NVMe</option>
                <option>2TB NVMe</option>
                <option>1TB NVMe + 2TB HDD</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-slate-200">PSU headroom</label>
              <input
                type="range"
                min={500}
                max={1000}
                className="mt-2 w-full accent-blue-400"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm text-slate-200">Thermals & noise</label>
              <select className="mt-2 w-full rounded-lg border border-slate-600 bg-slate-900/40 px-3 py-2 text-sm text-slate-100">
                <option>Quiet first</option>
                <option>Performance first</option>
                <option>Balanced</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-slate-200">Form factor</label>
              <select className="mt-2 w-full rounded-lg border border-slate-600 bg-slate-900/40 px-3 py-2 text-sm text-slate-100">
                <option>Mid tower</option>
                <option>Mini ITX</option>
                <option>Full tower</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-slate-200">
                Display target (for GPU pairing)
              </label>
              <select className="mt-2 w-full rounded-lg border border-slate-600 bg-slate-900/40 px-3 py-2 text-sm text-slate-100">
                <option>1080p 144Hz</option>
                <option>1440p 144Hz</option>
                <option>4K 60/120Hz</option>
              </select>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => navigate("/")}
                className="rounded-lg border border-slate-600 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:border-slate-300"
              >
                Back
              </button>
              <button
                onClick={() => navigate("/chat")}
                className="rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Continue to AI Chat
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function ChatPage() {
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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GetStartedPage />} />
        <Route path="/start" element={<StartFormPage />} />
        <Route path="/gaming" element={<GamingPage />} />
        <Route path="/narrow" element={<NarrowSpecsPage />} />
        <Route path="/build" element={<BuildPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/help" element={<HelpPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
