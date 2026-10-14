import { splashArrows } from "@/data/splashPaths";

type ArrowProps = {
  id: string;
  size: { width: number; height: number; fill: string };
  scaleX: number;
  scaleY: number;
};

function Arrow({ id, size, scaleX, scaleY }: ArrowProps) {
  const { center, head } = splashArrows;
  const maskId = `splash-mask-${id}`;
  return (
    <svg
      className="route-layer__image"
      viewBox={`0 0 ${size.width} ${size.height}`}
      preserveAspectRatio="none"
      overflow="visible"
      fill="none"
    >
      <defs>
        <mask id={maskId} maskUnits="userSpaceOnUse" x="-80" y="-80" width={size.width + 160} height={size.height + 160}>
          <g transform={`scale(${scaleX} ${scaleY})`}>
            <path
              className="splash-draw"
              d={center}
              pathLength={1}
              stroke="#fff"
              strokeWidth="44"
              strokeLinecap="butt"
              strokeLinejoin="round"
            />
            <rect className="splash-head" x={head.x} y={head.y} width={head.width} height={head.height} fill="#fff" />
          </g>
        </mask>
      </defs>
      <path d={size.fill} fill="#FFD75A" mask={`url(#${maskId})`} />
    </svg>
  );
}

/** The two yellow arrows. Each one draws itself along its own path. */
export function SplashArt() {
  const { a, b } = splashArrows;
  return (
    <>
      <div className="route-layer route-layer--splash-a splash-arrow splash-arrow--a">
        <div className="route-layer__shape">
          <Arrow id="a" size={a} scaleX={1} scaleY={1} />
        </div>
      </div>
      <div className="route-layer route-layer--splash-b splash-arrow splash-arrow--b">
        <div className="route-layer__shape">
          <Arrow id="b" size={b} scaleX={b.width / a.width} scaleY={b.height / a.height} />
        </div>
      </div>
    </>
  );
}
