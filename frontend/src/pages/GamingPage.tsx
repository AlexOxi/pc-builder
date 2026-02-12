import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../components/TopBar";
import { loadPrefs, savePrefs } from "../utils/storage";
import type { StoredPrefs } from "../types";

export default function GamingPage() {
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
              Let's See the PC
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

