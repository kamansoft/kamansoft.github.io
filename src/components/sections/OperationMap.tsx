import { ArrowDown, ArrowRight, Bot, ListChecks, PackageCheck, PencilRuler, ScanSearch, Undo2, UserCheck, Wrench } from "lucide-react";
import type { LoopItem } from "@/services/HeroDataService";

const icons = { Bot, ListChecks, PackageCheck, PencilRuler, ScanSearch, UserCheck, Wrench };
const StepIcon = ({ name, className }: { name: string; className: string }) => {
  const Icon = icons[name as keyof typeof icons];
  return Icon ? <Icon className={className} aria-hidden="true" /> : null;
};

/** Business understanding leads delivery; human evaluation feeds the next iteration. */
const OperationMap = ({ steps, iterationLabel }: { steps: LoopItem[]; iterationLabel: string }) => (
  <div className="relative pl-6 sm:pl-8 py-2">
    <div aria-hidden="true" className="absolute left-0 top-10 bottom-8 w-4 border-l-2 border-y-2 border-dashed border-signal/40 rounded-l-lg">
      <ArrowRight className="absolute -right-2 -top-2.5 h-5 w-5 text-signal" />
    </div>
    <ol className="space-y-0">
      {steps.map((step, index) => (
        <li key={step.id}>
          {index > 0 && <div className="ml-7 h-9 flex items-center"><ArrowDown aria-hidden="true" className="h-6 w-6 text-signal" /></div>}
          <div className="flex gap-4 items-start">
            <div className={`flex shrink-0 items-center justify-center w-14 h-14 rounded-lg ${index === 0 ? "bg-signal text-ink" : "bg-ink-foreground/5 text-signal border border-ink-border"}`}>
              <StepIcon name={step.icon} className="w-7 h-7" />
            </div>
            <div className="min-w-0 flex-1 pt-1">
              <h2 className={`text-xl sm:text-2xl font-semibold ${index === 0 ? "text-signal" : "text-ink-foreground"}`}>{step.text}</h2>
              <p className="mt-1 text-sm text-ink-muted leading-relaxed">{step.detail}</p>
              {step.actions && <div className="grid grid-cols-4 gap-2 mt-4 border-y border-ink-border py-4">
                {step.actions.map((action, actionIndex) => (
                  <div key={action.label} className="relative flex flex-col items-center gap-2 text-ink-foreground">
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
    <div className="mt-6 flex items-center gap-3 text-signal font-mono text-xs leading-relaxed">
      <Undo2 aria-hidden="true" className="h-5 w-5 shrink-0" />
      <span>{iterationLabel}</span>
    </div>
  </div>
);

export default OperationMap;
