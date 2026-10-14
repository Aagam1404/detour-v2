import type { ReactNode } from "react";
import type { JourneyPath } from "@/data/journeys";

export type StepMapType = Exclude<JourneyPath, "none">;

type StepMapProps = {
  type: StepMapType;
  goal?: string;
  meters?: number;
};

const LAND = "#f3eddd";
const ROAD = "#fffdf8";
const CASING = "#ddd4be";
const BLOCK = "#e8dfc8";
const WATER = "#c9ddf6";
const PARK = "#d6ecd6";
const INK = "#171717";
const YELLOW = "#ffd75a";

type Side = "left" | "right" | "top";

type Scene = {
  /** Street bands, drawn white with a soft edge. */
  roads: string[];
  /** The line you walk. */
  route: string;
  start: [number, number];
  /** Arrow head: x, y, rotation in degrees (0 points up). */
  end: [number, number, number];
  /** Where the landmark label sits and which side of that point it hangs. */
  label: [number, number, Side];
  direction: "straight" | "right" | "left" | "bear" | "arrive";
  mirror?: boolean;
  scene: ReactNode;
};

function Block({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  return <rect x={x} y={y} width={w} height={h} rx="9" fill={BLOCK} />;
}

function Waves({ d }: { d: string }) {
  return (
    <>
      <path d={d} fill={WATER} />
      <path d={d} fill="url(#sm-waves)" />
      <path d={d} fill="none" stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
    </>
  );
}

function Tree({ x, y, r = 11 }: { x: number; y: number; r?: number }) {
  return <circle cx={x} cy={y} r={r} fill="#aedab4" stroke={INK} strokeWidth="2" />;
}

const scenes: Record<StepMapType, Scene> = {
  straight: {
    roads: ["M160 280 V-10", "M-10 120 H330"],
    route: "M160 232 V84",
    start: [160, 232],
    end: [160, 62, 0],
    label: [160, 62, "right"],
    direction: "straight",
    scene: (
      <>
        <Block x={14} y={8} w={118} h={88} />
        <Block x={188} y={8} w={118} h={88} />
        <Block x={14} y={144} w={118} h={106} />
        <Block x={188} y={144} w={118} h={106} />
      </>
    ),
  },
  "turn-right": {
    roads: ["M160 280 V150 H330"],
    route: "M160 232 V172 Q160 150 182 150 H236",
    start: [160, 232],
    end: [262, 150, 90],
    label: [262, 150, "top"],
    direction: "right",
    scene: (
      <>
        <Block x={14} y={10} w={126} h={118} />
        <Block x={180} y={10} w={130} h={92} />
        <Block x={14} y={152} w={124} h={98} />
        <Block x={182} y={196} w={128} h={54} />
      </>
    ),
  },
  "turn-left": {
    roads: ["M160 280 V150 H330"],
    route: "M160 232 V172 Q160 150 182 150 H236",
    start: [160, 232],
    end: [262, 150, 90],
    label: [262, 150, "top"],
    direction: "left",
    mirror: true,
    scene: (
      <>
        <Block x={14} y={10} w={126} h={118} />
        <Block x={180} y={10} w={130} h={92} />
        <Block x={14} y={152} w={124} h={98} />
        <Block x={182} y={196} w={128} h={54} />
      </>
    ),
  },
  "straight-to-water": {
    roads: ["M160 280 V50"],
    route: "M160 232 V100",
    start: [160, 232],
    end: [160, 80, 0],
    label: [160, 80, "right"],
    direction: "straight",
    scene: (
      <>
        <Block x={14} y={96} w={116} h={154} />
        <Block x={190} y={96} w={116} h={154} />
        <Waves d="M-5 -5 H325 V54 C290 66 250 46 212 58 C180 68 150 52 118 60 C78 70 40 50 -5 60 Z" />
      </>
    ),
  },
  "follow-curve": {
    roads: ["M102 280 V236 C102 192 216 198 216 126 V-10"],
    route: "M102 236 C102 194 216 200 216 128 V96",
    start: [102, 236],
    end: [216, 74, 0],
    label: [216, 74, "left"],
    direction: "bear",
    scene: (
      <>
        <Block x={14} y={10} w={170} h={104} />
        <Block x={250} y={10} w={58} h={88} />
        <Block x={250} y={130} w={58} h={84} />
        <Block x={14} y={134} w={52} h={116} />
        <Block x={152} y={226} w={154} h={24} />
      </>
    ),
  },
  "cross-open-space": {
    roads: [],
    route: "M64 226 C108 192 150 164 200 122 C228 98 244 86 254 72",
    start: [64, 226],
    end: [262, 60, 38],
    label: [262, 60, "left"],
    direction: "bear",
    scene: (
      <>
        <path
          d="M14 214 Q4 128 66 88 Q148 30 258 42 Q312 60 304 142 Q294 228 196 244 Q76 258 14 214 Z"
          fill={PARK}
          stroke={INK}
          strokeWidth="2.5"
        />
        <Tree x={52} y={124} />
        <Tree x={84} y={106} r={9} />
        <Tree x={160} y={216} />
        <Tree x={274} y={158} r={12} />
        <Tree x={238} y={206} r={9} />
        <Block x={14} y={8} w={56} h={46} />
        <Block x={262} y={196} w={44} h={50} />
      </>
    ),
  },
  "approach-steps": {
    roads: ["M96 280 V244 C96 178 112 146 150 108 L172 86"],
    route: "M96 236 C96 176 112 146 146 112",
    start: [96, 236],
    end: [166, 92, 40],
    label: [166, 92, "left"],
    direction: "arrive",
    scene: (
      <>
        <Block x={14} y={40} w={56} h={122} />
        <Block x={14} y={184} w={56} h={66} />
        <Block x={128} y={196} w={92} h={54} />
        <Waves d="M205 -5 H325 V170 C298 148 268 168 248 134 C230 104 212 84 205 46 Z" />
        <g fill="none" stroke={INK} strokeWidth="3.5" strokeLinecap="round">
          <path d="M192 100 H232" />
          <path d="M200 86 H240" />
          <path d="M208 72 H248" />
        </g>
      </>
    ),
  },
  "approach-arch": {
    roads: ["M160 280 V104", "M-10 134 H330"],
    route: "M160 232 V132",
    start: [160, 232],
    end: [160, 116, 0],
    label: [160, 116, "right"],
    direction: "arrive",
    scene: (
      <>
        <rect x="24" y="8" width="272" height="92" rx="9" fill="#ecd9ae" stroke="#cdb67f" strokeWidth="2" />
        <g stroke="#cdb67f" strokeWidth="2" fill="none">
          <path d="M24 40 H128 M192 40 H296 M24 72 H128 M192 72 H296" />
          <path d="M60 8 V40 M100 40 V72 M232 8 V40 M268 40 V72" />
        </g>
        <path d="M126 100 V58 a34 34 0 0 1 68 0 V100 Z" fill={INK} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
        <Block x={14} y={168} w={106} h={82} />
        <Block x={200} y={168} w={106} h={82} />
      </>
    ),
  },
  "approach-door": {
    roads: ["M160 280 V104"],
    route: "M160 232 V132",
    start: [160, 232],
    end: [160, 116, 0],
    label: [160, 116, "right"],
    direction: "arrive",
    scene: (
      <>
        <rect x="10" y="12" width="300" height="90" rx="9" fill={BLOCK} />
        <g stroke="#cfc4a8" strokeWidth="2">
          <path d="M70 12 V102 M110 12 V102 M210 12 V102 M250 12 V102" />
        </g>
        <g fill="#fffdf8" stroke={INK} strokeWidth="2.5" strokeLinejoin="round">
          <rect x="22" y="50" width="34" height="52" rx="3" />
          <rect x="80" y="46" width="22" height="56" rx="3" />
          <rect x="120" y="48" width="22" height="54" rx="3" />
          <rect x="218" y="48" width="22" height="54" rx="3" />
          <rect x="262" y="48" width="34" height="54" rx="3" />
        </g>
        <rect x="148" y="70" width="24" height="32" rx="3" fill="#60d6bf" stroke={INK} strokeWidth="3" />
        <circle cx="166" cy="87" r="2" fill={INK} />
        <Block x={14} y={160} w={110} h={90} />
        <Block x={196} y={160} w={110} h={90} />
      </>
    ),
  },
  "approach-object": {
    roads: ["M160 280 V120"],
    route: "M160 232 V146",
    start: [160, 232],
    end: [160, 130, 0],
    label: [160, 130, "right"],
    direction: "arrive",
    scene: (
      <>
        <Block x={14} y={10} w={110} h={150} />
        <Block x={196} y={10} w={110} h={150} />
        <Block x={14} y={184} w={104} h={66} />
        <Block x={202} y={184} w={104} h={66} />
        <circle cx="160" cy="76" r="24" fill="none" stroke={INK} strokeWidth="2.5" strokeDasharray="5 6" />
        <circle cx="160" cy="76" r="9" fill={YELLOW} stroke={INK} strokeWidth="3" />
      </>
    ),
  },
};

const directionText: Record<Scene["direction"], string> = {
  straight: "Go straight",
  right: "Turn right",
  left: "Turn left",
  bear: "Bear right",
  arrive: "Almost there",
};

function DirectionGlyph({ kind }: { kind: Scene["direction"] }) {
  const common = { fill: "none", stroke: INK, strokeWidth: 3, strokeLinecap: "round", strokeLinejoin: "round" } as const;
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
      {kind === "straight" ? <path {...common} d="M10 17 V3 M4 9 L10 3 L16 9" /> : null}
      {kind === "right" ? <path {...common} d="M5 17 V10 Q5 6 9 6 H16 M11 1 L16 6 L11 11" /> : null}
      {kind === "left" ? <path {...common} d="M15 17 V10 Q15 6 11 6 H4 M9 1 L4 6 L9 11" /> : null}
      {kind === "bear" ? <path {...common} d="M4 16 L15 5 M7 4 H15 V12" /> : null}
      {kind === "arrive" ? (
        <>
          <circle {...common} cx="10" cy="10" r="3" />
          <path {...common} d="M2 10 Q10 1 18 10 Q10 19 2 10" />
        </>
      ) : null}
    </svg>
  );
}

export function stepMapLabel(type: StepMapType, goal?: string, meters?: number) {
  const scene = scenes[type];
  const away = meters ? ` for about ${meters} metres` : "";
  const target = goal ? ` towards ${goal.toLowerCase()}` : "";
  return `Map. ${directionText[scene.direction]}${away}${target}.`;
}

export function StepMap({ type, goal, meters }: StepMapProps) {
  const scene = scenes[type];
  const [ex, ey, angle] = scene.end;
  const [lx, ly, side] = scene.label;
  const flip = scene.mirror === true;
  const labelX = flip ? 320 - lx : lx;
  const labelSide: Side = flip && side !== "top" ? (side === "left" ? "right" : "left") : side;
  const startX = flip ? 320 - scene.start[0] : scene.start[0];
  const startY = scene.start[1];

  return (
    <div className="stepmap" role="img" aria-label={stepMapLabel(type, goal, meters)}>
      <svg className="stepmap__svg" viewBox="0 0 320 260" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
        <defs>
          <pattern id="sm-waves" width="14" height="10" patternUnits="userSpaceOnUse">
            <path d="M0 5 q3.5 -3 7 0 t7 0" fill="none" stroke="#a8c5ee" strokeWidth="1.2" />
          </pattern>
        </defs>
        <rect width="320" height="260" fill={LAND} />
        <g transform={flip ? "translate(320 0) scale(-1 1)" : undefined}>
          <g fill="none" strokeLinecap="round" strokeLinejoin="round">
            {scene.roads.map((d) => (
              <path key={`c${d}`} d={d} stroke={CASING} strokeWidth="50" />
            ))}
            {scene.roads.map((d) => (
              <path key={d} d={d} stroke={ROAD} strokeWidth="44" />
            ))}
          </g>
          {scene.scene}
          <g fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d={scene.route} stroke={ROAD} strokeWidth="17" />
            <path className="stepmap__line" d={scene.route} pathLength={1} stroke={INK} strokeWidth="9" />
            <path className="stepmap__march" d={scene.route} stroke={YELLOW} strokeWidth="3.5" strokeDasharray="3 9" />
          </g>
          <g className="stepmap__arrow" transform={`translate(${ex} ${ey}) rotate(${angle})`}>
            <path d="M0 -24 L22 12 L0 3 L-22 12 Z" fill={YELLOW} stroke={INK} strokeWidth="3.5" strokeLinejoin="round" />
          </g>
        </g>
        <g className="stepmap__you" transform={`translate(${startX} ${startY})`}>
          <circle className="stepmap__pulse" r="14" fill="none" stroke={INK} strokeWidth="2.5" />
          <circle r="11" fill={ROAD} stroke={INK} strokeWidth="4" />
          <circle r="4" fill={INK} />
        </g>
      </svg>

      <div className="stepmap__chips">
        <span className="stepmap__chip stepmap__chip--dir">
          <DirectionGlyph kind={scene.direction} />
          {directionText[scene.direction]}
        </span>
        {meters ? <span className="stepmap__chip">~{meters} m</span> : null}
      </div>

      <span className="stepmap__you-tag" style={{ left: `${(startX / 320) * 100}%`, top: `${(startY / 260) * 100}%` }}>
        You
      </span>

      {goal ? (
        <span
          className={`stepmap__goal stepmap__goal--${labelSide}`}
          style={{ left: `${(labelX / 320) * 100}%`, top: `${(ly / 260) * 100}%` }}
        >
          {goal}
        </span>
      ) : null}
    </div>
  );
}
