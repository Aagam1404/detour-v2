import { detourStamps } from "@/data/stamps";

export type CitySticker = {
  id: string;
  name: string;
  place: string;
  stamp: string;
};

export const toCollect: CitySticker[] = [
  { id: "benny", name: "Benny the Seal", place: "Circular Quay", stamp: detourStamps.benny },
  { id: "watcher", name: "The Watcher", place: "George St", stamp: detourStamps.watcher },
  { id: "lost-tile", name: "The Lost Tile", place: "QVB", stamp: detourStamps["lost-tile"] },
  { id: "rainy-shortcut", name: "Rainy Shortcut", place: "Pitt St", stamp: detourStamps["rainy-shortcut"] },
  { id: "bin-chicken-royalty", name: "Bin Chicken Royalty", place: "Hyde Park", stamp: detourStamps["bin-chicken-royalty"] },
  { id: "tiny-green-door", name: "Tiny Green Door", place: "Surry Hills", stamp: detourStamps["tiny-green-door"] },
  { id: "pocket-garden", name: "The Pocket Garden", place: "The Rocks", stamp: detourStamps["pocket-garden"] },
  { id: "under-the-tracks", name: "Under the Tracks", place: "Redfern", stamp: detourStamps["under-the-tracks"] },
];

export const stickerReviews = [
  { quote: "Worth the extra four minutes.", place: "Circular Quay" },
  { quote: "Walked past this for a year.", place: "George St" },
  { quote: "The door is the whole detour.", place: "Surry Hills" },
];
