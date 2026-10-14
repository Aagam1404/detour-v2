import { useState } from "react";
import { AppScreen } from "@/components/layout/AppScreen";
import { Header } from "@/components/layout/Header";
import { Sticker } from "@/components/ui/Sticker";
import { collection } from "@/data/detours";
import { detourStamps } from "@/data/stamps";
import { toCollect } from "@/data/toCollect";
import { TOTAL_STAMPS } from "@/data/wallet";
import { usePrototype } from "@/state/PrototypeState";

type Filter = "all" | "found" | "todo";

const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "found", label: "Found" },
  { id: "todo", label: "To find" },
];

export function Stamps() {
  const { stampIds } = usePrototype();
  const [filter, setFilter] = useState<Filter>("all");
  const list = toCollect.filter((stamp) => {
    const owned = stampIds.includes(stamp.id);
    return filter === "all" || (filter === "found" ? owned : !owned);
  });

  return (
    <AppScreen nav>
      <div className="stamps">
        <Header title="Stamps" subtitle={`${stampIds.length} of ${TOTAL_STAMPS} found. Each hidden one shows a peek of what you will get.`} />
        <div className="stamps__chips" role="group" aria-label="Filter stamps">
          {filters.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={filter === item.id}
              className={filter === item.id ? "profile__chip profile__chip--active" : "profile__chip"}
              onClick={() => setFilter(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
        {list.length === 0 ? (
          <p className="rewards__empty">{filter === "found" ? "Nothing yet. Finish a detour and pick a card." : "You have them all."}</p>
        ) : (
          <div className="stamps__grid">
            {list.map((stamp) => {
              const meta = collection.find((item) => item.id === stamp.id);
              const owned = stampIds.includes(stamp.id);
              return (
                <Sticker
                  key={stamp.id}
                  id={stamp.id}
                  name={stamp.name}
                  place={stamp.place}
                  theme={meta?.theme ?? "oddity"}
                  tone={meta?.tone ?? "yellow"}
                  locked={!owned}
                  stamp={detourStamps[stamp.id]}
                />
              );
            })}
          </div>
        )}
      </div>
    </AppScreen>
  );
}
