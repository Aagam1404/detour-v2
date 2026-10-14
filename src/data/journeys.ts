export type JourneyPath =
  | "turn-right"
  | "turn-left"
  | "straight"
  | "straight-to-water"
  | "follow-curve"
  | "approach-steps"
  | "approach-arch"
  | "approach-door"
  | "approach-object"
  | "cross-open-space"
  | "none";

export type JourneyStep = {
  heading: string;
  body: string;
  emphasis?: string;
  cta: string;
  hint?: string;
  /** Short name for the landmark this step walks you to. Shown on the step map. */
  goal?: string;
  path: JourneyPath;
};

export type Journey = {
  id: string;
  name: string;
  shortName: string;
  location: string;
  suburb: string;
  extraMinutes: number;
  distanceMeters: number;
  theme: "harbour" | "heritage" | "nature" | "oddity";
  teaser: string;
  mysteryPrompt: string;
  steps: JourneyStep[];
  recognition: {
    heading: string;
    choices: { id: string; label: string }[];
    correctChoiceId: string;
  };
  reveal: {
    eyebrow: string;
    heading: string;
    subtitle: string;
    story: string;
    supportingCopy: string;
    cta: string;
  };
};

export const journeys: Journey[] = [
  {
    id: "benny",
    name: "Benny the Seal",
    shortName: "Benny",
    location: "Circular Quay",
    suburb: "Sydney",
    extraMinutes: 4,
    distanceMeters: 180,
    theme: "harbour",
    teaser: "Someone unusually relaxed is hanging out by the water.",
    mysteryPrompt: "Meet Sydney's most relaxed local.",
    steps: [
      { heading: "Take the next right.", body: "For once, don't take your usual way.", cta: "I've turned →", goal: "The corner", path: "turn-right" },
      {
        heading: "Keep going towards the water.",
        body: "You'll know you're going the right way when the harbour opens up in front of you.",
        emphasis: "Phone down for this bit.",
        cta: "I can see the water →",
        goal: "The water", path: "straight-to-water",
      },
      {
        heading: "Look for the steps by the harbour.",
        body: "Not the ferry gates. Not the café.",
        emphasis: "The stone steps right beside the water.",
        cta: "Found the steps →",
        hint: "Get close enough to hear the water.",
        goal: "Stone steps", path: "approach-steps",
      },
      {
        heading: "Okay. Stop.",
        body: "Put your phone down and look around. Somewhere near those steps is a local who has absolutely nowhere to be.",
        emphasis: "Find him.",
        cta: "I found someone 👀",
        hint: "Look lower than you think.",
        path: "none",
      },
    ],
    recognition: {
      heading: "Who did you find?",
      choices: [
        { id: "ibis", label: "Ibis" },
        { id: "seal", label: "Seal" },
        { id: "dog", label: "Dog" },
      ],
      correctChoiceId: "seal",
    },
    reveal: {
      eyebrow: "THAT'S HIM.",
      heading: "You found Benny.",
      subtitle: "Sydney's most relaxed local.",
      story: "You found the waterfront regular everyone else was walking past.",
      supportingCopy: "You'll probably look for him every time you pass now.",
      cta: "Add to My Detours",
    },
  },
  {
    id: "watcher",
    name: "The Watcher",
    shortName: "The Watcher",
    location: "George Street",
    suburb: "Sydney",
    extraMinutes: 3,
    distanceMeters: 140,
    theme: "heritage",
    teaser: "Something above street level has been watching everyone rush past.",
    mysteryPrompt: "Find the face most people never look up to see.",
    steps: [
      { heading: "Cross at the next lights.", body: "Then stay on the older side of the street.", cta: "Across →", goal: "The lights", path: "straight" },
      {
        heading: "Follow the sandstone.",
        body: "Ignore the shop windows for a minute. Look at the buildings themselves.",
        emphasis: "Keep your eyes above the awnings.",
        cta: "I see the old façades →",
        goal: "Sandstone", path: "follow-curve",
      },
      {
        heading: "Find the arched doorway.",
        body: "You're looking for stonework, not a sign.",
        emphasis: "Stop when the doorway feels a little too decorative.",
        cta: "Found the arch →",
        hint: "Look just above eye level.",
        goal: "Arched doorway", path: "approach-arch",
      },
      {
        heading: "Now look up.",
        body: "There's a face hiding in the building.",
        emphasis: "Find the one staring back.",
        cta: "I found it 👀",
        hint: "Don't look at the door. Look above it.",
        path: "none",
      },
    ],
    recognition: {
      heading: "What expression did it have?",
      choices: [
        { id: "smiling", label: "Smiling" },
        { id: "serious", label: "Serious" },
        { id: "sleeping", label: "Sleeping" },
      ],
      correctChoiceId: "serious",
    },
    reveal: {
      eyebrow: "YOU LOOKED UP.",
      heading: "You found The Watcher.",
      subtitle: "George Street",
      story: "A tiny architectural detail turned an ordinary street into something worth looking at twice.",
      supportingCopy: "That doorway is going to be harder to ignore now.",
      cta: "Add to My Detours",
    },
  },
  {
    id: "tiny-green-door",
    name: "Tiny Green Door",
    shortName: "Green Door",
    location: "Surry Hills",
    suburb: "Surry Hills",
    extraMinutes: 5,
    distanceMeters: 220,
    theme: "oddity",
    teaser: "A doorway nearby looks like it belongs to a much smaller city.",
    mysteryPrompt: "Find the tiny green interruption hiding between terraces.",
    steps: [
      { heading: "Turn into the quieter street.", body: "Leave the traffic behind for a minute.", cta: "I'm off the main road →", goal: "Quiet street", path: "turn-left" },
      {
        heading: "Follow the terrace houses.",
        body: "Keep walking until the street starts feeling narrower.",
        emphasis: "Watch the ground floors, not the signs.",
        cta: "It's getting quieter →",
        goal: "Terraces", path: "straight",
      },
      {
        heading: "Look for a break in the row.",
        body: "One doorway is much smaller than everything around it.",
        emphasis: "And very green.",
        cta: "I see something green →",
        hint: "Look below the usual door handles.",
        goal: "The gap", path: "approach-door",
      },
      {
        heading: "Stop scrolling. Look properly.",
        body: "Find the smallest green door in the row.",
        emphasis: "That's your detour.",
        cta: "Found it",
        hint: "It looks almost toy-sized next to its neighbours.",
        path: "none",
      },
    ],
    recognition: {
      heading: "What colour was it?",
      choices: [
        { id: "red", label: "Red" },
        { id: "green", label: "Green" },
        { id: "blue", label: "Blue" },
      ],
      correctChoiceId: "green",
    },
    reveal: {
      eyebrow: "THERE IT IS.",
      heading: "You found the Tiny Green Door.",
      subtitle: "Surry Hills",
      story: "A tiny detail hidden in a familiar streetscape became the reason to take the side street.",
      supportingCopy: "You'll probably check every little doorway now.",
      cta: "Add to My Detours",
    },
  },
  {
    id: "bin-chicken-royalty",
    name: "Bin Chicken Royalty",
    shortName: "Bin Chicken",
    location: "Hyde Park",
    suburb: "Sydney",
    extraMinutes: 4,
    distanceMeters: 190,
    theme: "nature",
    teaser: "One very Sydney local is acting like the park belongs to them.",
    mysteryPrompt: "Find the bird with absolutely no respect for personal space.",
    steps: [
      {
        heading: "Cut through the park.",
        body: "Take the path under the trees instead of staying beside the road.",
        cta: "Into the park →",
        goal: "Park path", path: "follow-curve",
      },
      {
        heading: "Head towards the open lawn.",
        body: "Slow down a little. Watch what the birds are doing.",
        emphasis: "Don't look for a landmark yet.",
        cta: "I'm watching →",
        goal: "Open lawn", path: "cross-open-space",
      },
      {
        heading: "Find the boldest bird.",
        body: "The one walking around like it pays council rates.",
        cta: "I see a suspect →",
        hint: "Long beak. Zero shame.",
        goal: "The bold bird", path: "approach-object",
      },
      {
        heading: "Put the phone away.",
        body: "Watch it for a few seconds.",
        emphasis: "What is it actually doing?",
        cta: "Observed 👀",
        hint: "You're looking for an ibis.",
        path: "none",
      },
    ],
    recognition: {
      heading: "Which bird did you find?",
      choices: [
        { id: "pigeon", label: "Pigeon" },
        { id: "ibis", label: "Ibis" },
        { id: "duck", label: "Duck" },
      ],
      correctChoiceId: "ibis",
    },
    reveal: {
      eyebrow: "ROYALTY SPOTTED.",
      heading: "You found Bin Chicken Royalty.",
      subtitle: "Hyde Park",
      story: "A bird most commuters barely register suddenly became the main character of your walk.",
      supportingCopy: "Sydney wildlife: noticed.",
      cta: "Add to My Detours",
    },
  },
  {
    id: "under-the-tracks",
    name: "Under the Tracks",
    shortName: "Under the Tracks",
    location: "Redfern",
    suburb: "Redfern",
    extraMinutes: 6,
    distanceMeters: 260,
    theme: "heritage",
    teaser: "There's a little world hiding under the railway noise.",
    mysteryPrompt: "Follow the sound until the city changes overhead.",
    steps: [
      { heading: "Turn towards the tracks.", body: "Head towards the sound of the trains.", cta: "I can hear them →", goal: "The tracks", path: "turn-right" },
      {
        heading: "Keep the railway beside you.",
        body: "Walk until the space starts narrowing.",
        emphasis: "Listen for the sound changing.",
        cta: "The sound changed →",
        goal: "Narrow bit", path: "straight",
      },
      {
        heading: "Find the arch underneath.",
        body: "You're looking for the point where the tracks become a ceiling.",
        cta: "Found the arch →",
        hint: "Follow the darkest opening.",
        goal: "The arch", path: "approach-arch",
      },
      {
        heading: "Stop under the tracks.",
        body: "Look at the walls before you walk through.",
        emphasis: "Find the detail most people rush past.",
        cta: "Found something",
        hint: "Look for colour against the brick.",
        path: "none",
      },
    ],
    recognition: {
      heading: "What stood out on the wall?",
      choices: [
        { id: "colour", label: "Colour" },
        { id: "mirror", label: "A mirror" },
        { id: "clock", label: "A clock" },
      ],
      correctChoiceId: "colour",
    },
    reveal: {
      eyebrow: "UNDERNEATH FOUND.",
      heading: "You found Under the Tracks.",
      subtitle: "Redfern",
      story: "The railway stopped being something above you and became a place you actually noticed.",
      supportingCopy: "Next train sound might feel a little different.",
      cta: "Add to My Detours",
    },
  },
  {
    id: "rainy-shortcut",
    name: "Rainy Shortcut",
    shortName: "Rainy Shortcut",
    location: "Pitt Street",
    suburb: "Sydney",
    extraMinutes: 3,
    distanceMeters: 150,
    theme: "oddity",
    teaser: "There's a shortcut nearby that's better when the weather turns.",
    mysteryPrompt: "Find the passage that lets the city keep moving without getting soaked.",
    steps: [
      { heading: "Duck off the main street.", body: "Take the covered way instead.", cta: "Under cover →", goal: "Side street", path: "turn-left" },
      {
        heading: "Follow the ceiling.",
        body: "Keep going while the street disappears beside you.",
        emphasis: "Notice how the sound changes.",
        cta: "It's quieter here →",
        goal: "Covered way", path: "straight",
      },
      {
        heading: "Look for the bend.",
        body: "The passage turns before it gives you back to the street.",
        cta: "Found the bend →",
        hint: "Follow the light at the end, then stop before you reach it.",
        goal: "The bend", path: "follow-curve",
      },
      {
        heading: "Pause here.",
        body: "Listen to the city from under cover.",
        emphasis: "What's the loudest thing you can hear?",
        cta: "I listened",
        hint: "It might not be traffic.",
        path: "none",
      },
    ],
    recognition: {
      heading: "What changed most in the passage?",
      choices: [
        { id: "sound", label: "The sound" },
        { id: "temperature", label: "The temperature" },
        { id: "colour", label: "The colour" },
      ],
      correctChoiceId: "sound",
    },
    reveal: {
      eyebrow: "SHORTCUT SAVED.",
      heading: "You found the Rainy Shortcut.",
      subtitle: "Pitt Street",
      story: "A functional passage became a little piece of city knowledge you can use again later.",
      supportingCopy: "Future rainy-day you says thanks.",
      cta: "Add to My Detours",
    },
  },
  {
    id: "lost-tile",
    name: "The Lost Tile",
    shortName: "Lost Tile",
    location: "QVB",
    suburb: "Sydney",
    extraMinutes: 4,
    distanceMeters: 170,
    theme: "heritage",
    teaser: "One tiny floor detail is trying very hard not to be noticed.",
    mysteryPrompt: "Find the tile that breaks the pattern.",
    steps: [
      { heading: "Head inside.", body: "Leave the street noise behind.", cta: "I'm inside →", goal: "Entrance", path: "straight" },
      {
        heading: "Follow the patterned floor.",
        body: "For this one, your destination is below eye level.",
        emphasis: "Walk slower than everyone else.",
        cta: "I'm looking down →",
        goal: "Patterned floor", path: "straight",
      },
      {
        heading: "Find where the pattern changes.",
        body: "One little section doesn't quite behave like its neighbours.",
        cta: "Something looks different →",
        hint: "Look for a shape that interrupts the repeat.",
        goal: "The odd tile", path: "approach-object",
      },
      {
        heading: "Stop walking.",
        body: "Compare the tile with the ones around it.",
        emphasis: "Spot the odd one out.",
        cta: "Found the odd one",
        hint: "Focus on the border, not the centre.",
        path: "none",
      },
    ],
    recognition: {
      heading: "What was different?",
      choices: [
        { id: "border", label: "The border" },
        { id: "size", label: "The size" },
        { id: "shine", label: "The shine" },
      ],
      correctChoiceId: "border",
    },
    reveal: {
      eyebrow: "PATTERN BROKEN.",
      heading: "You found The Lost Tile.",
      subtitle: "QVB",
      story: "A floor you would normally walk straight across became something worth stopping for.",
      supportingCopy: "Good luck not inspecting tiles everywhere now.",
      cta: "Add to My Detours",
    },
  },
  {
    id: "pocket-garden",
    name: "The Pocket Garden",
    shortName: "Pocket Garden",
    location: "The Rocks",
    suburb: "The Rocks",
    extraMinutes: 6,
    distanceMeters: 240,
    theme: "nature",
    teaser: "There's a tiny patch of green hiding behind all that sandstone.",
    mysteryPrompt: "Find the little garden the main street forgot.",
    steps: [
      { heading: "Take the narrow lane.", body: "Choose the quieter way between the buildings.", cta: "Into the lane →", goal: "Narrow lane", path: "turn-right" },
      {
        heading: "Follow the sandstone walls.",
        body: "Keep going until you start seeing more plants than signs.",
        emphasis: "Let the green guide you.",
        cta: "I can see plants →",
        goal: "Sandstone wall", path: "follow-curve",
      },
      {
        heading: "Find the tiny courtyard.",
        body: "It should feel like you've accidentally stepped into someone's backyard.",
        cta: "Found the courtyard →",
        hint: "Listen for the street getting quieter behind you.",
        goal: "Courtyard", path: "approach-object",
      },
      {
        heading: "Stay here for a second.",
        body: "Look around before taking a photo.",
        emphasis: "Find the smallest plant growing somewhere unexpected.",
        cta: "Found one 🌿",
        hint: "Check the edges, cracks and corners.",
        path: "none",
      },
    ],
    recognition: {
      heading: "Where was your tiny plant growing?",
      choices: [
        { id: "crack", label: "In a crack" },
        { id: "pot", label: "In a pot" },
        { id: "tree", label: "On a tree" },
      ],
      correctChoiceId: "crack",
    },
    reveal: {
      eyebrow: "LITTLE GREEN WORLD.",
      heading: "You found The Pocket Garden.",
      subtitle: "The Rocks",
      story: "A few quiet metres away from the main path, the city suddenly felt smaller and softer.",
      supportingCopy: "One more place to disappear for five minutes.",
      cta: "Add to My Detours",
    },
  },
];

const aliases: Record<string, string> = {
  tracks: "under-the-tracks",
  tile: "lost-tile",
  door: "tiny-green-door",
  rainy: "rainy-shortcut",
  "bin-chicken": "bin-chicken-royalty",
};

export function getJourney(id: string | undefined) {
  const key = id ? (aliases[id] ?? id) : "benny";
  return journeys.find((journey) => journey.id === key) ?? journeys[0];
}
