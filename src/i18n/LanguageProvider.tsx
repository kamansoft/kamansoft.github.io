import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { detectLanguage, setCurrentLang, STORAGE_KEY, type Lang } from "./languages";
import en from "@/data/en/ui.json";
import es from "@/data/es/ui.json";

export type UiStrings = typeof en;
const ui: Record<Lang, UiStrings> = { en, es };

const initial = (): Lang => {
  let saved: string | null = null;
  try { saved = localStorage.getItem(STORAGE_KEY); } catch { /* ignore */ }
  const l = detectLanguage(typeof navigator !== "undefined" ? navigator.languages ?? [navigator.language] : [], saved);
  setCurrentLang(l);
  return l;
};

const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: UiStrings }>({ lang: "en", setLang: () => {}, t: en });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initial);
  const setLang = (l: Lang) => {
    setCurrentLang(l);
    try { localStorage.setItem(STORAGE_KEY, l); } catch { /* ignore */ }
    setLangState(l);
  };
  const t = ui[lang];
  useEffect(() => {
    document.documentElement.lang = lang === "es" ? "es-419" : "en";
    document.title = t.meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", t.meta.description);
  }, [lang, t]);
  // Remount the tree on language change so every section reloads its localized data.
  return <Ctx.Provider value={{ lang, setLang, t }}><div key={lang} className="contents">{children}</div></Ctx.Provider>;
}

export const useLanguage = () => useContext(Ctx);
