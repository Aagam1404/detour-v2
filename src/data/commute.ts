import { detours, getDetour, type Detour } from "@/data/detours";

export type CommutePlace = {
  name: string;
  x: number;
  y: number;
};

export const commutePlaces: CommutePlace[] = [
  { name: "Newtown", x: 24, y: 74 },
  { name: "Surry Hills", x: 58, y: 62 },
  { name: "Redfern", x: 48, y: 78 },
  { name: "Circular Quay", x: 62, y: 28 },
  { name: "Central", x: 52, y: 58 },
  { name: "Ultimo", x: 38, y: 58 },
  { name: "Haymarket", x: 46, y: 52 },
  { name: "Bondi Junction", x: 86, y: 48 },
  { name: "Glebe", x: 30, y: 52 },
  { name: "Darlinghurst", x: 66, y: 50 },
  { name: "Pyrmont", x: 34, y: 42 },
  { name: "Kings Cross", x: 74, y: 42 },
  { name: "Marrickville", x: 22, y: 84 },
  { name: "Barangaroo", x: 42, y: 32 },
  { name: "Town Hall", x: 48, y: 46 },
  { name: "Wynyard", x: 50, y: 34 },
  { name: "Martin Place", x: 56, y: 38 },
  { name: "Museum", x: 56, y: 48 },
  { name: "St James", x: 58, y: 42 },
  { name: "The Rocks", x: 56, y: 24 },
  { name: "Millers Point", x: 48, y: 26 },
  { name: "Darling Harbour", x: 40, y: 46 },
  { name: "Chinatown", x: 48, y: 54 },
  { name: "Chippendale", x: 44, y: 64 },
  { name: "Darlington", x: 40, y: 70 },
  { name: "Camperdown", x: 32, y: 66 },
  { name: "Erskineville", x: 34, y: 82 },
  { name: "Alexandria", x: 46, y: 88 },
  { name: "Waterloo", x: 56, y: 84 },
  { name: "Zetland", x: 58, y: 90 },
  { name: "Green Square", x: 54, y: 92 },
  { name: "Moore Park", x: 66, y: 70 },
  { name: "Paddington", x: 74, y: 58 },
  { name: "Woolloomooloo", x: 68, y: 38 },
  { name: "Potts Point", x: 74, y: 36 },
  { name: "Elizabeth Bay", x: 80, y: 38 },
  { name: "Rushcutters Bay", x: 80, y: 44 },
  { name: "Edgecliff", x: 84, y: 46 },
  { name: "Double Bay", x: 90, y: 42 },
  { name: "Woollahra", x: 84, y: 54 },
  { name: "Randwick", x: 80, y: 76 },
  { name: "Kensington", x: 74, y: 80 },
  { name: "Coogee", x: 92, y: 80 },
  { name: "Bondi Beach", x: 96, y: 54 },
  { name: "Bronte", x: 96, y: 64 },
  { name: "Annandale", x: 24, y: 58 },
  { name: "Leichhardt", x: 16, y: 56 },
  { name: "Balmain", x: 22, y: 34 },
  { name: "Rozelle", x: 18, y: 42 },
  { name: "Lilyfield", x: 14, y: 48 },
  { name: "Stanmore", x: 18, y: 70 },
  { name: "Enmore", x: 22, y: 78 },
  { name: "St Peters", x: 32, y: 90 },
  { name: "Tempe", x: 26, y: 94 },
  { name: "Dulwich Hill", x: 10, y: 82 },
  { name: "Petersham", x: 12, y: 70 },
  { name: "Ashfield", x: 6, y: 64 },
  { name: "Burwood", x: 4, y: 58 },
  { name: "Strathfield", x: 4, y: 52 },
  { name: "Milsons Point", x: 54, y: 14 },
  { name: "North Sydney", x: 52, y: 8 },
  { name: "Kirribilli", x: 60, y: 14 },
  { name: "Neutral Bay", x: 66, y: 10 },
  { name: "Cremorne", x: 72, y: 8 },
  { name: "Mosman", x: 80, y: 8 },
  { name: "Manly", x: 94, y: 4 },
  { name: "Crows Nest", x: 50, y: 4 },
  { name: "Chatswood", x: 48, y: 2 },
  { name: "Lavender Bay", x: 48, y: 16 },
  { name: "Waverton", x: 44, y: 12 },
  { name: "Mascot", x: 52, y: 96 },
  { name: "Sydney Airport", x: 44, y: 98 },
  { name: "Parramatta", x: 2, y: 40 },
  { name: "Olympic Park", x: 4, y: 46 },
  { name: "Macquarie Park", x: 30, y: 2 },
  { name: "UTS Broadway", x: 42, y: 60 },
  { name: "University of Sydney", x: 34, y: 64 },
  { name: "UNSW Kensington", x: 76, y: 78 },
  { name: "Sydney Opera House", x: 64, y: 22 },
  { name: "Royal Botanic Garden", x: 66, y: 30 },
  { name: "Hyde Park", x: 58, y: 46 },
  { name: "Queen Victoria Building", x: 50, y: 44 },
  { name: "Pitt Street Mall", x: 54, y: 42 },
  { name: "Central Station", x: 50, y: 60 },
  { name: "Broadway Shopping Centre", x: 38, y: 62 },
  { name: "Fish Market", x: 32, y: 44 },
];

export function searchPlaces(query: string, exclude?: string) {
  const needle = query.trim().toLowerCase();
  if (!needle) return [];
  const skip = exclude?.trim().toLowerCase();
  const matches = commutePlaces.filter(
    (place) => place.name.toLowerCase().includes(needle) && place.name.toLowerCase() !== skip,
  );
  const startsWith = (place: CommutePlace) =>
    place.name.toLowerCase().split(" ").some((word) => word.startsWith(needle)) ? 0 : 1;
  return matches.sort((a, b) => startsWith(a) - startsWith(b)).slice(0, 5);
}

export function pinForPlace(name: string) {
  const trimmed = name.trim();
  if (trimmed.length < 2) return null;
  const known = commutePlaces.find((place) => place.name.toLowerCase() === trimmed.toLowerCase());
  if (known) return { x: known.x, y: known.y };
  let hash = 0;
  for (const char of trimmed.toLowerCase()) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  return { x: 22 + (hash % 58), y: 24 + ((hash >> 5) % 52) };
}

export const commuteModes = [
  { id: "walk", label: "Walk" },
  { id: "train", label: "Train" },
  { id: "bus", label: "Bus" },
  { id: "ebike", label: "E-bike" },
  { id: "ferry", label: "Ferry" },
  { id: "metro", label: "Metro" },
] as const;

export type CommuteMode = (typeof commuteModes)[number]["id"];

export type Commute = {
  home: string;
  end: string;
  mode: CommuteMode;
};

/** Used until the person picks how they travel on the detour list. */
export const DEFAULT_MODE: CommuteMode = "train";

const detoursByMode: Record<CommuteMode, string[]> = {
  walk: ["benny", "watcher", "lost-tile", "rainy-shortcut", "bin-chicken-royalty", "pocket-garden"],
  train: ["under-the-tracks", "lost-tile", "watcher", "rainy-shortcut"],
  bus: ["watcher", "rainy-shortcut", "tiny-green-door", "bin-chicken-royalty"],
  ebike: ["tiny-green-door", "bin-chicken-royalty", "benny", "pocket-garden"],
  ferry: ["benny", "watcher", "pocket-garden"],
  metro: ["under-the-tracks", "lost-tile", "rainy-shortcut", "watcher"],
};

/**
 * Extra minutes a detour adds, by how you travel. Every detour has a base time for the walk itself.
 * Each mode then adds the cost of getting off and back on: nothing on foot, a minute to park an
 * e-bike, a few to catch the next bus or train, and longer for a ferry because they run less often.
 */
export const modeAddOn: Record<CommuteMode, number> = {
  walk: 0,
  ebike: 1,
  metro: 2,
  bus: 3,
  train: 3,
  ferry: 6,
};

export function extraMinutesFor(baseMinutes: number, mode: CommuteMode) {
  return baseMinutes + modeAddOn[mode];
}

/** Every mode this detour works with, and how long it adds in each. */
export function modeTimesFor(detour: Detour) {
  return commuteModes
    .filter((item) => detoursByMode[item.id].includes(detour.id))
    .map((item) => ({ mode: item.id, label: item.label, minutes: extraMinutesFor(detour.extraMinutes, item.id) }));
}

export function commuteModeLabel(mode: CommuteMode) {
  return commuteModes.find((item) => item.id === mode)?.label ?? mode;
}

export function detoursForCommute(commute: Commute | null): Detour[] {
  if (!commute) return detours;
  return detoursByMode[commute.mode].map((id) => getDetour(id));
}
