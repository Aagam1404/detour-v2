import benny from "@/assets/stickers/benny.png";
import binChicken from "@/assets/stickers/bin-chicken-royalty.png";
import lostTile from "@/assets/stickers/lost-tile.png";
import pocketGarden from "@/assets/stickers/pocket-garden.png";
import rainyShortcut from "@/assets/stickers/rainy-shortcut.png";
import tinyGreenDoor from "@/assets/stickers/tiny-green-door.png";
import underTheTracks from "@/assets/stickers/under-the-tracks.png";
import watcher from "@/assets/stickers/watcher.png";

export const detourStamps: Record<string, string> = {
  benny,
  watcher,
  "tiny-green-door": tinyGreenDoor,
  "bin-chicken-royalty": binChicken,
  "under-the-tracks": underTheTracks,
  "rainy-shortcut": rainyShortcut,
  "lost-tile": lostTile,
  "pocket-garden": pocketGarden,
  tracks: underTheTracks,
  tile: lostTile,
  door: tinyGreenDoor,
  rainy: rainyShortcut,
  "bin-chicken": binChicken,
};

/**
 * Locked stamps show only a quarter of the artwork as a teaser.
 * x / y are the top-left of the visible window, in percent of the stamp.
 * The window is always 50% x 50%, so exactly one quarter shows.
 */
export type StampWindow = { x: number; y: number };

const windowByStamp: Record<string, StampWindow> = {
  benny: { x: 0, y: 30 },
  "bin-chicken-royalty": { x: 28, y: 24 },
  "lost-tile": { x: 24, y: 24 },
  "pocket-garden": { x: 0, y: 30 },
  "rainy-shortcut": { x: 20, y: 32 },
  "tiny-green-door": { x: 22, y: 30 },
  "under-the-tracks": { x: 0, y: 30 },
  watcher: { x: 22, y: 30 },
};

const windowAliases: Record<string, string> = {
  tracks: "under-the-tracks",
  tile: "lost-tile",
  door: "tiny-green-door",
  rainy: "rainy-shortcut",
  "bin-chicken": "bin-chicken-royalty",
};

export function stampWindow(id: string): StampWindow {
  return windowByStamp[windowAliases[id] ?? id] ?? { x: 0, y: 25 };
}
