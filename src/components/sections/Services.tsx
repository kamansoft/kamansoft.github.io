import { Factory, Code, Shield, ArrowUpRight } from "lucide-react";
import { ServicesDataService, ServiceGroup } from "../../services/ServicesDataService";
import { useMemo, useEffect, useState } from "react";

const iconMap = { Factory, Code, Shield };

const Services = () => {
  const dataService = useMemo(() => new ServicesDataService(), []);
  const [groups, setGroups] = useState<ServiceGroup[]>([]);
  const [header, setHeader] = useState<{ eyebrow?: string; title: string; description: string }>({ title: "", description: "" });

  useEffect(() => {
    Promise.all([dataService.getGroups(), dataService.getHeaderData()])
      .then(([g, h]) => { setGroups(g); setHeader(h); })
      .catch((e) => console.error("Failed to load services data:", e));
  }, [dataService]);

  return (
    <section id="services" className="py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="eyebrow mb-4">{header.eyebrow}</p>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">{header.title}</h2>
          <p className="text-lg">{header.description}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {groups.map((g, i) => {
            const Icon = iconMap[g.icon as keyof typeof iconMap];
            return (
              <div key={g.id} className="group relative overflow-hidden rounded-xl border border-border bg-card p-8 transition-all duration-300 hover:-translate-y-2 hover:border-primary hover:shadow-glow">
                <span className="absolute -right-4 -top-6 font-mono text-[9rem] font-bold leading-none text-primary/5 select-none">{i + 1}</span>
                <div className="relative mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-glow transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
                  {Icon && <Icon className="h-10 w-10" strokeWidth={1.75} />}
                </div>
                <h3 className="relative text-2xl font-bold mb-2 flex items-center gap-2">
                  {g.title}
                  <ArrowUpRight className="h-5 w-5 text-primary opacity-0 transition-opacity group-hover:opacity-100" />
                </h3>
                <p className="relative text-muted-foreground mb-6">{g.tagline}</p>
                <div className="relative flex flex-wrap gap-2">
                  {g.items.map((item) => (
                    <span key={item} className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-xs text-foreground">{item}</span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
