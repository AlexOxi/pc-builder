import type { StoredPrefs } from "../types";

const STORAGE_KEY = "pcbuilder_prefs";

export function loadPrefs(): StoredPrefs {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

export function savePrefs(update: Partial<StoredPrefs>) {
  const current = loadPrefs();
  const next = { ...current, ...update };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}

