import type { CSSProperties } from "react";
import type { StickerTheme } from "@/data/detours";

type StickerProps = {
  id: string;
  name: string;
  place: string;
  theme: StickerTheme;
  tone?: "yellow" | "blue" | "mint" | "pale" | "pink" | "orange" | "harbour";
  size?: "sm" | "md" | "lg";
  locked?: boolean;
  rotation?: number;
  stamp?: string;
  entering?: boolean;
};

/**
 * One stamp in the collection grid. The artwork already carries its own name
 * and place, so the card is just the box and the stamp. Stamps you have not
 * found yet show the same artwork in black and white.
 */
export function Sticker({
  name,
  place,
  tone = "yellow",
  size = "md",
  locked = false,
  rotation = 0,
  stamp,
  entering = false,
}: StickerProps) {
  return (
    <figure
      className={`sticker sticker--${tone} sticker--${size}${locked ? " sticker--locked" : ""}${entering && !locked ? " sticker--enter" : ""}`}
      style={{ "--sticker-rot": `${rotation}deg` } as CSSProperties}
      aria-label={locked ? "Stamp not found yet" : `${name}, ${place}`}
    >
      <div className="sticker__art" aria-hidden="true">
        {stamp ? <img src={stamp} alt="" /> : <span className="sticker__mystery">?</span>}
      </div>
    </figure>
  );
}
