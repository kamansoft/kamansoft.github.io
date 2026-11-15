import { useEffect, useMemo, useState } from "react";
import { MessageSquare, Map, FlaskConical, LayoutList, Package, RefreshCw } from "lucide-react";
import { useScrollProgress } from "@/hooks/use-in-view";
import { ProcessDataService, ProcessHeader, ProcessPhase } from "../../services/ProcessDataService";

const iconMap = { MessageSquare, Map, FlaskConical, LayoutList, Package, RefreshCw };

const Process = () => {
  const dataService = useMemo(() => new ProcessDataService(), []);
  const [header, setHeader] = useState<ProcessHeader | null>(null);
  const [phases, setPhases] = useState<ProcessPhase[]>([]);
  const track = useScrollProgress<HTMLDivElement>();

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

        <div ref={track.ref} className="explainer relative">
          {/* track fills as you scroll: horizontal on desktop, vertical on phones */}
          <div aria-hidden="true" className="absolute left-[8%] right-[8%] top-10 hidden lg:block h-0.5 bg-ink-border">
            <div className="h-full origin-left bg-signal shadow-glow transition-transform duration-200 ease-out" style={{ transform: `scaleX(${track.progress})` }} />
          </div>
          <div aria-hidden="true" className="absolute left-10 top-10 bottom-10 lg:hidden w-0.5 bg-ink-border">
            <div className="w-full h-full origin-top bg-signal transition-transform duration-200 ease-out" style={{ transform: `scaleY(${track.progress})` }} />
          </div>
          <ol className="relative grid lg:grid-cols-6 gap-y-10 gap-x-4">
            {phases.map((phase, i) => {
              const Icon = iconMap[phase.icon as keyof typeof iconMap];
              const isLoop = i === phases.length - 1;
              const lit = track.progress >= i / Math.max(1, phases.length - 1) - 0.02;
              return (
                <li key={phase.id} className="group flex lg:flex-col items-start lg:items-center gap-5 lg:gap-0 text-left lg:text-center">
                  <div className={`relative shrink-0 lg:mb-5 flex h-20 w-20 items-center justify-center rounded-full border-2 bg-ink transition-all duration-500 group-hover:scale-110 ${lit ? (isLoop ? "border-signal bg-signal text-ink shadow-glow" : "border-signal text-signal shadow-glow") : "border-ink-border text-ink-muted"}`}>
                    <span className={isLoop && lit ? "animate-spin [animation-duration:6s]" : ""}>{Icon && <Icon className="h-8 w-8" />}</span>
                    <span className={`absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full font-mono text-xs font-bold transition-colors duration-500 ${lit ? "bg-signal text-ink" : "bg-ink-foreground text-ink"}`}>{i + 1}</span>
                  </div>
                  <div className={`flex flex-col lg:items-center transition-opacity duration-500 ${lit ? "opacity-100" : "opacity-50"}`}>
                    <h3 className="text-lg font-semibold text-ink-foreground mb-1">{phase.title}</h3>
                    <p className="text-xs text-ink-muted mb-3 lg:max-w-[11rem]">{phase.description}</p>
                    <span className="self-start lg:self-center rounded-full border border-ink-border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-signal">{phase.duration}</span>
                    {phase.deliverable && lit && (
                      <span className="mt-3 self-start lg:self-center flex items-center gap-1.5 rounded-md border border-signal/50 bg-signal/10 px-2 py-1 font-mono text-[10px] text-signal animate-drop">
                        <Package className="h-3.5 w-3.5" aria-hidden="true" /> deliverable
                      </span>
                    )}
                  </div>
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
