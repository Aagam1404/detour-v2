import { commuteModeLabel, modeTimesFor, type CommuteMode } from "@/data/commute";
import type { Detour } from "@/data/detours";

type ModeTimesProps = {
  detour: Detour;
  selected: CommuteMode;
};

/** A row of pills: how many minutes this detour adds on each way of travelling. */
export function ModeTimes({ detour, selected }: ModeTimesProps) {
  const times = modeTimesFor(detour);
  return (
    <div className="mode-times">
      <p className="mode-times__label">Time added, by how you travel</p>
      <ul className="mode-times__list" aria-label="Time this detour adds, by how you travel">
        {times.map((item) => (
          <li
            key={item.mode}
            className={item.mode === selected ? "mode-times__pill mode-times__pill--on" : "mode-times__pill"}
            aria-label={`${commuteModeLabel(item.mode)}: ${item.minutes} extra minutes${item.mode === selected ? ", selected" : ""}`}
          >
            <span>{item.label}</span>
            <strong>+{item.minutes}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}
