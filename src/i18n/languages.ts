export const LANGUAGES = ["en", "es"] as const;
export type Lang = (typeof LANGUAGES)[number];
export const DEFAULT_LANG: Lang = "en";
export const STORAGE_KEY = "kamansoft-lang";

/** Saved choice wins; otherwise first browser language whose base code we support; else English. */
export function detectLanguage(browserLangs: readonly string[], saved?: string | null): Lang {
  if (saved && (LANGUAGES as readonly string[]).includes(saved)) return saved as Lang;
  for (const l of browserLangs) {
    const base = l.toLowerCase().split("-")[0];
    if ((LANGUAGES as readonly string[]).includes(base)) return base as Lang;
  }
  return DEFAULT_LANG;
}

let current: Lang = DEFAULT_LANG;
export const getCurrentLang = () => current;
export const setCurrentLang = (l: Lang) => { current = l; };

/** Picks data/{lang}/{name}.json from a loader registry, falling back to English when the translation is missing. */
export function resolveLoader<T>(registry: Record<string, T>, name: string, lang: Lang): T | undefined {
  return registry[`../data/${lang}/${name}.json`] ?? registry[`../data/${DEFAULT_LANG}/${name}.json`];
}
