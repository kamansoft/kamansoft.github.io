import { useEffect, useMemo, useState } from "react";
import { Compass, Terminal, ShieldCheck, Users, X, Check } from "lucide-react";
import { ApproachDataService, ApproachComparison, ApproachHeader, Pillar } from "../../services/ApproachDataService";

const iconMap = { Compass, Terminal, ShieldCheck, Users };

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

  return (
    <section id="approach" className="py-24 bg-background bg-grid">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mb-14">
          <p className="eyebrow mb-4">{header.eyebrow}</p>
          <h2 className="text-3xl md:text-5xl font-bold mb-5">{header.title}</h2>
          <p className="text-lg">{header.description}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <div className="rounded-lg border border-border bg-card p-8">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">Other agencies · {comparison.them.label}</p>
            <ul className="space-y-4">
              {comparison.them.points.map((p) => (
                <li key={p} className="flex gap-3 text-muted-foreground">
                  <X className="h-5 w-5 shrink-0 text-destructive mt-0.5" />
                  <span className="line-through decoration-destructive/40">{p}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border-2 border-primary bg-card p-8 shadow-glow">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary mb-6">Kamansoft · {comparison.us.label}</p>
            <ul className="space-y-4">
              {comparison.us.points.map((p) => (
                <li key={p} className="flex gap-3 text-foreground font-medium">
                  <Check className="h-5 w-5 shrink-0 text-primary mt-0.5" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-lg overflow-hidden border border-border">
          {pillars.map((p, i) => {
            const Icon = iconMap[p.icon as keyof typeof iconMap];
            return (
              <div key={p.id} className="bg-card p-7 group hover:bg-secondary transition-colors">
                <div className="flex items-center justify-between mb-6">
                  {Icon && <Icon className="h-7 w-7 text-primary" />}
                  <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{p.title}</h3>
                <p className="text-sm">{p.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Approach;
