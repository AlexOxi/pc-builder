export interface StoredPrefs {
  useCase?: string;
  specs?: string;
  budget?: string;
  caseType?: string;
  prefGlass?: boolean;
  prefRgb?: boolean;
  games?: string;
  resolution?: string;
  fps?: string;
}

export interface Message {
  role: "user" | "assistant";
  content: string;
}

export interface BuildItem {
  part: string;
  model: string;
  price: string;
  note?: string;
  link?: string;
}

