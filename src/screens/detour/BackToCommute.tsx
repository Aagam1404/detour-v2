import { useNavigate } from "react-router-dom";
import { AppScreen } from "@/components/layout/AppScreen";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { MapRoute } from "@/components/map/MapRoute";
import { CoinIcon } from "@/components/ui/CoinPill";
import { stampMeta } from "@/data/wallet";
import { usePrototype } from "@/state/PrototypeState";

export function BackToCommute() {
  const navigate = useNavigate();
  const { collectedIds, lastClaim } = usePrototype();
  const finished = collectedIds.length > 0;

  return (
    <AppScreen nav>
      <div className="return">
        <p className="return__eyebrow">{finished ? "Back on track" : "Straight to class"}</p>
        <h1>{finished ? "Okay, heading to class →" : "Back to reality."}</h1>
        <p className="return__copy">
          {finished
            ? "Nice detour. You’re a little off course, so this is the quick way back."
            : "UTS is still 14 minutes away. The usual route is right where you left it."}
        </p>
        <button type="button" className="return__change" onClick={() => navigate("/commute")}>
          Different route today? Change it
        </button>
        {finished ? (
          <div className="return__chips">
            <Chip>6 min walk</Chip>
            <Chip variant="filled">Arrive 8:02</Chip>
            <Chip variant="muted">On time</Chip>
          </div>
        ) : null}
        <MapRoute variant={finished ? "completed" : "available"} />
        {finished ? (
          <Card variant="story">
            <p className="return__won">
              <CoinIcon size={20} />{" "}
              <strong>{lastClaim && lastClaim.coins > 0 ? `+${lastClaim.coins} coins` : "No coins this time"}</strong>
            </p>
            {lastClaim && lastClaim.stampIds.length > 0 ? (
              <p>Stamp: {lastClaim.stampIds.map((id) => stampMeta(id)?.name).join(", ")}</p>
            ) : null}
          </Card>
        ) : (
          <p className="return__note">One little piece of Sydney, still waiting.</p>
        )}
        <Button onClick={() => navigate("/home")}>{finished ? "Start walking" : "Take me to class"}</Button>
        <Button variant="secondary" onClick={() => navigate(finished ? "/rewards" : "/me")}>
          {finished ? "See my rewards" : "See my profile"}
        </Button>

      </div>
    </AppScreen>
  );
}
