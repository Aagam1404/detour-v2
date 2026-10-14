import { toCollect } from "@/data/toCollect";

export type Prize =
  | { id: string; kind: "coins"; amount: number }
  | { id: string; kind: "miss"; line: string };

export type OfferKind = "opal" | "coffee" | "gift";

export type Offer = {
  id: string;
  kind: OfferKind;
  title: string;
  place: string;
  cost: number;
  tone: "yellow" | "orange" | "pink" | "blue" | "mint";
};

export const offers: Offer[] = [
  { id: "coffee-1", kind: "coffee", title: "$1 off a coffee", place: "Pitt St Espresso", cost: 15, tone: "orange" },
  { id: "gift-biscuit", kind: "gift", title: "A free biscuit", place: "The bakery, QVB", cost: 20, tone: "pink" },
  { id: "coffee-2", kind: "coffee", title: "$2 off a flat white", place: "Harbour Coffee, Circular Quay", cost: 25, tone: "orange" },
  { id: "opal-2", kind: "opal", title: "$2 Opal credit", place: "Added to your Opal card", cost: 30, tone: "yellow" },
  { id: "gift-gallery", kind: "gift", title: "Gallery pass", place: "Art Gallery of NSW", cost: 60, tone: "blue" },
  { id: "opal-5", kind: "opal", title: "$5 Opal credit", place: "Added to your Opal card", cost: 70, tone: "yellow" },
];

export const TOTAL_STAMPS = toCollect.length;

export function stampMeta(id: string) {
  return toCollect.find((stamp) => stamp.id === id);
}

function shuffle<T>(list: T[]) {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

const missLines = ["Bad luck", "Bad luck", "So close", "Not this one"];

/** Nine face-down cards: five hide coins, four are bad luck. Stamps are never in the deck. */
export function buildDeck(): Prize[] {
  const coinPool = [5, 10, 15, 25, 40];
  const cards: Prize[] = [
    ...coinPool.map((amount, index): Prize => ({ id: `c${index}`, kind: "coins", amount })),
    ...missLines.map((line, index): Prize => ({ id: `m${index}`, kind: "miss", line })),
  ];
  return shuffle(cards);
}

export type TicketCode = string;

export function newCode(): TicketCode {
  return `DTR-${Math.floor(1000 + Math.random() * 9000)}`;
}

export function levelFor(detours: number) {
  const levels = [
    { name: "Newcomer", at: 0 },
    { name: "Wanderer", at: 1 },
    { name: "Explorer", at: 3 },
    { name: "Local", at: 6 },
  ];
  let index = 0;
  levels.forEach((level, i) => {
    if (detours >= level.at) index = i;
  });
  const next = levels[index + 1] ?? null;
  return {
    name: levels[index].name,
    next: next?.name ?? null,
    remaining: next ? next.at - detours : 0,
    progress: next ? (detours - levels[index].at) / (next.at - levels[index].at) : 1,
  };
}
