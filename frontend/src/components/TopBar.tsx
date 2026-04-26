import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function TopBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading, logout } = useAuth();
  const canGoBack = location.pathname !== "/";

  return (
    <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 text-sm text-slate-200">
      <div className="flex items-center gap-2">
        {canGoBack && (
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="rounded-full border border-slate-500/70 bg-black/40 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-200 transition hover:border-slate-200 hover:text-white"
          >
            Back
          </button>
        )}
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
      <div className="flex items-center gap-4">
        {!loading &&
          (user ? (
            <>
              <Link
                to="/my-builds"
                className="rounded-lg border border-slate-600 px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:border-slate-400 hover:text-white"
              >
                My builds
              </Link>
              <span className="max-w-[160px] truncate text-xs text-slate-400 sm:max-w-[220px]">
                {user.email}
              </span>
              <button
                type="button"
                onClick={() => logout()}
                className="rounded-lg border border-slate-600 px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:border-slate-400 hover:text-white"
              >
                Log out
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="rounded-lg border border-cyan-500/50 bg-cyan-500/10 px-3 py-1.5 text-xs font-medium text-cyan-300 transition hover:bg-cyan-500/20"
            >
              Log in
            </Link>
          ))}
      </div>
    </header>
  );
}