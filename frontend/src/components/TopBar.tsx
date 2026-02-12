import { Link } from "react-router-dom";

export default function TopBar() {
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
      </div>
    </header>
  );
}