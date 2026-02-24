import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import type { BuildItem, StoredPrefs } from "../types";

export interface SavedBuild {
  id: string;
  userId: string;
  createdAt: { seconds: number; nanoseconds: number };
  total: string;
  buildItems: BuildItem[];
  prefs?: StoredPrefs;
}

const BUILDS_COLLECTION = "builds";

export async function saveBuild(
  userId: string,
  data: {
    total: string;
    buildItems: BuildItem[];
    prefs?: StoredPrefs;
  }
): Promise<string> {
  const docRef = await addDoc(collection(db, BUILDS_COLLECTION), {
    userId,
    createdAt: serverTimestamp(),
    total: data.total,
    buildItems: data.buildItems,
    prefs: data.prefs ?? null,
  });
  return docRef.id;
}

export async function getUserBuilds(userId: string): Promise<SavedBuild[]> {
  const q = query(
    collection(db, BUILDS_COLLECTION),
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => {
    const d = doc.data();
    return {
      id: doc.id,
      userId: d.userId as string,
      createdAt: d.createdAt as { seconds: number; nanoseconds: number },
      total: d.total as string,
      buildItems: (d.buildItems ?? []) as BuildItem[],
      prefs: d.prefs as StoredPrefs | undefined,
    };
  });
}
