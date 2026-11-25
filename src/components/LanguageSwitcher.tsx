import { useLanguage } from "@/i18n/LanguageProvider";
import { LANGUAGES } from "@/i18n/languages";

const LanguageSwitcher = () => {
  const { lang, setLang, t } = useLanguage();
  return (
    <div role="group" aria-label={t.nav.language} className="flex items-center rounded-md border border-white/15 p-0.5 font-mono text-xs">
      {LANGUAGES.map((l) => (
        <button key={l} type="button" onClick={() => setLang(l)} aria-pressed={lang === l}
          className={`rounded px-2 py-1 uppercase transition-colors ${lang === l ? "bg-signal text-ink font-semibold" : "text-white/80 hover:text-white"}`}>
          {l}
        </button>
      ))}
    </div>
  );
};
export default LanguageSwitcher;
