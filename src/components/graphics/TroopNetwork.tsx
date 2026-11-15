/** One engineer node directing a mixed team: circles are humans, squares are AI agents. */
const nodes = [
  { x: 30, y: 20, agent: false }, { x: 30, y: 60, agent: true }, { x: 75, y: 8, agent: true },
  { x: 165, y: 8, agent: false }, { x: 210, y: 20, agent: true }, { x: 210, y: 60, agent: false },
];

const TroopNetwork = ({ active }: { active: boolean }) => (
  <svg viewBox="0 0 240 70" className="explainer h-16 w-56 shrink-0" aria-hidden="true">
    {active && nodes.map((n, i) => (
      <g key={i}>
        <line x1="120" y1="40" x2={n.x} y2={n.y} pathLength={1} strokeDasharray="1" className="stroke-primary/50 animate-draw" strokeWidth="1.5" style={{ animationDelay: `${i * 100}ms` }} />
        <g className="animate-node-glow" style={{ animationDelay: `${i * 500}ms` }}>
          {n.agent
            ? <rect x={n.x - 6} y={n.y - 6} width="12" height="12" rx="2" className="fill-primary" />
            : <circle cx={n.x} cy={n.y} r="6" className="fill-primary" />}
        </g>
      </g>
    ))}
    <circle cx="120" cy="40" r="13" className="fill-primary" />
    <circle cx="120" cy="40" r="19" fill="none" className="stroke-primary/40 animate-pulse" strokeWidth="1.5" />
  </svg>
);

export default TroopNetwork;
