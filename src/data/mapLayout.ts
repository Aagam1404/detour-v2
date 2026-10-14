/** Positions on the illustrated Sydney map. Both axes run 0 to 100, the same space as commutePlaces. */
export const detourSpots: Record<string, { x: number; y: number }> = {
  benny: { x: 64.5, y: 29.5 },
  "pocket-garden": { x: 54.5, y: 28.5 },
  watcher: { x: 47, y: 50 },
  "lost-tile": { x: 52, y: 42.5 },
  "rainy-shortcut": { x: 56, y: 37 },
  "bin-chicken-royalty": { x: 60.5, y: 46.5 },
  "tiny-green-door": { x: 58, y: 62 },
  "under-the-tracks": { x: 48, y: 78 },
};

export function spotFor(id: string) {
  return detourSpots[id] ?? { x: 50, y: 50 };
}

export type MapLabel = { name: string; x: number; y: number; big?: boolean };

export const mapLabels: MapLabel[] = [
  { name: "Central", x: 51.5, y: 61.5, big: true },
  { name: "Newtown", x: 24, y: 77 },
  { name: "Surry Hills", x: 60.5, y: 56 },
  { name: "Redfern", x: 44, y: 73 },
  { name: "Ultimo", x: 38, y: 55 },
  { name: "Glebe", x: 29, y: 50 },
  { name: "Darlinghurst", x: 66, y: 49 },
  { name: "Pyrmont", x: 34, y: 40 },
  { name: "Kings Cross", x: 75, y: 43 },
  { name: "Paddington", x: 75, y: 56 },
  { name: "Bondi Junction", x: 85, y: 51 },
  { name: "Marrickville", x: 18, y: 86 },
  { name: "Chippendale", x: 43, y: 64 },
  { name: "Balmain", x: 22, y: 36.5 },
  { name: "Randwick", x: 80, y: 74 },
  { name: "Coogee", x: 90, y: 83 },
  { name: "Bondi Beach", x: 91, y: 59 },
  { name: "Mascot", x: 52, y: 93 },
  { name: "North Sydney", x: 51, y: 7 },
  { name: "Mosman", x: 80, y: 6 },
  { name: "Manly", x: 91, y: 2.5 },
  { name: "Moore Park", x: 65, y: 76 },
  { name: "Waterloo", x: 57, y: 85 },
  { name: "Alexandria", x: 45, y: 90 },
  { name: "Leichhardt", x: 14, y: 53 },
  { name: "Annandale", x: 24, y: 61 },
  { name: "Kirribilli", x: 62, y: 10 },
  { name: "Woolloomooloo", x: 70, y: 40 },
  { name: "Double Bay", x: 91, y: 44.5 },
  { name: "Chatswood", x: 46, y: 2.5 },
  { name: "Enmore", x: 17, y: 76 },
  { name: "Camperdown", x: 33, y: 67 },
];
