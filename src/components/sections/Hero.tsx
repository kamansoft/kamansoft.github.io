import { Button } from "@/components/ui/button";
import { Code, Smartphone, Globe, Zap, ArrowRight, Play, Database, Factory, Cloud } from "lucide-react";
import { HeroDataService, HeroButtons, HeroHeader, LoopItem, TechStackItem } from "../../services/HeroDataService";
import OperationMap from "./OperationMap";
import { useMemo, useEffect, useState } from "react";

const iconMap = { Code, Smartphone, Globe, Zap, ArrowRight, Play, Database, Factory, Cloud };

const getIcon = (iconName: string, className = "h-4 w-4") => {
  const Icon = iconMap[iconName as keyof typeof iconMap];
  return Icon ? <Icon className={className} /> : null;
};

const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

const Hero = () => {
  const dataService = useMemo(() => new HeroDataService(), []);
  const [header, setHeader] = useState<HeroHeader>({ eyebrow: "", title: "", highlightText: "", description: "" });
  const [buttons, setButtons] = useState<HeroButtons>({ primary: { text: "", icon: "" }, secondary: { text: "", icon: "" } });
  const [techStack, setTechStack] = useState<TechStackItem[]>([]);
  const [loop, setLoop] = useState<LoopItem[]>([]);
  const [iterationLabel, setIterationLabel] = useState("");

  useEffect(() => {
    Promise.all([dataService.getHeaderData(), dataService.getButtons(), dataService.getTechStack(), dataService.getLoop(), dataService.getIterationLabel()])
      .then(([h, b, t, l, label]) => { setIterationLabel(label); setHeader(h); setButtons(b); setTechStack(t); setLoop(l); })
      .catch((e) => console.error("Failed to load hero data:", e));
  }, [dataService]);

  return (
    <section id="home" className="relative flex flex-col justify-center overflow-hidden bg-ink bg-grid-ink pt-32 pb-16 lg:pt-40 lg:pb-24">
      <div className="container mx-auto px-4 relative z-10 grid lg:grid-cols-[1.15fr_1fr] gap-12 lg:gap-16 items-center">
        <div className="space-y-8 animate-fade-in">
          <span className="inline-flex items-center gap-2 rounded-full border border-ink-border bg-ink-foreground/5 px-3 py-1 font-mono text-xs uppercase tracking-[0.2em] text-signal">
            <span className="h-1.5 w-1.5 rounded-full bg-signal animate-pulse" />
            {header.eyebrow}
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] text-ink-foreground pb-1">
            {header.title}
            <span className="block text-signal mt-2 text-3xl sm:text-4xl lg:text-5xl leading-tight pb-1">{header.highlightText}</span>
          </h1>
          <p className="text-lg lg:text-xl text-ink-muted max-w-2xl">{header.description}</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" onClick={() => scrollTo("contact")} className="rounded-md bg-signal text-ink hover:bg-signal/90 shadow-glow text-base font-semibold px-7">
              {buttons.primary.text}
              {getIcon(buttons.primary.icon)}
            </Button>
            <Button size="lg" variant="outline" onClick={() => scrollTo("process")} className="rounded-md border-ink-border bg-transparent text-ink-foreground hover:bg-ink-foreground/10 hover:text-ink-foreground text-base px-7">
              {getIcon(buttons.secondary.icon)}
              {buttons.secondary.text}
            </Button>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-3 pt-4">
            {techStack.map((t) => (
              <div key={t.id} className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-ink-muted">
                <span className="text-signal">{getIcon(t.icon)}</span>
                {t.label}
              </div>
            ))}
          </div>
        </div>

        <OperationMap steps={loop} iterationLabel={iterationLabel} />
      </div>
    </section>
  );
};

export default Hero;
