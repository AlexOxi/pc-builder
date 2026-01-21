import { useNavigate } from "react-router-dom";
import TopBar from "../components/TopBar";

export default function HelpPage() {
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