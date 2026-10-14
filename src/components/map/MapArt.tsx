import { memo } from "react";
import { mapLabels } from "@/data/mapLayout";

const LAND = "#f3eddd";
const WATER = "#c9ddf6";
const PARK = "#d6ecd6";
const INK = "#171717";

const WATER_PATH =
  "M100 0 L97.5 0 C98 4 97.2 8 96.5 10 C92 9.4 86 11 80 10.6 L71 12 L63 12.2 C59 12.6 56.5 13.6 54.6 14.6 L52 15.6 L50 17.8 L48 15.2 L45 14.2 C40 13.6 34 17.4 28 21 L22 23.6 L14 23 L0 24 L0 31 L22 31.8 L26 32.6 L28 36 L28 44 L31 45 L33 38 L34 34 L38 33.2 L39 37 L39 47.6 L43.6 48 L44 38 L43.6 33.4 L45.2 31 L49 28.6 L54 26 L55.6 25.2 L58 26.6 L60.6 27.4 C62.4 28.8 64.4 28.8 66 27.4 L65 24 L65.2 22 L67.4 21.6 L67.4 25 L69.2 28 C70.4 31 71.4 33.2 72.4 34.6 L75 34.4 L79 36 L81 38.6 L84 40.2 L88 38.4 L91 39.4 L94 33.4 L97 29.4 L98.4 26 L98.8 40 L99.6 52 L98.4 62 L96.6 72 L95.6 82 L96.6 90 L98 100 L100 100 Z";

const BOTANY_BAY = "M58 100 C61 96.6 76 95.6 91 98.6 L93 100 Z";

const ROADS = [
  "M58.5 27.5 L52.5 40 L50 48 L49 56 L50 60",
  "M62 31 L56 42 L55 50 L54 59",
  "M51 58.5 L40 58.5 L30 60.5 L20 62.5 L8 62.5",
  "M58 45.5 L66 51 L76 56 L86 49 L97 54",
  "M52 60 L52 78 L52 96",
  "M40 66 L52 64.5 L66 62.5 L74 62.5",
  "M66 62.5 L72 71 L80 75.5 L92 80",
  "M30 62.5 L26 72 L22 86",
  "M60 40 L68 40 L75 43 L82 46",
  "M52 2 L52.6 8 L54 14",
  "M50 14 L46 6 L40 2",
  "M18 42 L24 38 L26 32.6",
  "M36 47 L38 56 L40 66 L44 76",
  "M10 70 L22 72 L34 70 L40 66",
];

const RAILS = [
  "M51 59 L48 76 L36 78 L24 73 L14 70 L10 64 L5 56 L4 52",
  "M48 76 L46 90 L44 98",
  "M51 59 L54 52 L56 42 L56.6 36 L58 29",
];

function MapArtBase() {
  return (
    <svg className="map-art" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <defs>
        <pattern id="map-waves" width="4" height="3" patternUnits="userSpaceOnUse">
          <path d="M0 1.5 q1 -0.9 2 0 t2 0" fill="none" stroke="#a8c5ee" strokeWidth="0.14" />
        </pattern>
        <pattern id="map-blocks-a" width="3" height="3" patternUnits="userSpaceOnUse" patternTransform="rotate(-14)">
          <path d="M0 0 H3 M0 0 V3" stroke="#fffdf8" strokeWidth="0.2" fill="none" />
        </pattern>
        <pattern id="map-blocks-b" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(-14)">
          <path d="M0 0 H9 M0 0 V9" stroke="#fffdf8" strokeWidth="0.26" fill="none" />
        </pattern>
      </defs>

      <rect width="100" height="100" fill={LAND} />
      <rect width="100" height="100" fill="url(#map-blocks-a)" opacity="0.8" />
      <rect width="100" height="100" fill="url(#map-blocks-b)" />

      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        {ROADS.map((d) => (
          <path key={`c${d}`} d={d} stroke="#ddd4be" strokeWidth="0.8" />
        ))}
        {ROADS.map((d) => (
          <path key={d} d={d} stroke="#fffdf8" strokeWidth="0.5" />
        ))}
      </g>

      <g fill={PARK} stroke={INK} strokeWidth="1.5" vectorEffect="non-scaling-stroke" strokeLinejoin="round">
        <path d="M62 26 L70 29 L72.5 34 L66 36.4 L62 34 Z" vectorEffect="non-scaling-stroke" />
        <path d="M59.6 37.4 L64 37.4 L64 41.4 L59.6 41.4 Z" vectorEffect="non-scaling-stroke" />
        <path d="M56.6 43.4 L59.8 43.8 L59.2 51.4 L56.2 51 Z" vectorEffect="non-scaling-stroke" />
        <ellipse cx="74" cy="64.4" rx="5" ry="3.8" vectorEffect="non-scaling-stroke" />
        <ellipse cx="65.4" cy="70.4" rx="3.8" ry="4.6" vectorEffect="non-scaling-stroke" />
        <ellipse cx="41" cy="87" rx="4" ry="3" vectorEffect="non-scaling-stroke" />
        <ellipse cx="36.5" cy="63" rx="3" ry="2.2" vectorEffect="non-scaling-stroke" />
        <ellipse cx="53.4" cy="63.4" rx="2.4" ry="1.5" vectorEffect="non-scaling-stroke" />
        <ellipse cx="62" cy="6" rx="3.4" ry="2" vectorEffect="non-scaling-stroke" />
        <ellipse cx="38" cy="8" rx="3" ry="2.2" vectorEffect="non-scaling-stroke" />
      </g>

      <g fill="none" strokeLinecap="butt">
        {RAILS.map((d) => (
          <path key={`r${d}`} d={d} stroke={INK} strokeWidth="0.42" />
        ))}
        {RAILS.map((d) => (
          <path key={`w${d}`} d={d} stroke="#fffdf8" strokeWidth="0.3" strokeDasharray="0.7 0.7" />
        ))}
      </g>

      <path d={WATER_PATH} fill={WATER} />
      <path d={WATER_PATH} fill="url(#map-waves)" />
      <path d={BOTANY_BAY} fill={WATER} />
      <path d={BOTANY_BAY} fill="url(#map-waves)" />
      <g fill="none" stroke={INK} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
        <path d={WATER_PATH} vectorEffect="non-scaling-stroke" />
        <path d={BOTANY_BAY} vectorEffect="non-scaling-stroke" />
      </g>

      <g strokeLinecap="round" fill="none" stroke={INK}>
        <path d="M55.2 24.2 L53.8 14.6" strokeWidth="4" vectorEffect="non-scaling-stroke" />
        <path d="M55.2 24.2 L53.8 14.6" strokeWidth="1.6" stroke="#fffdf8" vectorEffect="non-scaling-stroke" />
        <path d="M55.1 23.6 Q51.6 19 54 14.9" strokeWidth="1.6" vectorEffect="non-scaling-stroke" />
      </g>

      <g fill="#fffdf8" stroke={INK} strokeWidth="1.6" strokeLinejoin="round">
        <path d="M63.6 23.6 Q63.8 21 65.4 20.6 Q65.7 22.2 65.5 23.6 Z" vectorEffect="non-scaling-stroke" />
        <path d="M65.6 23.6 Q65.9 21.4 67.4 21 Q67.6 22.4 67.4 23.6 Z" vectorEffect="non-scaling-stroke" />
      </g>

      <g fontFamily="var(--font-body), 'DM Sans', sans-serif" textAnchor="middle">
        {mapLabels.map((label) => (
          <text
            key={label.name}
            x={label.x}
            y={label.y}
            fontSize={label.big ? 1.25 : 1.02}
            fontWeight={label.big ? 900 : 700}
            letterSpacing="0.07"
            fill={label.big ? INK : "#6e6858"}
            stroke={LAND}
            strokeWidth="0.45"
            paintOrder="stroke"
          >
            {label.name.toUpperCase()}
          </text>
        ))}
        <text x="79" y="19.5" fontSize="1.2" fontStyle="italic" fontWeight="700" letterSpacing="0.4" fill="#5f86bd">
          SYDNEY HARBOUR
        </text>
        <text x="9" y="28.2" fontSize="0.9" fontStyle="italic" fontWeight="700" letterSpacing="0.25" fill="#5f86bd">
          PARRAMATTA RIVER
        </text>
        <text x="99.1" y="68" fontSize="0.85" fontStyle="italic" fontWeight="700" letterSpacing="0.4" fill="#5f86bd" transform="rotate(90 99.1 68)">
          PACIFIC OCEAN
        </text>
      </g>
    </svg>
  );
}

export const MapArt = memo(MapArtBase);
