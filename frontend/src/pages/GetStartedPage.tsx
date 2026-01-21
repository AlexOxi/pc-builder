import { Link } from "react-router-dom";
import TopBar from "../components/TopBar";

export default function GetStartedPage() {
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

