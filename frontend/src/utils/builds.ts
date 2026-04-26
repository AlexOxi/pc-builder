import {
  addDoc,
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
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
const USERS_COLLECTION = "users";

function userBuildsCollection(userId: string) {
  return collection(db, USERS_COLLECTION, userId, BUILDS_COLLECTION);
}

export async function saveBuild(
  userId: string,
  data: {
    total: string;
    buildItems: BuildItem[];
    prefs?: StoredPrefs;
  }
): Promise<string> {
  await setDoc(
    doc(db, USERS_COLLECTION, userId),
    {
      userId,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );

  const docRef = await addDoc(userBuildsCollection(userId), {
    userId,
    createdAt: serverTimestamp(),
    total: data.total,
    buildItems: data.buildItems,
    prefs: data.prefs ?? null,
  });
  return docRef.id;
}

export async function getUserBuilds(userId: string): Promise<SavedBuild[]> {
  const q = query(userBuildsCollection(userId), orderBy("createdAt", "desc"));
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
