import { getJourney, journeys } from "@/data/journeys";

export type StickerTheme = "harbour" | "heritage" | "nature" | "oddity";

export type Detour = {
  id: string;
  name: string;
  shortName: string;
  location: string;
  suburb: string;
  extraMinutes: number;
  distanceMeters: number;
  teaser: string;
  mission: string;
  hint: string;
  clue: string;
  lookAsk: string;
  story: string;
  stickerImage: string;
  stickerTheme: StickerTheme;
  reward?: {
    type: "coffee" | "opal" | "museum" | "local";
    label: string;
  };
};

export type CollectionSticker = {
  id: string;
  name: string;
  place: string;
  theme: StickerTheme;
  tone: "yellow" | "blue" | "mint" | "pale" | "pink" | "orange";
  rotation: number;
  locked?: boolean;
};

function toDetour(id: string): Detour {
  const journey = getJourney(id);
  const hinted = journey.steps.find((step) => step.hint);
  return {
    id: journey.id,
    name: journey.name,
    shortName: journey.shortName,
    location: journey.location,
    suburb: journey.suburb,
    extraMinutes: journey.extraMinutes,
    distanceMeters: journey.distanceMeters,
    teaser: journey.teaser,
    mission: journey.mysteryPrompt,
    hint: hinted?.hint ?? "",
    clue: hinted?.hint ?? "",
    lookAsk: journey.steps[3]?.heading ?? "Look",
    story: journey.reveal.story,
    stickerImage: "",
    stickerTheme: journey.theme,
  };
}

export const benny: Detour = toDetour("benny");

export const collection: CollectionSticker[] = [
  { id: "benny", name: "Benny the Seal", place: "Circular Quay", theme: "harbour", tone: "blue", rotation: -2 },
  { id: "watcher", name: "The Watcher", place: "George St", theme: "heritage", tone: "yellow", rotation: 1.5 },
  { id: "bin-chicken-royalty", name: "Bin Chicken Royalty", place: "Hyde Park", theme: "nature", tone: "mint", rotation: -1 },
  { id: "lost-tile", name: "The Lost Tile", place: "QVB", theme: "heritage", tone: "orange", rotation: 2 },
  { id: "pocket-garden", name: "The Pocket Garden", place: "The Rocks", theme: "nature", tone: "pale", rotation: -1.5 },
  { id: "rainy-shortcut", name: "Rainy Shortcut", place: "Pitt St", theme: "oddity", tone: "pink", rotation: 1 },
  { id: "tiny-green-door", name: "Tiny Green Door", place: "Surry Hills", theme: "oddity", tone: "yellow", rotation: -2 },
  { id: "under-the-tracks", name: "Under the Tracks", place: "Redfern", theme: "heritage", tone: "blue", rotation: 1.5 },
];

export const detours: Detour[] = journeys.map((journey) => toDetour(journey.id));

export function getDetour(id: string | undefined) {
  const journey = getJourney(id);
  return detours.find((detour) => detour.id === journey.id) ?? benny;
}
