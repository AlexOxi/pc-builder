import { useNavigate } from "react-router-dom";
import TopBar from "../components/TopBar";

export default function NarrowSpecsPage() {
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

