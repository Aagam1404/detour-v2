import { DetourMarker } from "@/components/map/DetourMarker";

type MapRouteProps = {
  variant: "available" | "walking" | "completed";
};

export function MapRoute({ variant }: MapRouteProps) {
  return (
    <div className={`map-card map-card--${variant}`} aria-hidden="true">
      <svg className="map-card__svg" viewBox="0 0 320 280" preserveAspectRatio="xMidYMid slice" role="img">
        <title>
          {variant === "completed" ? "Commute with Benny's detour completed" : "Usual commute with a nearby detour"}
        </title>
        <StreetGrid />
        {variant === "completed" ? <CompletedRoute /> : <OpenRoute walking={variant === "walking"} />}
      </svg>
      {variant === "available" ? <DetourMarker state="selected" label="+4" /> : null}
      {variant !== "completed" ? (
        <>
          <span className="map-label map-label--union">UNION</span>
          <span className="map-label map-label--street">STREET</span>
        </>
      ) : (
        <>
          <span className="map-label map-label--union">UNION</span>
          <span className="map-label map-label--street">STREET</span>
          <span className="map-chip">6 min · 420 m</span>
        </>
      )}
    </div>
  );
}

function StreetGrid() {
  return (
    <g className="map-streets" fill="none" stroke="#d9d3c7" strokeWidth="6" strokeLinecap="round">
      <path d="M-10 70h150M40 20v120M180 10h160M210 40v90" />
      <path d="M20 180h120M70 150v140M200 160h140M250 130v160" />
      <path d="M10 240h180M90 210v60M220 230h90M270 200v70" />
      <rect x="230" y="48" width="54" height="36" rx="4" fill="#efeae0" stroke="none" />
      <rect x="36" y="250" width="40" height="28" rx="3" fill="#efeae0" stroke="none" />
    </g>
  );
}

function OpenRoute({ walking }: { walking: boolean }) {
  return (
    <>
      <path className="map-route map-route--commute" d="M70 230 L140 190 L168 160" />
      <path className="map-route map-route--detour" d="M168 160 L210 120 L250 90 L290 50" />
      {walking ? <circle className="map-you" cx="78" cy="222" r="7" /> : null}
      {walking ? <circle className="map-goal" cx="168" cy="160" r="8" /> : null}
    </>
  );
}

function CompletedRoute() {
  return (
    <>
      <path className="map-gridline" d="M40 40v340M110 20v380M200 30v370M270 20v380M20 90h290M10 180h300M20 270h290M15 350h300" />
      <path className="map-route map-route--commute map-route--draw" d="M150 240 V120 H250" />
      <path className="map-route map-route--found map-route--draw" d="M150 180 H70 V70" />
      <circle className="map-goal" cx="250" cy="120" r="8" />
      <circle className="map-found" cx="70" cy="70" r="7" />
    </>
  );
}
