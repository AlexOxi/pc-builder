import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TopBar from "../components/TopBar";
import { useAuth } from "../contexts/AuthContext";
import { generateAlzaLink } from "../utils/alza";
import type { SavedBuild } from "../utils/builds";
import { getUserBuilds } from "../utils/builds";

function formatDate(createdAt: { seconds: number; nanoseconds: number }): string {
  const d = new Date(createdAt.seconds * 1000);
  return d.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default function MyBuildsPage() {
  const { user, loading: authLoading } = useAuth();
  const [builds, setBuilds] = useState<SavedBuild[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    getUserBuilds(user.uid)
      .then((list) => {
        if (!cancelled) setBuilds(list);
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : "Failed to load builds");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [user]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#0a0b1a] text-slate-50">
        <TopBar />
        <main className="mx-auto max-w-4xl px-6 py-12 text-center text-slate-400">
          Loading…
        </main>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0a0b1a] text-slate-50">
        <TopBar />
        <main className="mx-auto max-w-4xl px-6 py-12">
          <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-8 text-center">
            <h1 className="text-2xl font-bold text-white">My Builds</h1>
            <p className="mt-2 text-slate-400">
              Log in to see and manage your saved PC builds.
            </p>
            <Link
              to="/login"
              className="mt-6 inline-block rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-white transition hover:bg-cyan-400"
            >
              Log in
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0b1a] text-slate-50">
      <TopBar />
      <main className="mx-auto max-w-4xl px-6 pb-16 pt-6">
        <h1 className="text-3xl font-bold text-white">My Builds</h1>
        <p className="mt-1 text-sm text-slate-400">
          All builds you’ve saved from the build page.
        </p>

        {error && (
          <div className="mt-4 rounded-lg bg-red-500/20 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}

        {loading ? (
          <div className="mt-8 flex items-center gap-3 text-slate-400">
            <span className="h-6 w-6 animate-spin rounded-full border-2 border-slate-500 border-t-transparent" />
            Loading your builds…
          </div>
        ) : builds.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-white/10 bg-slate-900/80 p-8 text-center">
            <p className="text-slate-400">No saved builds yet.</p>
            <p className="mt-1 text-sm text-slate-500">
              Generate a build on the build page and click “Save to my builds”.
            </p>
            <Link
              to="/start"
              className="mt-6 inline-block rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-white transition hover:bg-cyan-400"
            >
              Start a build
            </Link>
          </div>
        ) : (
          <ul className="mt-6 space-y-4">
            {builds.map((build) => (
              <li
                key={build.id}
                className="rounded-xl border border-white/10 bg-slate-900/80 shadow-lg"
              >
                <button
                  type="button"
                  onClick={() =>
                    setExpandedId((id) => (id === build.id ? null : build.id))
                  }
                  className="flex w-full items-center justify-between px-5 py-4 text-left"
                >
                  <div>
                    <span className="font-semibold text-white">
                      {formatDate(build.createdAt)}
                    </span>
                    <span className="ml-3 text-slate-400">·</span>
                    <span className="ml-3 text-cyan-300">{build.total}</span>
                  </div>
                  <span className="text-slate-400">
                    {expandedId === build.id ? "▼" : "▶"}
                  </span>
                </button>
                {expandedId === build.id && (
                  <div className="border-t border-white/10 px-5 py-4">
                    <div className="divide-y divide-white/10 rounded-lg border border-white/10 bg-black/30">
                      {build.buildItems.map((item) => (
                        <div
                          key={item.part}
                          className="flex flex-col gap-0.5 px-4 py-3 text-sm"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-slate-100">
                              {item.part}
                            </span>
                            <span className="text-slate-300">{item.price}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-slate-300">{item.model}</span>
                            {item.link && (
                              <a
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-cyan-400 hover:underline"
                              >
                                Alza.sk →
                              </a>
                            )}
                            {!item.link && item.part && item.model && (
                              <a
                                href={generateAlzaLink(item.part, item.model)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-cyan-400 hover:underline"
                              >
                                Alza.sk →
                              </a>
                            )}
                          </div>
                          {item.note && (
                            <p className="text-xs text-slate-500">{item.note}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
