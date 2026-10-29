import { useEffect, useMemo, useState } from "react";
import { MessageSquare, Map, FlaskConical, LayoutList, Package, RefreshCw } from "lucide-react";
import { ProcessDataService, ProcessHeader, ProcessPhase } from "../../services/ProcessDataService";

const iconMap = { MessageSquare, Map, FlaskConical, LayoutList, Package, RefreshCw };

const Process = () => {
  const dataService = useMemo(() => new ProcessDataService(), []);
  const [header, setHeader] = useState<ProcessHeader | null>(null);
  const [phases, setPhases] = useState<ProcessPhase[]>([]);
  const [note, setNote] = useState("");

  useEffect(() => {
    Promise.all([dataService.getHeaderData(), dataService.getPhases(), dataService.getNote()])
      .then(([h, p, n]) => { setHeader(h); setPhases(p); setNote(n); })
      .catch((e) => console.error("Failed to load process data:", e));
  }, [dataService]);

  if (!header) return null;

  return (
    <section id="process" className="py-24 bg-ink bg-grid-ink">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mb-16">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal mb-4">{header.eyebrow}</p>
          <h2 className="text-3xl md:text-5xl font-bold text-ink-foreground mb-5">{header.title}</h2>
          <p className="text-lg text-ink-muted">{header.description}</p>
        </div>

        <ol className="relative grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {phases.map((phase, i) => {
            const Icon = iconMap[phase.icon as keyof typeof iconMap];
            const isLoop = i === phases.length - 1;
            return (
              <li
                key={phase.id}
                className={`relative rounded-lg border p-7 transition-all duration-300 hover:-translate-y-1 ${
                  isLoop ? "border-signal bg-signal/5 shadow-glow" : "border-ink-border bg-ink-foreground/[0.03] hover:border-signal/50"
                }`}
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-4xl font-semibold text-signal/80">{String(i + 1).padStart(2, "0")}</span>
                  {Icon && <Icon className={`h-6 w-6 text-signal ${isLoop ? "animate-spin [animation-duration:6s]" : ""}`} />}
                </div>
                <h3 className="text-xl font-semibold text-ink-foreground mb-2">{phase.title}</h3>
                <p className="text-sm text-ink-muted mb-5">{phase.description}</p>
                <span className="inline-block rounded border border-ink-border px-2 py-1 font-mono text-[11px] uppercase tracking-wider text-ink-muted">
                  {phase.duration}
                </span>
              </li>
            );
          })}
        </ol>

        <p className="mt-12 text-center font-mono text-sm text-ink-muted">
          <span className="text-signal">↻</span> {note}
        </p>
      </div>
    </section>
  );
};

export default Process;
