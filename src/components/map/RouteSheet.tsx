import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { commuteModeLabel, commuteModes } from "@/data/commute";
import { usePrototype } from "@/state/PrototypeState";

type RouteSheetProps = {
  onClose: () => void;
};

/** Change the commute without leaving the map. */
export function RouteSheet({ onClose }: RouteSheetProps) {
  const navigate = useNavigate();
  const { commute, setCommute } = usePrototype();

  if (!commute) {
    return (
      <div className="sheet" role="dialog" aria-label="Your route">
        <div className="sheet__panel">
          <h2>Set your route</h2>
          <p>Tell us the trip you already make and we will line up detours on it.</p>
          <Button onClick={() => navigate("/commute")}>Set my commute</Button>
          <Button variant="secondary" onClick={onClose}>
            Not now
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="sheet" role="dialog" aria-label="Your route">
      <div className="sheet__panel">
        <h2>Your route</h2>
        <p className="route-sheet__trip">
          <strong>{commute.home}</strong> to <strong>{commute.end}</strong> by {commuteModeLabel(commute.mode).toLowerCase()}
        </p>
        <div className="commute__choices" role="group" aria-label="How you travel">
          {commuteModes.map((item) => (
            <button
              key={item.id}
              type="button"
              className={commute.mode === item.id ? "commute__choice commute__choice--on" : "commute__choice"}
              onClick={() => setCommute({ ...commute, mode: item.id })}
            >
              {item.label}
            </button>
          ))}
        </div>
        <Button variant="secondary" onClick={() => setCommute({ ...commute, home: commute.end, end: commute.home })}>
          Swap direction
        </Button>
        <Button onClick={() => navigate("/commute")}>Change stops</Button>
        <button type="button" className="commute__change" onClick={onClose}>
          Done
        </button>
      </div>
    </div>
  );
}
