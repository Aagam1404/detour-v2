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
    >
      <div className="sticker__art" aria-hidden="true">
        {locked || !stamp ? <span className="sticker__mystery">?</span> : <img src={stamp} alt="" />}
      </div>
      <figcaption>
        <span className="sticker__name">{locked ? "???" : name}</span>
        {locked ? null : <span className="sticker__place">{place}</span>}
      </figcaption>
    </figure>
  );
}
