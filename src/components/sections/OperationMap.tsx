import { User, Bot, TrendingUp } from "lucide-react";

/** Animated diagram: messy process → engineers + agents → clean flow and rising results. */
const OperationMap = ({ steps }: { steps: { id: number; role: string; text: string }[] }) => (
  <div className="rounded-xl border border-ink-border bg-ink-foreground/[0.03] backdrop-blur-sm p-6 shadow-2xl">
    <svg viewBox="0 0 400 150" className="w-full" aria-hidden="true">
      {/* messy input */}
      {[[20, 20, -8], [45, 60, 12], [15, 100, 5], [55, 110, -14]].map(([x, y, r], i) => (
        <rect key={i} x={x} y={y} width="28" height="20" rx="3" transform={`rotate(${r} ${x + 14} ${y + 10})`}
          className="fill-none stroke-ink-muted animate-pulse" strokeWidth="1.5" style={{ animationDelay: `${i * 200}ms` }} />
      ))}
      <path d="M90 75 L150 75" className="stroke-signal" strokeWidth="2" strokeDasharray="4 4" />
      {/* engine */}
      <circle cx="190" cy="75" r="38" className="fill-signal/10 stroke-signal" strokeWidth="2" />
      <circle cx="190" cy="75" r="50" className="fill-none stroke-signal/30 animate-spin origin-[190px_75px] [animation-duration:12s]" strokeWidth="1" strokeDasharray="6 8" />
      <text x="190" y="80" textAnchor="middle" className="fill-signal font-mono text-[13px] font-bold">KS</text>
      <path d="M240 75 L280 75" className="stroke-signal" strokeWidth="2" strokeDasharray="4 4" />
      {/* clean output: rising bars */}
      {[30, 50, 75, 100].map((h, i) => (
        <rect key={i} x={290 + i * 26} y={130 - h} width="18" height={h} rx="2" className="fill-signal origin-bottom animate-grow" style={{ animationDelay: `${600 + i * 150}ms` }} />
      ))}
    </svg>
    <div className="mt-2 grid grid-cols-3 text-center font-mono text-[10px] uppercase tracking-widest text-ink-muted">
      <span>Your process</span><span className="text-signal">Engineers + AI</span>
      <span className="flex items-center justify-center gap-1"><TrendingUp className="h-3 w-3 text-signal" />Results</span>
    </div>
    <ol className="mt-6 grid grid-cols-4 gap-2">
      {steps.map((s, i) => {
        const eng = s.role === "engineer";
        return (
          <li key={s.id} className="flex flex-col items-center gap-2 text-center animate-fade-in" style={{ animationDelay: `${i * 150}ms`, animationFillMode: "both" }}>
            <span className={`flex h-9 w-9 items-center justify-center rounded-full ${eng ? "bg-signal text-ink" : "bg-ink-foreground/10 text-ink-foreground"}`}>
              {eng ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
            </span>
            <span className="text-xs leading-tight text-ink-foreground">{s.text}</span>
          </li>
        );
      })}
    </ol>
  </div>
);

export default OperationMap;
