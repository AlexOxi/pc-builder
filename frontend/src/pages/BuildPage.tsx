import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../components/TopBar";
import { useAuth } from "../contexts/AuthContext";
import { useApi } from "../useApi";
import { formatCurrency } from "../utils/format";
import { loadPrefs } from "../utils/storage";
import { generateAlzaLink } from "../utils/alza";
import { saveBuild } from "../utils/builds";
import type { BuildItem } from "../types";

export default function BuildPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { callApi } = useApi();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const prefs = loadPrefs();
  const [initialized, setInitialized] = useState(false);

  const buildFromPrefs = (): { buildItems: BuildItem[]; total: string } => {
    const budget = Number(prefs.budget ?? 1500);
    const highEnd =
      prefs.gpuTarget?.includes("High-end") ||
      prefs.displayTarget?.includes("4K") ||
      budget >= 2200;
    const entry = prefs.gpuTarget === "Entry" || budget <= 900;
    const cpu =
      prefs.cpuPreference === "AMD"
        ? highEnd
          ? "AMD Ryzen 7 7800X3D"
          : "AMD Ryzen 5 7600"
        : prefs.cpuPreference === "Intel"
          ? highEnd
            ? "Intel Core i7-14700K"
            : "Intel Core i5-14400F"
          : highEnd
            ? "AMD Ryzen 7 7800X3D"
            : "Intel Core i5-14400F";
    const gpu = highEnd
      ? "NVIDIA RTX 4080 Super"
      : entry
        ? "NVIDIA RTX 4060"
        : "NVIDIA RTX 4070 Super";
    const ram = budget >= 1200 ? "32GB DDR5-6000" : "16GB DDR5-5600";
    const storage = prefs.storagePreference ?? "1TB NVMe";
    const motherboard = cpu.includes("AMD") ? "B650 WiFi ATX" : "B760 WiFi ATX";
    const psu = `${prefs.psuHeadroom ?? (highEnd ? "850" : "650")}W 80+ Gold`;
    const caseModel = prefs.formFactor ?? prefs.caseType ?? "Mid tower";
    const cooler =
      prefs.thermalsNoise === "Quiet first"
        ? "Quiet dual tower air cooler"
        : highEnd
          ? "240mm AIO liquid cooler"
          : "Tower air cooler";
    const total = formatCurrency(Math.max(700, budget));

    return {
      total,
      buildItems: [
        { part: "CPU", model: cpu, price: "", note: `Based on ${prefs.cpuPreference ?? "balanced"} preference.`, link: generateAlzaLink("CPU", cpu) },
        { part: "GPU", model: gpu, price: "", note: `Chosen for ${prefs.displayTarget ?? prefs.gpuTarget ?? "balanced gaming"}.`, link: generateAlzaLink("GPU", gpu) },
        { part: "RAM", model: ram, price: "", note: "Sized for the selected budget and use case.", link: generateAlzaLink("RAM", ram) },
        { part: "Storage", model: storage, price: "", note: "Uses your storage preference.", link: generateAlzaLink("SSD", storage) },
        { part: "Motherboard", model: motherboard, price: "", note: "Compatible board with WiFi.", link: generateAlzaLink("Motherboard", motherboard) },
        { part: "PSU", model: psu, price: "", note: "Matches your PSU headroom target.", link: generateAlzaLink("PSU", psu) },
        { part: "Case", model: caseModel, price: "", note: "Matches your preferred form factor.", link: generateAlzaLink("Case", caseModel) },
        { part: "Cooling", model: cooler, price: "", note: `Tuned for ${prefs.thermalsNoise ?? "balanced"} cooling.`, link: generateAlzaLink("CPU Cooler", cooler) },
      ],
    };
  };

  const fallbackBuild = buildFromPrefs();
  const [buildItems, setBuildItems] = useState<BuildItem[]>(fallbackBuild.buildItems);
  const [total, setTotal] = useState(fallbackBuild.total);

  const parseAIResult = (text: string): { buildItems: BuildItem[]; total: string } | null => {
    const cleaned = text
      .replace(/^```(?:json)?/i, "")
      .replace(/```$/, "")
      .trim();

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
          const newTotal = json.total ? String(json.total) : formatCurrency(0);
          setBuildItems(mapped);
          setTotal(newTotal);
          return { buildItems: mapped, total: newTotal };
        }
      }
    } catch {
    }

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
            link: generateAlzaLink(label, m[1]),
          });
          break;
        }
      }
    }
    if (found.length) {
      setBuildItems(found);
      return { buildItems: found, total: "" };
    }
    return null;
  };

  const regenerate = async () => {
    setLoading(true);
    try {
      const parts = [
        prefs.useCase && `Use case: ${prefs.useCase}`,
        prefs.games && `Games: ${prefs.games}`,
        prefs.resolution && `Resolution: ${prefs.resolution}`,
        prefs.fps && `Target FPS: ${prefs.fps}`,
        prefs.budget && `Budget: ${formatCurrency(Number(prefs.budget))}`,
        prefs.caseType && `Case type: ${prefs.caseType}`,
        prefs.prefGlass && "Prefers tempered glass",
        prefs.prefRgb && "Wants RGB",
        prefs.specs && `Extra specs: ${prefs.specs}`,
        prefs.cpuPreference && `CPU preference: ${prefs.cpuPreference}`,
        prefs.gpuTarget && `GPU target: ${prefs.gpuTarget}`,
        prefs.storagePreference && `Storage preference: ${prefs.storagePreference}`,
        prefs.psuHeadroom && `PSU headroom: ~${prefs.psuHeadroom}W`,
        prefs.thermalsNoise && `Thermals & noise: ${prefs.thermalsNoise}`,
        prefs.formFactor && `Form factor: ${prefs.formFactor}`,
        prefs.displayTarget && `Display target: ${prefs.displayTarget}`,
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
                "Generate a PC parts list that strictly follows these preferences. Do not ignore CPU brand, GPU target, storage, PSU headroom, form factor, thermals, display target, or budget:\n" +
                parts +
                "\nReturn only valid JSON in this exact shape: {\"build\":[{\"part\":\"CPU\",\"model\":\"...\",\"price\":\"...\",\"note\":\"...\"}],\"total\":\"...\"}. Use EUR prices formatted like 1 500 €. Include CPU, GPU, RAM, Storage, Motherboard, PSU, Case, and Cooling.",
            },
          ],
        }),
      });

      const msg = data.message || "(no response)";
      const parsed = parseAIResult(msg);
      if (user && parsed) {
        setSaving(true);
        try {
          await saveBuild(user.uid, {
            total: parsed.total,
            buildItems: parsed.buildItems,
            prefs,
          });
        } catch (e) {
          console.error("Failed to save build:", e);
        } finally {
          setSaving(false);
        }
      }
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
                {prefs.budget && (
                  <div>Budget: {formatCurrency(Number(prefs.budget))}</div>
                )}
                {prefs.caseType && <div>Case type: {prefs.caseType}</div>}
                {prefs.prefGlass && <div>Prefers tempered glass</div>}
                {prefs.prefRgb && <div>Wants RGB</div>}
                {prefs.specs && <div>Extra specs: {prefs.specs}</div>}
                {prefs.cpuPreference && (
                  <div>CPU preference: {prefs.cpuPreference}</div>
                )}
                {prefs.gpuTarget && <div>GPU target: {prefs.gpuTarget}</div>}
                {prefs.storagePreference && (
                  <div>Storage: {prefs.storagePreference}</div>
                )}
                {prefs.psuHeadroom && (
                  <div>PSU headroom: ~{prefs.psuHeadroom}W</div>
                )}
                {prefs.thermalsNoise && (
                  <div>Thermals & noise: {prefs.thermalsNoise}</div>
                )}
                {prefs.formFactor && (
                  <div>Form factor: {prefs.formFactor}</div>
                )}
                {prefs.displayTarget && (
                  <div>Display target: {prefs.displayTarget}</div>
                )}
              </div>
              <div className="flex items-center justify-between text-base font-semibold">
                <span>Estimated total</span>
                <span>{total}</span>
              </div>
              <p className="mt-2 text-xs text-slate-300">
                Prices are rough estimates; confirm with your preferred retailer.
              </p>
              <div className="mt-4 flex flex-col gap-3">
                {user && (
                  <button
                    type="button"
                    onClick={async () => {
                      if (!user) return;
                      setSaving(true);
                      try {
                        await saveBuild(user.uid, {
                          total,
                          buildItems,
                          prefs,
                        });
                        alert("Build saved to My builds.");
                      } catch (e) {
                        alert(e instanceof Error ? e.message : "Failed to save");
                      } finally {
                        setSaving(false);
                      }
                    }}
                    disabled={saving}
                    className="rounded-lg border border-cyan-500/50 bg-cyan-500/10 px-4 py-3 text-sm font-semibold text-cyan-300 transition hover:bg-cyan-500/20 disabled:opacity-50"
                  >
                    {saving ? "Saving…" : "Save to my builds"}
                  </button>
                )}
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
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

