import { Button } from "@/components/ui/button";
import { Code, Smartphone, Globe, Zap, ArrowRight, Play, User, Bot } from "lucide-react";
import { HeroDataService, HeroButtons, HeroHeader, LoopItem, TechStackItem } from "../../services/HeroDataService";
import { useMemo, useEffect, useState } from "react";

const iconMap = { Code, Smartphone, Globe, Zap, ArrowRight, Play };

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

  useEffect(() => {
    Promise.all([dataService.getHeaderData(), dataService.getButtons(), dataService.getTechStack(), dataService.getLoop()])
      .then(([h, b, t, l]) => { setHeader(h); setButtons(b); setTechStack(t); setLoop(l); })
      .catch((e) => console.error("Failed to load hero data:", e));
  }, [dataService]);

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-ink bg-grid-ink pt-28 pb-20">
      <div className="absolute -top-40 right-0 h-[32rem] w-[32rem] rounded-full bg-signal/10 blur-3xl" />
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

        {/* The loop console */}
        <div className="rounded-lg border border-ink-border bg-ink-foreground/[0.03] backdrop-blur-sm shadow-2xl overflow-hidden">
          <div className="flex items-center gap-2 border-b border-ink-border px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-ink-foreground/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-ink-foreground/20" />
            <span className="h-2.5 w-2.5 rounded-full bg-signal" />
            <span className="ml-3 font-mono text-xs text-ink-muted">kamansoft://the-loop</span>
          </div>
          <ol className="p-5 space-y-3 font-mono text-sm">
            {loop.map((item, i) => {
              const isEngineer = item.role === "engineer";
              return (
                <li key={item.id} className="flex items-start gap-3 animate-fade-in" style={{ animationDelay: `${i * 150}ms`, animationFillMode: "both" }}>
                  <span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded ${isEngineer ? "bg-signal text-ink" : "bg-ink-foreground/10 text-ink-foreground"}`}>
                    {isEngineer ? <User className="h-3.5 w-3.5" /> : <Bot className="h-3.5 w-3.5" />}
                  </span>
                  <div>
                    <span className={`text-[10px] uppercase tracking-widest ${isEngineer ? "text-signal" : "text-ink-muted"}`}>{isEngineer ? "engineer" : "agent"}</span>
                    <p className="text-ink-foreground leading-snug">{item.text}</p>
                  </div>
                </li>
              );
            })}
            <li className="flex items-center gap-2 pt-2 text-ink-muted">
              <span className="text-signal">$</span> loop --until results <span className="inline-block h-4 w-2 bg-signal animate-pulse" />
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
};

export default Hero;
