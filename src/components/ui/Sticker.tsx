import type { CSSProperties } from "react";
import type { StickerTheme } from "@/data/detours";
import { stampWindow } from "@/data/stamps";

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
  id,
  name,
  place,
  tone = "yellow",
  size = "md",
  locked = false,
  rotation = 0,
  stamp,
  entering = false,
}: StickerProps) {
  const win = stampWindow(id);
  return (
    <figure
      className={`sticker sticker--${tone} sticker--${size}${locked ? " sticker--locked" : ""}${entering && !locked ? " sticker--enter" : ""}`}
      style={{ "--sticker-rot": `${rotation}deg` } as CSSProperties}
    >
      {locked && stamp ? (
        <div
          className="sticker__art sticker__art--teaser"
          style={{ "--win-x": `${win.x}%`, "--win-y": `${win.y}%` } as CSSProperties}
          role="img"
          aria-label="Hidden stamp. A quarter of it is showing."
        >
          <img src={stamp} alt="" />
          <span className="sticker__mystery">?</span>
        </div>
      ) : (
        <div className="sticker__art" aria-hidden="true">
          {locked || !stamp ? <span className="sticker__mystery">?</span> : <img src={stamp} alt="" />}
        </div>
      )}
      <figcaption>
        <span className="sticker__name">{locked ? "Hidden stamp" : name}</span>
        {locked ? null : <span className="sticker__place">{place}</span>}
      </figcaption>
    </figure>
  );
}
