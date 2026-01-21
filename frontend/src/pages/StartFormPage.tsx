import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../components/TopBar";
import { loadPrefs, savePrefs } from "../utils/storage";
import { StoredPrefs } from "../types";

export default function StartFormPage() {
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
            Let's get started.
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Let's narrow it down a little bit.
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

