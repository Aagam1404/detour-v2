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
