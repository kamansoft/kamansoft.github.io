import { ArrowDown, ArrowRight, Bot, Check, ListChecks, PackageCheck, PencilRuler, ScanSearch, Undo2, UserCheck, Wrench } from "lucide-react";
import type { LoopItem } from "@/services/HeroDataService";
import { useInView } from "@/hooks/use-in-view";

const icons = { Bot, ListChecks, PackageCheck, PencilRuler, ScanSearch, UserCheck, Wrench };
const StepIcon = ({ name, className }: { name: string; className: string }) => {
  const Icon = icons[name as keyof typeof icons];
  return Icon ? <Icon className={className} aria-hidden="true" /> : null;
};

/** Small tangle of lines = the current process being understood. */
const Tangle = () => (
  <svg viewBox="0 0 60 30" className="hidden sm:block h-8 w-16 shrink-0 ml-auto" aria-hidden="true">
    <path d="M2 15 C 10 0, 18 30, 26 12 S 40 28, 46 8 S 56 20, 58 15" pathLength={1} strokeDasharray="1" className="stroke-ink-muted animate-draw" strokeWidth="1.5" fill="none" />
    <path d="M2 22 C 14 30, 22 2, 34 20 S 50 4, 58 22" pathLength={1} strokeDasharray="1" className="stroke-signal/60 animate-draw" strokeWidth="1.5" fill="none" style={{ animationDelay: "200ms" }} />
  </svg>
);

const STEP = 900; // ms between steps

/** Guided sequence: business first → engineers lead with AI → humans review → loop back. */
const OperationMap = ({ steps, iterationLabel }: { steps: LoopItem[]; iterationLabel: string }) => {
  const { ref, inView } = useInView(0.2);
  const delay = (ms: number) => ({ transitionDelay: inView ? `${ms}ms` : "0ms" });
  const loopAt = steps.length * STEP;
  return (
    <div ref={ref} className="explainer relative pl-6 sm:pl-8 py-2">
      <div aria-hidden="true" className={`absolute left-0 top-10 bottom-8 w-4 border-l-2 border-y-2 border-dashed rounded-l-lg transition-colors duration-700 ${inView ? "border-signal/60" : "border-ink-border"}`} style={delay(loopAt)}>
        <ArrowRight className={`absolute -right-2 -top-2.5 h-5 w-5 text-signal transition-opacity duration-500 ${inView ? "opacity-100" : "opacity-0"}`} style={delay(loopAt + 300)} />
        {inView && <span className="absolute -left-[5px] h-2 w-2 rounded-full bg-signal shadow-glow animate-[loop-dot_4s_linear_infinite]" style={{ animationDelay: `${loopAt + 600}ms` }} />}
      </div>
      <ol className="space-y-0">
        {steps.map((step, index) => (
          <li key={step.id}>
            {index > 0 && <div className="ml-7 h-9 flex items-center">
              <ArrowDown aria-hidden="true" className={`h-6 w-6 text-signal transition-all duration-500 ${inView ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`} style={delay(index * STEP - 300)} />
            </div>}
            <div className={`flex gap-4 items-start transition-all duration-700 ${inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`} style={delay(index * STEP)}>
              <div className={`relative flex shrink-0 items-center justify-center w-14 h-14 rounded-lg ${index === 0 ? "bg-signal text-ink" : "bg-ink-foreground/5 text-signal border border-ink-border"}`}>
                <StepIcon name={step.icon} className="w-7 h-7" />
                {index === steps.length - 1 && inView && (
                  <span className="absolute -right-2 -bottom-2 flex h-6 w-6 items-center justify-center rounded-full bg-signal text-ink animate-pop" style={{ animationDelay: `${index * STEP + 500}ms` }}>
                    <Check className="h-4 w-4" strokeWidth={3} aria-hidden="true" />
                  </span>
                )}
              </div>
              <div className="min-w-0 flex-1 pt-1">
                <div className="flex items-center gap-3">
                  <h2 className={`text-xl sm:text-2xl font-semibold ${index === 0 ? "text-signal" : "text-ink-foreground"}`}>{step.text}</h2>
                  {index === 0 && inView && <Tangle />}
                </div>
                <p className="mt-1 text-sm text-ink-muted leading-relaxed">{step.detail}</p>
                {step.actions && <div className="grid grid-cols-4 gap-2 mt-4 border-y border-ink-border py-4">
                  {step.actions.map((action, actionIndex) => (
                    <div key={action.label} className={`relative flex flex-col items-center gap-2 transition-all duration-500 ${inView ? "opacity-100 text-ink-foreground" : "opacity-30 text-ink-muted"}`} style={delay(index * STEP + 250 + actionIndex * 160)}>
                      <StepIcon name={action.icon} className="h-5 w-5 text-signal" />
                      <span className="text-xs font-medium">{action.label}</span>
                      {actionIndex < (step.actions?.length ?? 0) - 1 && <ArrowRight aria-hidden="true" className="absolute top-1 -right-2 h-3 w-3 text-ink-muted" />}
                    </div>
                  ))}
                </div>}
              </div>
            </div>
          </li>
        ))}
      </ol>
      <div className={`mt-6 flex items-center gap-3 text-signal font-mono text-xs leading-relaxed transition-opacity duration-700 ${inView ? "opacity-100" : "opacity-0"}`} style={delay(loopAt + 300)}>
        <Undo2 aria-hidden="true" className="h-5 w-5 shrink-0" />
        <span>{iterationLabel}</span>
      </div>
    </div>
  );
};

export default OperationMap;
