import { getCurrentLang, resolveLoader } from "./languages";

const files = import.meta.glob("../data/*/*.json");

export async function loadLocalized(name: string, lang = getCurrentLang()) {
  const loader = resolveLoader(files, name, lang);
  if (!loader) throw new Error(`Missing data file: ${name}`);
  return ((await loader()) as { default: any }).default;
}
