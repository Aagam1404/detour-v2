import { useState } from "react";
import { BottomNav } from "@/components/layout/BottomNav";
import { CoinPill } from "@/components/ui/CoinPill";
import { RouteSheet } from "@/components/map/RouteSheet";
import { ScreenShell } from "@/components/layout/ScreenShell";
import { SydneyMap } from "@/components/map/SydneyMap";
import { commuteModeLabel } from "@/data/commute";
import { usePrototype } from "@/state/PrototypeState";

export function Home() {
  const { commute } = usePrototype();
  const [editing, setEditing] = useState(false);

  return (
    <ScreenShell padded={false} className="screen-shell--map">
      <SydneyMap />
      <button type="button" className="commute-chip commute-chip--button" onClick={() => setEditing(true)}>
        <span className="commute-chip__text">
          {commute ? `${commuteModeLabel(commute.mode)} · ${commute.home} → ${commute.end}` : "Set your route"}
        </span>
        <span className="commute-chip__edit">Change</span>
      </button>
      <CoinPill floating />
      <BottomNav />
      {editing ? <RouteSheet onClose={() => setEditing(false)} /> : null}
    </ScreenShell>
  );
}
