import { Link } from "react-router-dom";
import TopBar from "../components/TopBar";

export default function GetStartedPage() {
  return (
    <div className="min-h-screen bg-[#0a0b1a] text-slate-50">
      <TopBar />

      <main className="mx-auto max-w-6xl px-6 pb-20 pt-6">
        {/* Hero: image + content side by side on large screens */}
        <section className="grid min-h-[70vh] items-center gap-12 rounded-3xl bg-gradient-to-br from-slate-900/80 via-[#0e133b]/90 to-[#0a0b1a] p-8 shadow-2xl ring-1 ring-white/10 md:grid-cols-2 md:gap-16 md:p-12">
          {/* PC image */}
          <div className="order-2 md:order-1">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=774&auto=format&fit=crop"
                alt="Gaming PC setup with RGB lighting"
                className="h-full w-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
          </div>

          {/* Copy + CTA */}
          <div className="order-1 flex flex-col justify-center md:order-2">
            <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-cyan-500/40 bg-cyan-500/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-cyan-300">
              <span className="h-2 w-2 rounded-full bg-cyan-400" />
              PC Builder
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              Build the PC of your dreams in minutes
            </h1>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-slate-300">
              Choose your parts, check compatibility, and get a ready-to-go list
              optimized for performance, thermals, and budget.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/start"
                className="inline-flex items-center justify-center rounded-xl bg-cyan-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-cyan-500/25 transition hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-[#0a0b1a]"
              >
                Let's Get Started
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
