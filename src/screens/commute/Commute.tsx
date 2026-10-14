import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { ScreenShell } from "@/components/layout/ScreenShell";
import {
  commuteModeLabel,
  commuteModes,
  detoursForCommute,
  pinForPlace,
  searchPlaces,
  type CommuteMode,
} from "@/data/commute";
import { usePrototype } from "@/state/PrototypeState";

export function CommuteSetup() {
  const navigate = useNavigate();
  const { commute, setCommute } = usePrototype();
  const [home, setHome] = useState(commute?.home ?? "");
  const [end, setEnd] = useState(commute?.end ?? "");
  const [mode, setMode] = useState<CommuteMode | "">(commute?.mode ?? "");
  const [finding, setFinding] = useState(false);
  const homeName = home.trim();
  const endName = end.trim();
  const samePlace = homeName.length > 0 && homeName.toLowerCase() === endName.toLowerCase();
  const ready = Boolean(homeName && endName && mode && !samePlace);

  useEffect(() => {
    if (!finding || !mode) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = window.setTimeout(() => {
      setCommute({ home: homeName, end: endName, mode });
      navigate("/commute/detours");
    }, reduced ? 400 : 1600);
    return () => window.clearTimeout(timer);
  }, [endName, finding, homeName, mode, navigate, setCommute]);

  if (finding && mode) {
    return (
      <ScreenShell>
        <div className="commute-loading" role="status" aria-live="polite">
          <div className="commute-loading__map" aria-hidden="true">
            <svg viewBox="0 0 220 140" className="commute-loading__art">
              <path d="M18 108 C48 108 48 78 78 78 S108 48 138 48 S188 28 204 22" />
              <circle cx="204" cy="22" r="6" />
            </svg>
          </div>
          <h1>{commute ? "Updating your route" : "Finding detours"}</h1>
          <p>
            {commuteModeLabel(mode)} from {homeName} to {endName}
          </p>
        </div>
      </ScreenShell>
    );
  }

  return (
    <ScreenShell>
      <form
        className="commute"
        onSubmit={(event) => {
          event.preventDefault();
          if (ready) setFinding(true);
        }}
      >
        <h1>{commute ? "Change your route" : "Your commute"}</h1>
        <p>{commute ? "Pick new stops or a different way to travel. We’ll line up fresh detours." : "The trip you already make. We’ll find detours on that same ride."}</p>
        <PlaceSearch
          label="Home"
          placeholder="Search your home"
          value={home}
          exclude={end}
          onChange={setHome}
        />
        <PlaceSearch
          label="Heading to"
          placeholder="Search where you're heading"
          value={end}
          exclude={home}
          onChange={setEnd}
        />
        {samePlace ? <p className="commute__note">Pick two different stops.</p> : null}
        <fieldset>
          <legend>How do you get there?</legend>
          <div className="commute__choices">
            {commuteModes.map((item) => (
              <button
                key={item.id}
                type="button"
                className={mode === item.id ? "commute__choice commute__choice--on" : "commute__choice"}
                onClick={() => setMode(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </fieldset>
        <Button type="submit" disabled={!ready}>
          {commute ? "Update route" : "Find detours"}
        </Button>
        {commute ? (
          <button type="button" className="commute__change" onClick={() => navigate("/home")}>
            Keep my current route
          </button>
        ) : null}
      </form>
    </ScreenShell>
  );
}

function PlaceSearch({
  label,
  placeholder,
  value,
  exclude,
  onChange,
}: {
  label: string;
  placeholder: string;
  value: string;
  exclude: string;
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const matches = open ? searchPlaces(value, exclude) : [];
  const pin = pinForPlace(value);

  return (
    <fieldset className={open && matches.length > 0 ? "place-field place-field--open" : "place-field"}>
      <legend>{label}</legend>
      <div className="place-field__frame">
        <StreetMap pin={pin} />
        <div className="place-field__search">
          <input
            value={value}
            placeholder={placeholder}
            aria-label={label}
            aria-expanded={matches.length > 0}
            autoComplete="off"
            onChange={(event) => {
              onChange(event.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            onBlur={() => setOpen(false)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && matches[0]) {
                event.preventDefault();
                onChange(matches[0].name);
                setOpen(false);
              }
            }}
          />
          {matches.length > 0 ? (
            <ul className="place-field__results">
              {matches.map((place) => (
                <li key={place.name}>
                  <button
                    type="button"
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => {
                      onChange(place.name);
                      setOpen(false);
                    }}
                  >
                    {place.name}
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </fieldset>
  );
}

function StreetMap({ pin }: { pin: { x: number; y: number } | null }) {
  return (
    <svg className="place-field__map" viewBox="0 0 320 150" aria-hidden="true">
      <rect width="320" height="150" fill="#e7eef8" />
      <path d="M0 0 H150 C110 36 92 70 70 150 H0 Z" fill="#c9ddf6" />
      <g stroke="#f4f1ea" strokeWidth="7" strokeLinecap="square">
        <path d="M0 36 H320 M0 78 H320 M0 118 H320" />
        <path d="M70 0 V150 M140 0 V150 M210 0 V150 M270 0 V150" />
      </g>
      <g stroke="#d7e0ee" strokeWidth="11" fill="none">
        <path d="M20 130 C80 130 90 90 150 90 S230 40 310 28" />
      </g>
      {pin ? (
        <g transform={`translate(${(pin.x / 100) * 320} ${(pin.y / 100) * 150})`}>
          <circle r="11" fill="#ffd75a" stroke="#171717" strokeWidth="2.5" />
          <circle r="3.5" fill="#171717" />
        </g>
      ) : null}
    </svg>
  );
}

export function CommuteDetours() {
  const navigate = useNavigate();
  const { commute, startDetour } = usePrototype();
  const picks = detoursForCommute(commute);

  if (!commute) {
    return (
      <ScreenShell>
        <div className="commute">
          <h1>Your commute</h1>
          <p>Set the trip first, then we’ll line up the detours.</p>
          <Button onClick={() => navigate("/commute")}>Set my commute</Button>
        </div>
      </ScreenShell>
    );
  }

  return (
    <ScreenShell>
      <div className="commute commute--list">
        <h1>On this commute</h1>
        <p>
          {commuteModeLabel(commute.mode)} from {commute.home} to {commute.end}. Same ride, a few
          things worth noticing.
        </p>
        <ul className="commute__list">
          {picks.map((detour) => (
            <li key={detour.id} className={`commute-card commute-card--${commute.mode}`}>
              <div className="commute-card__map" aria-hidden="true">
                <RouteSketch />
                <span>
                  {detour.extraMinutes} min
                </span>
              </div>
              <div className="commute-card__row">
                <div>
                  <h2>{detour.name}</h2>
                  <p>{detour.location}</p>
                </div>
                <button
                  type="button"
                  aria-label={`Open ${detour.name}`}
                  onClick={() => {
                    startDetour();
                    navigate(`/detour/${detour.id}`);
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                    <path d="M4 14 L14 4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    <path d="M7 4 H14 V11" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </li>
          ))}
        </ul>
        <Button onClick={() => navigate("/home")}>See them on the map</Button>
        <button type="button" className="commute__change" onClick={() => navigate("/commute")}>
          Change commute
        </button>
      </div>
    </ScreenShell>
  );
}

function RouteSketch() {
  return (
    <svg viewBox="0 0 160 88" className="commute-card__sketch">
      <path d="M8 70 H40 V48 H72 V28 H110 V16 H150" fill="none" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx="150" cy="16" r="5" fill="currentColor" />
    </svg>
  );
}
