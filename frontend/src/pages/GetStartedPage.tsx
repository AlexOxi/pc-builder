import { Link } from "react-router-dom";
import TopBar from "../components/TopBar";

export default function GetStartedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b0c2c] via-[#0e133b] to-[#0f0f17] text-slate-50">
      <TopBar />

      <main className="mx-auto flex max-w-6xl flex-col gap-10 px-6 pb-16">
        <div className="flex items-center justify-center pt-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-400/60 bg-gradient-to-br from-blue-500/40 via-indigo-500/40 to-slate-900/60 text-2xl font-bold tracking-tight text-slate-100 shadow-lg">
            <span className="sr-only">PC Builder</span>
            <span>PB</span>
          </div>
        </div>

        <div className="text-center">
          <h1 className="mt-4 text-5xl sm:text-6xl font-bold tracking-tight">
            PC Builder
          </h1>
        </div>

        <section className="mt-6 rounded-2xl bg-gradient-to-br from-[#0b0c2c]/50 via-[#0e133b]/60 to-[#0f0f17]/70 p-8 shadow-2xl ring-1 ring-white/5">
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
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <Link
                to="/start"
                className="w-full rounded-xl bg-slate-800 px-6 py-4 text-center text-base font-semibold text-slate-100 transition hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-transparent sm:w-auto"
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

