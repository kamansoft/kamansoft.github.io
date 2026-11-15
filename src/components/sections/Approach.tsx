import { useEffect, useMemo, useState } from "react";
import { Compass, Terminal, ShieldCheck, Users, X, Check, ChevronRight } from "lucide-react";
import { ApproachDataService, ApproachComparison, ApproachHeader, Pillar, Troop } from "../../services/ApproachDataService";
import TroopNetwork from "../graphics/TroopNetwork";
import { useInView } from "@/hooks/use-in-view";

const iconMap = { Compass, Terminal, ShieldCheck, Users };

/** Each pillar icon gets one small motion that says what the step does. */
const iconMotion: Record<string, string> = { Compass: "animate-scan", Terminal: "", ShieldCheck: "" };

/** Growth chart: crash=true rises, cracks at the peak, then collapses; otherwise climbs with milestone markers. */
const GrowthChart = ({ crash, active, markers }: { crash: boolean; active: boolean; markers: string[] }) => {
  const path = crash
    ? "M10 110 C 50 100, 70 40, 110 35 S 150 30, 165 45 L 180 105 L 230 112"
    : "M10 110 C 60 100, 90 80, 130 60 S 200 20, 230 10";
  const marks = [{ x: 60, y: 99 }, { x: 130, y: 60 }, { x: 195, y: 27 }];
  return (
    <svg viewBox="0 0 240 120" className="explainer w-full h-32 overflow-visible" aria-hidden="true">
      {[30, 60, 90].map((y) => <line key={y} x1="0" x2="240" y1={y} y2={y} className="stroke-border" strokeDasharray="3 5" />)}
      {active && <>
        <path d={path} fill="none" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"
          className={`${crash ? "stroke-destructive" : "stroke-primary"} animate-draw`} pathLength={1} strokeDasharray="1" />
        {crash ? <>
          <path d="M150 22 l5 8 l-6 4 l6 7" className="stroke-destructive fill-none animate-pop" strokeWidth="2" style={{ transformBox: "fill-box", animationDelay: "1100ms" }} />
          <path d="M170 28 l-4 7 l6 3" className="stroke-destructive fill-none animate-pop" strokeWidth="2" style={{ transformBox: "fill-box", animationDelay: "1250ms" }} />
          <text x="10" y="18" className="fill-muted-foreground font-mono text-[9px]">cheap &amp; fast</text>
          <text x="186" y="88" className="fill-destructive font-mono text-[11px] animate-fade-in" style={{ animationDelay: "1600ms", animationFillMode: "both" }}>breaks at scale</text>
        </> : <>
          {markers.slice(0, 3).map((m, i) => (
            <g key={m} className="animate-pop" style={{ transformBox: "fill-box", transformOrigin: "center", animationDelay: `${500 + i * 450}ms` }}>
              <circle cx={marks[i].x} cy={marks[i].y} r="5" className="fill-primary" />
              <text x={marks[i].x - 4} y={marks[i].y + 18} className="fill-foreground font-mono text-[9px]">{m}</text>
            </g>
          ))}
          <circle cx="230" cy="10" r="6" className="fill-primary animate-pulse" />
        </>}
      </>}
      <text x="8" y="118" className="fill-muted-foreground font-mono text-[9px]">growth →</text>
    </svg>
  );
};

const Approach = () => {
  const dataService = useMemo(() => new ApproachDataService(), []);
  const [header, setHeader] = useState<ApproachHeader | null>(null);
  const [comparison, setComparison] = useState<ApproachComparison | null>(null);
  const [pillars, setPillars] = useState<Pillar[]>([]);
  const [troop, setTroop] = useState<Troop | null>(null);
  const trio = useInView(0.2);
  const troopView = useInView(0.5);
  const charts = useInView(0.35);

  useEffect(() => {
    Promise.all([dataService.getHeaderData(), dataService.getComparison(), dataService.getPillars(), dataService.getTroop()])
      .then(([h, c, p, t]) => { setHeader(h); setComparison(c); setPillars(p); setTroop(t); })
      .catch((e) => console.error("Failed to load approach data:", e));
  }, [dataService]);

  if (!header || !comparison) return null;

  const TroopIcon = troop ? iconMap[troop.icon as keyof typeof iconMap] : null;
  const sides = [{ side: comparison.them, crash: true }, { side: comparison.us, crash: false }];
  const stepMs = 600;

  return (
    <section id="approach" className="py-24 bg-background bg-grid">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="eyebrow mb-4">{header.eyebrow}</p>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">{header.title}</h2>
          <p className="text-lg">{header.description}</p>
        </div>

        {/* The trio: a line of light runs through understand → command → review */}
        <div ref={trio.ref} className="explainer relative mb-8">
          <div aria-hidden="true" className="absolute left-[16%] right-[16%] top-[4.25rem] hidden md:block h-0.5 bg-border overflow-hidden">
            <div className="h-full origin-left bg-primary transition-transform ease-out" style={{ transform: `scaleX(${trio.inView ? 1 : 0})`, transitionDuration: `${stepMs * 3}ms` }} />
          </div>
          <div className="relative grid md:grid-cols-3 gap-4 md:gap-6">
            {pillars.map((p, i) => {
              const Icon = iconMap[p.icon as keyof typeof iconMap];
              const lit = trio.inView;
              return (
                <div key={p.id}
                  className={`group relative rounded-2xl border bg-card p-8 text-center transition-all duration-500 hover:-translate-y-1 hover:border-primary hover:shadow-glow ${lit ? "opacity-100 translate-y-0 border-primary/40" : "opacity-0 translate-y-5 border-border"}`}
                  style={{ transitionDelay: lit ? `${i * stepMs}ms` : "0ms" }}>
                  <span className="absolute left-5 top-4 font-mono text-xs tracking-widest text-muted-foreground">{p.step}</span>
                  <div className="relative mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <span className={iconMotion[p.icon] ?? ""}>{Icon && <Icon className="h-10 w-10" />}</span>
                    {p.icon === "Terminal" && <span aria-hidden="true" className="absolute bottom-3 right-3 h-1 w-3 bg-current animate-blink" />}
                    {p.icon === "ShieldCheck" && lit && <span aria-hidden="true" className="absolute inset-0 rounded-2xl border-2 border-primary animate-ping [animation-iteration-count:2]" style={{ animationDelay: `${i * stepMs + 400}ms` }} />}
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{p.title}</h3>
                  <p className="text-sm text-muted-foreground">{p.description}</p>
                  {i < pillars.length - 1 && (
                    <ChevronRight className="hidden md:block absolute top-1/2 left-[calc(100%+12px)] -translate-x-1/2 -translate-y-1/2 h-8 w-8 text-primary z-10" aria-hidden="true" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* The troop: one engineer node directing humans (circles) and AI agents (squares) */}
        {troop && (
          <div ref={troopView.ref} className="mx-auto mb-14 flex max-w-3xl flex-col sm:flex-row items-center justify-center gap-x-6 gap-y-2 rounded-2xl border border-primary/30 bg-primary/5 px-6 py-3">
            <TroopNetwork active={troopView.inView} />
            <div className="text-center sm:text-left">
              <span className="flex items-center justify-center sm:justify-start gap-2 font-mono text-xs uppercase tracking-[0.2em] text-primary">
                {TroopIcon && <TroopIcon className="h-4 w-4" />}{troop.label}
              </span>
              <span className="text-sm text-muted-foreground">{troop.text}</span>
            </div>
          </div>
        )}

        <div ref={charts.ref} className="relative grid md:grid-cols-2 gap-6">
          {comparison.caption && (
            <span className="md:absolute md:left-1/2 md:-top-4 md:-translate-x-1/2 z-10 mx-auto rounded-full border border-border bg-background px-4 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              {comparison.caption}
            </span>
          )}
          {sides.map(({ side, crash }) => (
            <div key={side.title} className={`rounded-xl bg-card p-7 ${crash ? "border border-border" : "border-2 border-primary shadow-glow"}`}>
              <p className={`font-mono text-xs uppercase tracking-[0.2em] mb-1 ${crash ? "text-muted-foreground" : "text-primary"}`}>{side.title}</p>
              <p className="mb-4 text-lg font-semibold">{side.tagline}</p>
              <GrowthChart crash={crash} active={charts.inView} markers={crash ? [] : side.points.map((pt) => pt.split(" ")[0])} />
              <ul className="mt-5 flex flex-wrap gap-2">
                {side.points.map((pt) => (
                  <li key={pt} className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-sm ${crash ? "bg-destructive/10 text-muted-foreground" : "bg-primary/10 text-foreground font-medium"}`}>
                    {crash ? <X className="h-4 w-4 text-destructive" /> : <Check className="h-4 w-4 text-primary" />}{pt}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Approach;
