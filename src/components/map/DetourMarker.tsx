type DetourMarkerProps = {
  state?: "available" | "selected" | "completed" | "locked";
  label?: string;
};

export function DetourMarker({ state = "available", label }: DetourMarkerProps) {
  return (
    <span className={`detour-marker detour-marker--${state}`}>
      <span className="detour-marker__dot" />
      {label ? <span className="detour-marker__label">{label}</span> : null}
    </span>
  );
}
