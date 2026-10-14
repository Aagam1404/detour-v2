import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import coinUrl from "@/assets/icons/coin.png";
import { detoursForCommute, pinForPlace } from "@/data/commute";
import { spotFor } from "@/data/mapLayout";
import { usePrototype } from "@/state/PrototypeState";
import { MapArt } from "@/components/map/MapArt";

/** Side of the square illustrated map, in pixels at zoom 1. */
const SIZE = 1400;
const MAX_ZOOM = 1.9;

type View = { x: number; y: number; k: number };
type Size = { w: number; h: number };

function clampView(view: View, size: Size): View {
  const minK = Math.max(size.w, size.h) / SIZE;
  const k = Math.min(MAX_ZOOM, Math.max(minK, view.k));
  const span = SIZE * k;
  const x = span <= size.w ? (size.w - span) / 2 : Math.min(0, Math.max(size.w - span, view.x));
  const y = span <= size.h ? (size.h - span) / 2 : Math.min(0, Math.max(size.h - span, view.y));
  return { x, y, k };
}

/** A gentle bend so the route reads as a drawn line, not a ruler. */
function routePath(a: { x: number; y: number }, b: { x: number; y: number }) {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const bend = 0.14;
  const cx = mx - dy * bend;
  const cy = my + dx * bend;
  return `M${a.x} ${a.y} Q${cx} ${cy} ${b.x} ${b.y}`;
}

export function SydneyMap() {
  const navigate = useNavigate();
  const { startDetour, commute, stampIds } = usePrototype();
  const frame = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<Size>({ w: 375, h: 812 });
  const [view, setView] = useState<View>({ x: 0, y: 0, k: 1 });
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const moved = useRef(false);
  const travelled = useRef(0);

  const list = useMemo(() => detoursForCommute(commute), [commute]);
  const home = commute ? pinForPlace(commute.home) : null;
  const end = commute ? pinForPlace(commute.end) : null;
  const commuteKey = commute ? `${commute.mode}|${commute.home}|${commute.end}` : "all";

  const fit = useCallback(
    (box: Size): View => {
      const points = [...list.map((d) => spotFor(d.id)), ...(home ? [home] : []), ...(end ? [end] : [])];
      if (points.length === 0) return clampView({ x: 0, y: 0, k: 1 }, box);
      const xs = points.map((p) => (p.x / 100) * SIZE);
      const ys = points.map((p) => (p.y / 100) * SIZE);
      const minX = Math.min(...xs);
      const maxX = Math.max(...xs);
      const minY = Math.min(...ys);
      const maxY = Math.max(...ys);
      const availW = Math.max(120, box.w - 100);
      const availH = Math.max(160, box.h - 280);
      const k = Math.min(1.25, availW / Math.max(1, maxX - minX), availH / Math.max(1, maxY - minY));
      const kk = Math.min(MAX_ZOOM, Math.max(Math.max(box.w, box.h) / SIZE, k));
      const cx = (minX + maxX) / 2;
      const cy = (minY + maxY) / 2;
      return clampView({ k: kk, x: box.w / 2 - cx * kk, y: (box.h - 90) / 2 - cy * kk }, box);
    },
    [list, home, end],
  );

  // Measure the screen, then frame the route and its detours. Re-frame when the route changes.
  useEffect(() => {
    const el = frame.current;
    if (!el) return;
    const measure = () => {
      const rect = el.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) setSize({ w: rect.width, h: rect.height });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setView(fit(size));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commuteKey, size.w, size.h]);

  const zoomAt = useCallback(
    (px: number, py: number, factor: number) => {
      setView((v) => {
        const next = clampView({ ...v, k: v.k * factor }, size);
        const ratio = next.k / v.k;
        return clampView({ k: next.k, x: px - (px - v.x) * ratio, y: py - (py - v.y) * ratio }, size);
      });
    },
    [size],
  );

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      const prev = pointers.current.get(event.pointerId);
      if (!prev) return;
      const next = { x: event.clientX, y: event.clientY };
      if (pointers.current.size === 1) {
        const dx = next.x - prev.x;
        const dy = next.y - prev.y;
        travelled.current += Math.abs(dx) + Math.abs(dy);
        if (travelled.current > 8) moved.current = true;
        setView((v) => clampView({ ...v, x: v.x + dx, y: v.y + dy }, size));
        pointers.current.set(event.pointerId, next);
        return;
      }
      if (pointers.current.size === 2) {
        const [first, second] = [...pointers.current.entries()];
        const before = Math.hypot(first[1].x - second[1].x, first[1].y - second[1].y);
        pointers.current.set(event.pointerId, next);
        const [a, b] = [...pointers.current.values()];
        const after = Math.hypot(a.x - b.x, a.y - b.y);
        moved.current = true;
        const rect = frame.current?.getBoundingClientRect();
        if (before > 0 && rect) zoomAt((a.x + b.x) / 2 - rect.left, (a.y + b.y) / 2 - rect.top, after / before);
      }
    };
    const onUp = (event: PointerEvent) => {
      pointers.current.delete(event.pointerId);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, [size, zoomAt]);

  const openDetour = (id: string) => {
    if (moved.current) return;
    startDetour();
    navigate(`/detour/${id}`);
  };

  const toPx = (value: number) => `${(value / 100) * SIZE}px`;

  return (
    <>
      <div
        ref={frame}
        className="sydney-map"
        role="region"
        aria-label="Illustrated map of central Sydney. Drag to move, pinch or use the buttons to zoom."
        onPointerDown={(event) => {
          if (pointers.current.size === 0) {
            moved.current = false;
            travelled.current = 0;
          }
          pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
        }}
        onWheel={(event) => {
          const rect = event.currentTarget.getBoundingClientRect();
          zoomAt(event.clientX - rect.left, event.clientY - rect.top, Math.exp(-event.deltaY * 0.0015));
        }}
      >
        <div
          className="map-canvas"
          style={{
            width: SIZE,
            height: SIZE,
            transform: `translate3d(${view.x}px, ${view.y}px, 0) scale(${view.k})`,
            ["--inv" as string]: 1 / view.k,
          }}
        >
          <MapArt />
          {home && end ? (
            <svg className="map-route" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" focusable="false">
              <path d={routePath(home, end)} fill="none" stroke="#fffdf8" strokeWidth="9" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
              <path d={routePath(home, end)} fill="none" stroke="#171717" strokeWidth="4" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
            </svg>
          ) : null}

          {list.map((detour, index) => {
            const spot = spotFor(detour.id);
            const done = stampIds.includes(detour.id);
            return (
              <div key={detour.id} className="map-coin" style={{ left: toPx(spot.x), top: toPx(spot.y) }}>
                <button
                  type="button"
                  className={done ? "coin-marker__button map-coin__button map-coin__button--done" : "coin-marker__button map-coin__button"}
                  style={{ ["--coin-delay" as string]: `${index * 0.28}s` }}
                  aria-label={done ? `${detour.name}, already found` : detour.name}
                  onClick={() => openDetour(detour.id)}
                >
                  <img src={coinUrl} alt="" draggable={false} />
                  {done ? <span className="map-coin__check">✓</span> : null}
                </button>
                <span className="map-coin__tag">{detour.shortName}</span>
              </div>
            );
          })}

          {home && commute ? (
            <div className="map-pin map-pin--home" style={{ left: toPx(home.x), top: toPx(home.y) }}>
              <span className="map-pin__dot" />
              <span className="map-pin__tag">{commute.home}</span>
            </div>
          ) : null}
          {end && commute ? (
            <div className="map-pin map-pin--end" style={{ left: toPx(end.x), top: toPx(end.y) }}>
              <span className="map-pin__dot" />
              <span className="map-pin__tag">{commute.end}</span>
            </div>
          ) : null}
        </div>
      </div>

      <div className="map-zoom" role="group" aria-label="Map controls">
        <button type="button" aria-label="Zoom in" onClick={() => zoomAt(size.w / 2, size.h / 2, 1.3)}>
          +
        </button>
        <button type="button" aria-label="Zoom out" onClick={() => zoomAt(size.w / 2, size.h / 2, 1 / 1.3)}>
          −
        </button>
        <button type="button" aria-label="Centre on my route" onClick={() => setView(fit(size))}>
          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
            <circle cx="9" cy="9" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M9 0 V4 M9 14 V18 M0 9 H4 M14 9 H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </>
  );
}
