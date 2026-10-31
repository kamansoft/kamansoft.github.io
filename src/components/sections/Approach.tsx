import { useEffect, useMemo, useState } from "react";
import { Compass, Terminal, ShieldCheck, Users, X, Check } from "lucide-react";
import { ApproachDataService, ApproachComparison, ApproachHeader, Pillar } from "../../services/ApproachDataService";

const iconMap = { Compass, Terminal, ShieldCheck, Users };

/** Small growth chart: crash=true draws a line that rises then collapses. */
const GrowthChart = ({ crash }: { crash: boolean }) => {
  const path = crash
    ? "M10 110 C 50 100, 70 40, 110 35 S 150 30, 165 45 L 180 105 L 230 112"
    : "M10 110 C 60 100, 90 80, 130 60 S 200 20, 230 10";
  return (
    <svg viewBox="0 0 240 120" className="w-full h-32" aria-hidden="true">
      {[30, 60, 90].map((y) => <line key={y} x1="0" x2="240" y1={y} y2={y} className="stroke-border" strokeDasharray="3 5" />)}
      <path d={path} fill="none" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"
        className={`${crash ? "stroke-destructive" : "stroke-primary"} animate-draw`} pathLength={1} strokeDasharray="1" />
      {crash
        ? <text x="168" y="40" className="fill-destructive font-mono text-[11px]">breaks at scale</text>
        : <circle cx="230" cy="10" r="6" className="fill-primary animate-pulse" />}
      <text x="8" y="118" className="fill-muted-foreground font-mono text-[9px]">growth →</text>
    </svg>
  );
};

const Approach = () => {
  const dataService = useMemo(() => new ApproachDataService(), []);
  const [header, setHeader] = useState<ApproachHeader | null>(null);
  const [comparison, setComparison] = useState<ApproachComparison | null>(null);
  const [pillars, setPillars] = useState<Pillar[]>([]);

  useEffect(() => {
    Promise.all([dataService.getHeaderData(), dataService.getComparison(), dataService.getPillars()])
      .then(([h, c, p]) => { setHeader(h); setComparison(c); setPillars(p); })
      .catch((e) => console.error("Failed to load approach data:", e));
  }, [dataService]);

  if (!header || !comparison) return null;

  const sides = [
    { side: comparison.them, crash: true, title: "Other agencies" },
    { side: comparison.us, crash: false, title: "Kamansoft" },
  ];

  return (
    <section id="approach" className="py-24 bg-background bg-grid">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="eyebrow mb-4">{header.eyebrow}</p>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">{header.title}</h2>
          <p className="text-lg">{header.description}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {sides.map(({ side, crash, title }) => (
            <div key={title} className={`rounded-xl bg-card p-7 ${crash ? "border border-border" : "border-2 border-primary shadow-glow"}`}>
              <p className={`font-mono text-xs uppercase tracking-[0.2em] mb-2 ${crash ? "text-muted-foreground" : "text-primary"}`}>{title}</p>
              <GrowthChart crash={crash} />
              <ul className="mt-5 flex flex-wrap gap-2">
                {side.points.map((p) => (
                  <li key={p} className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-sm ${crash ? "bg-destructive/10 text-muted-foreground" : "bg-primary/10 text-foreground font-medium"}`}>
                    {crash ? <X className="h-4 w-4 text-destructive" /> : <Check className="h-4 w-4 text-primary" />}
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {pillars.map((p) => {
            const Icon = iconMap[p.icon as keyof typeof iconMap];
            return (
              <div key={p.id} className="group rounded-xl border border-border bg-card p-6 text-center transition-all hover:-translate-y-1 hover:border-primary">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  {Icon && <Icon className="h-7 w-7" />}
                </div>
                <h3 className="text-lg font-semibold">{p.title}</h3>
                <p className="text-sm text-muted-foreground">{p.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Approach;
