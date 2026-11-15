import type { CSSProperties } from "react";

const d = (ms: number): CSSProperties => ({ animationDelay: `${ms}ms` });
const box: CSSProperties = { transformBox: "fill-box", transformOrigin: "center" };

/** Messy process lines straighten into one clean flow. */
const TangleToFlow = () => (
  <>
    <path d="M10 40 C 30 5, 45 75, 60 30 S 85 70, 95 20 S 110 60, 120 40" pathLength={1} strokeDasharray="1" className="stroke-muted-foreground/40 animate-draw" strokeWidth="2" fill="none" />
    <path d="M10 50 C 25 70, 50 10, 70 55 S 100 15, 120 45" pathLength={1} strokeDasharray="1" className="stroke-destructive/40 animate-draw" strokeWidth="2" fill="none" style={d(150)} />
    <path d="M125 40 L 140 40" className="stroke-muted-foreground" strokeWidth="2" />
    <path d="M136 35 L 141 40 L 136 45" className="stroke-muted-foreground" strokeWidth="2" fill="none" />
    <path d="M148 40 L 230 40" pathLength={1} strokeDasharray="1" className="stroke-primary animate-draw" strokeWidth="4" strokeLinecap="round" style={d(900)} />
    {[160, 190, 220].map((x, i) => <circle key={x} cx={x} cy="40" r="6" className="fill-primary animate-pop" style={{ ...box, ...d(1300 + i * 150) }} />)}
  </>
);

/** Scattered blocks snap together into a screen. */
const BlocksToScreen = () => {
  const blocks = [
    { x: 80, y: 18, w: 80, h: 10, from: "translate(-60px,30px) rotate(-25deg)" },
    { x: 80, y: 32, w: 38, h: 30, from: "translate(-40px,-20px) rotate(20deg)" },
    { x: 122, y: 32, w: 38, h: 14, from: "translate(60px,-15px) rotate(30deg)" },
    { x: 122, y: 50, w: 38, h: 12, from: "translate(50px,20px) rotate(-15deg)" },
  ];
  return (
    <>
      <rect x="72" y="10" width="96" height="60" rx="6" fill="none" pathLength={1} strokeDasharray="1" className="stroke-foreground/60 animate-draw" strokeWidth="2" style={d(600)} />
      {blocks.map((b, i) => (
        <rect key={i} x={b.x} y={b.y} width={b.w} height={b.h} rx="2" className="fill-primary/80 animate-[snap_0.8s_ease-out_both]"
          style={{ ...box, ...d(i * 120), ["--from" as string]: b.from }} />
      ))}
      <path d="M110 70 L 130 70 M 104 76 L 136 76" className="stroke-foreground/60" strokeWidth="2" />
    </>
  );
};

/** A structure grows taller while the shield stays locked around it. */
const ScaleShield = () => (
  <>
    {[0, 1, 2, 3].map((i) => (
      <rect key={i} x={95 + i * 14} y={70 - (i + 1) * 13} width="10" height={(i + 1) * 13} rx="2" className="fill-primary/80 animate-grow"
        style={{ transformBox: "fill-box", transformOrigin: "bottom", ...d(300 + i * 180) }} />
    ))}
    <path d="M120 4 L 165 16 L 165 42 C 165 62, 145 74, 120 78 C 95 74, 75 62, 75 42 L 75 16 Z" fill="none" pathLength={1} strokeDasharray="1"
      className="stroke-primary animate-draw" strokeWidth="2.5" strokeLinejoin="round" style={d(0)} />
  </>
);

const scenes: Record<string, () => JSX.Element> = { "tangle-to-flow": TangleToFlow, "blocks-to-screen": BlocksToScreen, "scale-shield": ScaleShield };

/** Picks a scene by name from data; renders nothing until `active` so it plays when seen. */
const ServiceScene = ({ name, active, replay }: { name?: string; active: boolean; replay: number }) => {
  const Scene = name ? scenes[name] : undefined;
  if (!Scene) return null;
  return (
    <svg viewBox="0 0 240 80" className="explainer w-full h-20 mb-6" aria-hidden="true">
      {active && <g key={replay}><Scene /></g>}
    </svg>
  );
};

export default ServiceScene;
