import { useEffect, useMemo, useState } from "react";
import { MessageSquare, Map, FlaskConical, LayoutList, Package, RefreshCw } from "lucide-react";
import { ProcessDataService, ProcessHeader, ProcessPhase } from "../../services/ProcessDataService";

const iconMap = { MessageSquare, Map, FlaskConical, LayoutList, Package, RefreshCw };

const Process = () => {
  const dataService = useMemo(() => new ProcessDataService(), []);
  const [header, setHeader] = useState<ProcessHeader | null>(null);
  const [phases, setPhases] = useState<ProcessPhase[]>([]);

  useEffect(() => {
    Promise.all([dataService.getHeaderData(), dataService.getPhases()])
      .then(([h, p]) => { setHeader(h); setPhases(p); })
      .catch((e) => console.error("Failed to load process data:", e));
  }, [dataService]);

  if (!header) return null;

  return (
    <section id="process" className="py-24 bg-ink bg-grid-ink overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal mb-4">{header.eyebrow}</p>
          <h2 className="text-3xl md:text-5xl font-bold text-ink-foreground mb-4">{header.title}</h2>
          <p className="text-lg text-ink-muted">{header.description}</p>
        </div>

        <div className="relative">
          {/* track line with moving pulse */}
          <div className="absolute left-[8%] right-[8%] top-10 hidden lg:block h-0.5 bg-ink-border overflow-hidden">
            <div className="h-full w-1/4 bg-gradient-to-r from-transparent via-signal to-transparent animate-track" />
          </div>
          <ol className="relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-12 gap-x-4">
            {phases.map((phase, i) => {
              const Icon = iconMap[phase.icon as keyof typeof iconMap];
              const isLoop = i === phases.length - 1;
              return (
                <li key={phase.id} className="group flex flex-col items-center text-center animate-fade-in" style={{ animationDelay: `${i * 120}ms`, animationFillMode: "both" }}>
                  <div className={`relative mb-5 flex h-20 w-20 items-center justify-center rounded-full border-2 transition-all duration-300 group-hover:scale-110 ${isLoop ? "border-signal bg-signal text-ink shadow-glow" : "border-signal/40 bg-ink text-signal group-hover:border-signal"}`}>
                    {Icon && <Icon className={`h-8 w-8 ${isLoop ? "animate-spin [animation-duration:6s]" : ""}`} />}
                    <span className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-ink-foreground font-mono text-xs font-bold text-ink">{i + 1}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-ink-foreground mb-1">{phase.title}</h3>
                  <p className="text-xs text-ink-muted mb-3 max-w-[11rem]">{phase.description}</p>
                  <span className="rounded-full border border-ink-border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-signal">{phase.duration}</span>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default Process;
