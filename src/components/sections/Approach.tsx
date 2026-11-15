import { useEffect, useMemo, useRef, useState } from "react";
import { Compass, Terminal, ShieldCheck, Users, X, Check, ChevronRight } from "lucide-react";
import { ApproachDataService, ApproachComparison, ApproachHeader, Pillar, Troop } from "../../services/ApproachDataService";

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
        ? <>
            <text x="10" y="18" className="fill-muted-foreground font-mono text-[9px]">cheap &amp; fast</text>
            <text x="168" y="40" className="fill-destructive font-mono text-[11px]">breaks at scale</text>
          </>
        : <circle cx="230" cy="10" r="6" className="fill-primary animate-pulse" />}
      <text x="8" y="118" className="fill-muted-foreground font-mono text-[9px]">growth →</text>
    </svg>
  );
};

/** Reveals the trio with a staggered fade once it scrolls into view.
 *  `active` gates observation until the section's data has rendered the grid. */
const useRevealOnScroll = (active: boolean) => {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (!active) return;
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [active]);
  return { ref, shown };
};

const Approach = () => {
  const dataService = useMemo(() => new ApproachDataService(), []);
  const [header, setHeader] = useState<ApproachHeader | null>(null);
  const [comparison, setComparison] = useState<ApproachComparison | null>(null);
  const [pillars, setPillars] = useState<Pillar[]>([]);
  const [troop, setTroop] = useState<Troop | null>(null);
  const trio = useRevealOnScroll(!!header && !!comparison);

  useEffect(() => {
    Promise.all([
      dataService.getHeaderData(),
      dataService.getComparison(),
      dataService.getPillars(),
      dataService.getTroop(),
    ])
      .then(([h, c, p, t]) => { setHeader(h); setComparison(c); setPillars(p); setTroop(t); })
      .catch((e) => console.error("Failed to load approach data:", e));
  }, [dataService]);

  if (!header || !comparison) return null;

  const TroopIcon = troop ? iconMap[troop.icon as keyof typeof iconMap] : null;

  const sides = [
    { side: comparison.them, crash: true },
    { side: comparison.us, crash: false },
  ];

  return (
    <section id="approach" className="py-24 bg-background bg-grid">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="eyebrow mb-4">{header.eyebrow}</p>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">{header.title}</h2>
          <p className="text-lg">{header.description}</p>
        </div>

        {/* The trio: understand → command → review */}
        <div ref={trio.ref} className="grid md:grid-cols-3 gap-4 md:gap-6 mb-8">
          {pillars.map((p, i) => {
            const Icon = iconMap[p.icon as keyof typeof iconMap];
            return (
              <div
                key={p.id}
                className={`group relative rounded-2xl border border-border bg-card p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-glow ${trio.shown ? "animate-fade-in" : "opacity-0"}`}
                style={trio.shown ? { animationDelay: `${i * 160}ms`, animationFillMode: "both" } : undefined}
              >
                <span className="absolute left-5 top-4 font-mono text-xs tracking-widest text-muted-foreground">{p.step}</span>
                <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  {Icon && <Icon className="h-10 w-10" />}
                </div>
                <h3 className="text-2xl font-bold mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground">{p.description}</p>
                {i < pillars.length - 1 && (
                  <ChevronRight
                    className="hidden md:block absolute top-1/2 left-[calc(100%+12px)] -translate-x-1/2 -translate-y-1/2 h-8 w-8 text-primary z-10"
                    aria-hidden="true"
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* The troop strip */}
        {troop && (
          <div className="mx-auto mb-14 flex max-w-3xl flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-full border border-primary/30 bg-primary/5 px-6 py-3">
            <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-primary">
              {TroopIcon && <TroopIcon className="h-4 w-4" />}
              {troop.label}
            </span>
            <span className="text-sm text-muted-foreground">{troop.text}</span>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {sides.map(({ side, crash }) => (
            <div key={side.title} className={`rounded-xl bg-card p-7 ${crash ? "border border-border" : "border-2 border-primary shadow-glow"}`}>
              <p className={`font-mono text-xs uppercase tracking-[0.2em] mb-1 ${crash ? "text-muted-foreground" : "text-primary"}`}>{side.title}</p>
              <p className="mb-4 text-lg font-semibold">{side.tagline}</p>
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
      </div>
    </section>
  );
};

export default Approach;
