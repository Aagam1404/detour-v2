# DETOUR Design System and Prototype Specification

> **Status note.** Sections 1 to 20 are the original v1 spec and are kept as the design record. Version 2 changed the detour flow (see section 21 at the end). Screens 6 to 9 (Walking, Observation, Discovery, Sticker unlocked) were replaced by the single guide flow in `src/screens/detour/BennyGuide.tsx`, and the file paths in section 17 are historical. The current folder layout is in [ARCHITECTURE.md](./ARCHITECTURE.md).

**Project:** DETOUR  
**Source of truth:** Figma file `AID-Detour`  
**Figma reference:** https://www.figma.com/design/pwJzJr5dvlU49YhZXyiMXu/AID-Detour?node-id=128-7  
**Prototype target:** React + Vite + TypeScript  
**Reference mobile frame:** 375 × 812 px

---

## 1. Product idea

DETOUR helps newcomers to Sydney discover the city through tiny side quests that sit just outside their everyday commute.

The core experience is:

**usual commute → nearby detour → short walk → notice something real → discover its story → collect a sticker → return to commute**

The product should feel like:

- a playful pocket city guide
- a collectible sticker book
- a very light urban exploration game
- a companion to the commute, not a replacement for it

The app should **not** feel like:

- a navigation app or a turn-by-turn map
- a tourist attraction directory
- a rewards marketplace
- a social feed
- a hardcore gamified app

### Core interaction principle

> **The app points. The city provides the content.**

The interface should spend as little time as possible competing with the physical environment.

---

# 2. Prototype scope

Build one polished golden path first.

### Required flow

1. Splash
2. Onboarding 1
3. Onboarding 2
4. Onboarding 3
5. Home / commute map
6. Detour detail
7. Walking / navigation
8. Observation challenge
9. Discovery reveal
10. Sticker unlocked
11. My Sydney / sticker collection
12. Back to commute / payoff

Do not build additional product systems until this flow feels complete.

This prototype is a visual dummy, not a working product. Detours, stories, minutes, rewards, and stickers are made-up data. The only thing that has to behave for real is the home map: it must pan and zoom in every direction.

### Fake these systems for the prototype

Do not implement real:

- GPS or “you are here” tracking
- turn-by-turn navigation
- live detours, places, or opening hours
- camera recognition
- Opal integration
- reward APIs
- authentication
- database
- weather API
- location history
- notifications

The home screen is a full-screen map of central Sydney plus the bottom nav. Coins are dummy markers scattered on that map. Tapping a coin plays a short scripted detour. Nothing else on that screen.

Version 2: the map is an illustrated SVG Sydney in the app style (see section 21). It does not use Google Maps or any map SDK.

---

# 3. Design language

DETOUR uses a playful neo-brutalist visual language.

### Characteristics

- warm off-white backgrounds
- black or near-black typography
- 2 px black outlines
- flat colour blocks
- rounded cards
- hard offset shadows with no blur
- expressive illustrated stickers
- simplified graphic maps
- strong typography hierarchy
- generous whitespace
- occasional cheeky microcopy

The product should look designed, but not polished into a generic SaaS app.

---

# 4. Design tokens

Create `src/styles/tokens.css`.

```css
:root {
  /* Core colours */
  --color-bg: #FFFDF8;
  --color-surface: #FFFFFF;
  --color-ink: #171717;
  --color-ink-strong: #1E1E1E;
  --color-muted: #888888;

  --color-yellow: #FFD75A;
  --color-blue: #73A5FF;
  --color-orange: #FF7543;
  --color-pink: #F5AFCE;
  --color-mint: #60D6BF;

  --color-soft-mint: #E8F5F0;
  --color-red: #E5423E;
  --color-deep-blue: #275DBF;

  /* Semantic colours */
  --color-background: var(--color-bg);
  --color-text: var(--color-ink);
  --color-border: var(--color-ink);

  --color-detour-active: var(--color-yellow);
  --color-route-default: var(--color-ink);
  --color-route-explored: var(--color-blue);

  --color-sticker-harbour: var(--color-blue);
  --color-sticker-heritage: var(--color-orange);
  --color-sticker-nature: var(--color-mint);
  --color-sticker-oddity: var(--color-pink);

  /* Typography */
  --font-display: "Montserrat", sans-serif;
  --font-body: "DM Sans", sans-serif;

  --text-xs: 11px;
  --text-sm: 12px;
  --text-md: 15px;
  --text-lg: 17px;
  --text-xl: 21px;
  --text-2xl: 27px;
  --text-3xl: 36px;
  --text-display: 44px;

  --leading-xs: 16px;
  --leading-sm: 18px;
  --leading-md: 20px;
  --leading-lg: 24px;
  --leading-xl: 28px;
  --leading-2xl: 32px;
  --leading-3xl: 40px;
  --leading-display: 54px;

  /* Spacing */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 32px;
  --space-7: 48px;

  /* Radius */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-pill: 999px;

  /* Border */
  --border-width: 2px;
  --border-default: var(--border-width) solid var(--color-border);
  --border-subtle: 1px solid #E3DED3;

  /* Shadows */
  --shadow-sm: 2px 2px 0 var(--color-ink);
  --shadow-md: 3px 3px 0 var(--color-ink);
  --shadow-lg: 4px 4px 0 var(--color-ink);

  /* Controls */
  --icon-sm: 18px;
  --icon-md: 22px;
  --icon-lg: 24px;

  --control-md: 40px;
  --control-lg: 52px;
  --control-xl: 60px;

  --button-height: 52px;

  /* Screen */
  --screen-width: 375px;
  --screen-height-reference: 812px;
  --screen-padding: 20px;

  /* Bottom navigation */
  --bottom-nav-height: 81px;
  --bottom-nav-icon-box: 40px;

  /* Stickers */
  --sticker-sm: 64px;
  --sticker-md: 80px;
  --sticker-lg: 120px;
}
```

---

# 5. Typography roles

Create these reusable classes or equivalent React typography components.

```css
.heading-display {
  font-family: var(--font-display);
  font-size: var(--text-display);
  line-height: var(--leading-display);
  font-weight: 800;
}

.heading-1 {
  font-family: var(--font-display);
  font-size: var(--text-3xl);
  line-height: var(--leading-3xl);
  font-weight: 800;
}

.heading-2 {
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  line-height: var(--leading-2xl);
  font-weight: 800;
}

.heading-3 {
  font-family: var(--font-display);
  font-size: var(--text-xl);
  line-height: var(--leading-xl);
  font-weight: 700;
}

.body {
  font-family: var(--font-body);
  font-size: var(--text-md);
  line-height: var(--leading-lg);
  font-weight: 400;
}

.body-small {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  line-height: var(--leading-sm);
  font-weight: 400;
}

.label {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  line-height: var(--leading-xs);
  font-weight: 700;
}
```

### Typography rules

- Use Montserrat for display and headings.
- Use DM Sans for body copy, labels, buttons and navigation.
- Avoid introducing new fonts.
- Avoid font sizes outside the token scale unless a Figma screen clearly requires one.
- Keep headings compact and confident.
- Body copy should remain readable and conversational.

---

# 6. Base layout

Create a reusable `ScreenShell` component.

### ScreenShell responsibilities

- full viewport height
- centred mobile canvas on desktop
- warm cream background
- maximum content width of 375 px
- horizontal page padding of 20 px
- optional bottom navigation spacing
- safe vertical overflow on smaller devices

```css
.screen-shell {
  min-height: 100dvh;
  width: 100%;
  max-width: var(--screen-width);
  margin: 0 auto;
  background: var(--color-background);
  color: var(--color-text);
  position: relative;
}

.screen-content {
  padding-inline: var(--screen-padding);
}
```

### Responsive rule

The prototype should feel native at roughly 375 px width, but remain usable from approximately 320 to 430 px.

Do not stretch cards into desktop layouts.

---

# 7. Component system

Create these components before building all screens.

```text
src/components/
  Button.tsx
  Card.tsx
  Chip.tsx
  Header.tsx
  BottomNav.tsx
  Sticker.tsx
  DetourMarker.tsx
  MapRoute.tsx
  ScreenShell.tsx
```

## 7.1 Button

### Variants

- `primary`
- `secondary`
- `ghost`
- `icon`

### Sizes

- `md`
- `lg`

### Base dimensions

- primary CTA height: 52 px
- icon button: 40, 52 or 60 px depending on use
- horizontal padding: 16 px minimum

### Primary button

```css
.button-primary {
  min-height: var(--button-height);
  padding-inline: var(--space-4);
  background: var(--color-yellow);
  color: var(--color-ink);
  border: var(--border-default);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
  font-family: var(--font-body);
  font-size: var(--text-md);
  font-weight: 700;
}
```

### Secondary button

```css
.button-secondary {
  min-height: var(--button-height);
  padding-inline: var(--space-4);
  background: var(--color-background);
  color: var(--color-ink);
  border: var(--border-default);
  border-radius: var(--radius-md);
  font-family: var(--font-body);
  font-size: var(--text-md);
  font-weight: 700;
}
```

### Interaction

Pressed state:

```css
transform: translate(2px, 2px);
box-shadow: var(--shadow-sm);
```

Do not add gradients.

## 7.2 Card

### Variants

- `default`
- `highlight`
- `reward`
- `story`

```css
.card {
  background: var(--color-surface);
  border: var(--border-default);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  padding: var(--space-4);
}
```

Use yellow fill when a card represents a currently available detour.

## 7.3 Chip

Use for:

- `+4 min`
- neighbourhood
- status
- distance
- category

```css
.chip {
  min-height: 36px;
  padding-inline: var(--space-3);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: var(--border-default);
  border-radius: var(--radius-pill);
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: 700;
}
```

Variants:

- `default`
- `active`
- `filled`
- `muted`

Active detour chips use yellow.

## 7.4 Header

```ts
type HeaderProps = {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  action?: React.ReactNode;
};
```

Rules:

- Page title aligns left.
- Use generous top spacing.
- Never centre standard app screen headers.
- Onboarding is allowed to centre content.

## 7.5 BottomNav

Items:

- Map
- Stickers
- Rewards
- Me

Each item contains:

- 40 × 40 icon container
- 22 px icon
- small label
- selected state

Selected state uses yellow for the icon container.

Do not add a fifth Search tab.

## 7.6 Sticker

```ts
type StickerProps = {
  id: string;
  name: string;
  place: string;
  image: string;
  theme: "harbour" | "heritage" | "nature" | "oddity";
  size?: "sm" | "md" | "lg";
  locked?: boolean;
  rotation?: number;
};
```

Sizes:

- small: 64 px
- medium: 80 px
- large: 120 px

Visual treatment:

- irregular die-cut shape where possible
- thick outline
- limited palette
- slightly imperfect handmade feeling
- no photorealistic badge styling
- may rotate by approximately -3 to +3 degrees in collection layouts

Locked sticker:

- use silhouette or simplified obscured artwork
- label as `???`

## 7.7 DetourMarker

States:

- `available`
- `selected`
- `completed`
- `locked`

Available:

- sticker silhouette or partial illustration
- small minute label
- subtle yellow highlight

Selected:

- larger marker
- stronger border
- small bounce or scale animation allowed

Completed:

- full sticker artwork
- coloured explored branch visible on map

Avoid generic Google Maps pins.

## 7.8 Map

The home map is a real map, full screen, with only the bottom nav over it. It starts on central Sydney and can be dragged and zoomed on both axes. Coins are the only markers. They are placed randomly around the CBD and open dummy detours.

Walking and return screens can keep the simple route drawing.

Visual logic for that drawing:

- normal commute = thick black path
- optional detour = yellow dotted branch
- completed detour = coloured solid branch
- user position = simple outlined dot
- destination = simple label or icon

Rules:

- home map stays visually quiet: no extra controls, no greeting, no second call to action
- coins are the supplied coin image, not default map pins
- detour names and copy can be invented
- the commute drawing, where it appears, should still read first

---

# 8. Sticker themes

```ts
export const stickerThemes = {
  harbour: {
    color: "var(--color-blue)",
  },
  heritage: {
    color: "var(--color-orange)",
  },
  nature: {
    color: "var(--color-mint)",
  },
  oddity: {
    color: "var(--color-pink)",
  },
};
```

Examples:

- Benny the Seal → harbour
- The Watcher → heritage
- Tiny Green Door → oddity
- Rainy Shortcut → oddity
- Hidden Garden → nature
- Bin Chicken Royalty → nature or oddity

---

# 9. Content data model

Keep detour content separate from screen components.

Create `src/data/detours.ts`.

```ts
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
  story: string;
  stickerImage: string;
  stickerTheme: "harbour" | "heritage" | "nature" | "oddity";
  reward?: {
    type: "coffee" | "opal" | "museum" | "local";
    label: string;
  };
};

export const detours: Detour[] = [
  {
    id: "benny",
    name: "Benny the Seal",
    shortName: "Benny",
    location: "Circular Quay",
    suburb: "Sydney",
    extraMinutes: 4,
    distanceMeters: 180,
    teaser: "Meet Sydney's most relaxed local.",
    mission: "Find the local who spends most of his day lying beside the harbour.",
    hint: "Check the steps near the water.",
    story:
      "You found Benny. Sydney's unofficial waterfront resident is usually doing exactly what you found him doing: absolutely nothing.",
    stickerImage: "/assets/stickers/benny.svg",
    stickerTheme: "harbour",
    reward: {
      type: "coffee",
      label: "$2 coffee nearby",
    },
  },
];
```

---

# 10. Golden path screen specifications

## Screen 0: Splash

Copy:

**DETOUR**

Optional line:

**Take the long way. Just a little.**

Layout:

- centred logo
- large colour block or minimal route graphic
- no CTA
- auto-advance

## Screen 1: Onboarding 1

### Copy

**You move to a new city.**

At first, everything feels new.

Then a few weeks pass.

You learn the same train, the same exit, the same walk to class.

And suddenly, the city gets smaller.

### CTA

**Keep going**

### Visual

One character following one simple route through the city.

Everything outside the route is faint or secondary.

## Screen 2: Onboarding 2

### Copy

**But what if you stepped off that path?**

A tiny detour could lead you to a hidden doorway, a strange carving, a quiet lane, or even a seal by the water.

Nothing big.

Just one small thing you would have missed otherwise.

### CTA

**Take a detour**

### Visual

The original straight route bends toward several colourful discoveries.

Small labels:

- `+2 min`
- `+4 min`
- `+6 min`

## Screen 3: Onboarding 3

### Copy

**Then you do it again.**

One discovery becomes two.

Two become ten.

And slowly, the city stops feeling like a route you pass through.

It starts feeling like a place you know.

Every detour leaves you with a little sticker to remember it by.

### CTA

**Start Detouring →**

### Optional footer

**We’ll still get you to class.**

### Visual

Collection of several Sydney stickers forming around the character.

## Screen 4: Home / commute map

### Header

**Hey Annie 👋**

### Main copy

**Got 4 minutes?**

Someone is sunbathing just off your usual route.

### Chip

`+4 min`

### Primary CTA

**Go have a look**

### Secondary CTA

**Nah, take me to class**

### Visual

- usual route in black
- mystery Benny marker just off route
- optional dotted yellow branch
- do not show the final Benny sticker yet

## Screen 5: Detour detail

### Eyebrow

**TODAY’S DETOUR**

### Heading

**Meet Sydney’s most relaxed local.**

### Copy

He doesn’t pay rent.

He still has waterfront property.

And he’s only 4 minutes away.

### Mission

**Your tiny mission**

Find the local who spends most of his day lying beside the harbour.

### Reward preview

**Mystery sticker**

Optional secondary reward:

**$2 coffee nearby**

### CTA

**I’m curious**

### Secondary CTA

**Maybe next time**

### Visual

Use silhouette, crop or obscured version of Benny.

Do not reveal the final sticker.

## Screen 6: Walking

### Eyebrow

**4 MIN DETOUR**

### Heading

**Okay, wander this way.**

### Distance

`180 m`

### Copy

You’re barely off course.

Enjoy it.

### CTA

**I’m here**

### Secondary

**Need a hint?**

Hint:

**Follow the water. He usually gets the best seat.**

## Screen 7: Observation challenge

### Heading

**WAIT.**

### Copy

Put the phone down for a second.

**Look around.**

Someone nearby is much better at relaxing than you are.

Can you find him?

### CTA

**I see him 👀**

### Secondary

**One more clue**

Hint:

**Check the steps near the water.**

### Visual

Use a photo or illustrated waterfront environment.

The UI should become quieter here.

## Screen 8: Discovery reveal

### Eyebrow

**THERE HE IS.**

### Heading

**You found Benny.**

### Copy

Sydney’s unofficial waterfront resident.

Benny is usually doing exactly what you found him doing:

**absolutely nothing.**

### CTA

**Meet the sticker**

### Visual

Reveal Benny clearly.

## Screen 9: Sticker unlocked

### Eyebrow

**ONE FOR THE BOOK.**

### Heading

**Benny the Seal**

### Location

**Circular Quay**

### Copy

You’ll probably look for him every time you walk past now.

### Optional reward

**Also, $2 off coffee nearby**

### Primary CTA

**Stick him in My Sydney**

### Secondary CTA

**Back to my day**

### Visual

Large Benny sticker.

Avoid confetti, streaks and XP language.

## Screen 10: My Sydney / sticker collection

### Heading

**My Detours**

### Subtitle

**The bits you actually noticed.**

### Stats

- `14 Finds`
- `6 suburbs`
- `43 min wandering`

### Stickers

Examples:

- The Watcher
- Bin Chicken Royalty
- Tiny Green Door
- Under the Tracks
- Rainy Shortcut
- The Lost Tile
- Benny the Seal

### Supporting copy

**Turns out you’ve been paying attention.**

### Layout

Use a loose 2-column sticker layout.

Avoid making the collection feel like a rigid ecommerce grid.

Allow subtle rotation and varied visual scale.

## Screen 11: Back to commute / payoff

### Heading

**Back to reality.**

### Copy

UTS is still 14 minutes away.

But now you know who lives by the harbour.

### Supporting line

**One little piece of Sydney, unlocked.**

### CTA

**Take me to class**

### Secondary

**See My Sydney**

### Visual

Return to the home map.

The original route is still present, but now Benny’s completed branch remains visible in colour.

This screen should communicate:

**same commute, larger mental map**

---

# 11. Navigation

Primary app navigation:

- Map
- Stickers
- Rewards
- Me

Do not add Search to the primary navigation.

The prototype can implement only Map and Stickers as fully functional screens.

Rewards and Me can be non-functional placeholders if needed.

---

# 12. Motion

Use motion sparingly.

Good places for animation:

- onboarding route line drawing
- detour marker appearing
- dotted route drawing toward detour
- selected marker scale from 1 to approximately 1.05
- sticker reveal
- sticker dropping into collection
- completed detour branch appearing on return map

Motion rules:

- use approximately 180 to 350 ms for normal UI transitions
- use approximately 450 to 700 ms for sticker reveal moments
- prefer ease-out
- no bouncy spring effects everywhere
- no excessive page transitions

Motion should clarify progress, not turn the product into a game.

---

# 13. Interaction rules

### Low pressure

The user must always be able to skip a detour.

Use language like:

- **Maybe next time**
- **Straight to class**
- **Back to my day**

Avoid guilt language.

### Observation before reward

Do not unlock a sticker simply because the user reached the GPS location.

The prototype should simulate one observation interaction before success.

### Stickers are the primary reward

Real-world perks are secondary.

The hierarchy should always be:

**curiosity → noticing → story → sticker → optional perk**

Not:

**discount → task → reward**

---

# 14. Voice and microcopy

DETOUR should sound like a friend who knows Sydney strangely well.

### Tone

- short
- warm
- slightly cheeky
- curious
- conversational
- never corporate
- never overly cute

### Examples

Instead of:

> You have arrived at your destination.

Use:

> **Okay. Stop here.**

Instead of:

> Navigation completed.

Use:

> **Nice. Back to your actual life.**

Instead of:

> Detour requires five minutes.

Use:

> **This’ll cost you about 5 minutes.**

Instead of:

> No nearby activities available.

Use:

> **Nothing worth getting distracted by right now.**

Instead of:

> Cancel mission?

Use:

> **Changed your mind? Fair.**

---

# 15. Accessibility and usability

Even though this is a prototype:

- minimum interactive target: approximately 44 × 44 px
- body text should not go below 12 px
- do not rely only on colour for status
- all major CTAs should have clear text labels
- maintain strong text/background contrast
- avoid excessive tiny map labels
- observation challenge must have a manual confirmation path
- stickers need accessible text labels

---

# 16. Asset rules

Use actual exported Figma assets for:

- stickers
- custom illustrations
- brand marks
- maps if already final
- bespoke iconography

Do not redraw final sticker artwork in CSS.

Keep assets organised:

```text
src/assets/
  brand/
  icons/
  illustrations/
  maps/
  stickers/
```

Preferred formats:

- SVG for stickers, icons and line illustrations
- PNG/WebP for raster images or photography

---

# 17. Suggested code structure

```text
src/
  assets/
    brand/
    icons/
    illustrations/
    maps/
    stickers/

  components/
    BottomNav.tsx
    Button.tsx
    Card.tsx
    Chip.tsx
    DetourMarker.tsx
    Header.tsx
    MapRoute.tsx
    ScreenShell.tsx
    Sticker.tsx

  data/
    detours.ts

  screens/
    Splash.tsx
    OnboardingOne.tsx
    OnboardingTwo.tsx
    OnboardingThree.tsx
    Home.tsx
    DetourDetail.tsx
    Walking.tsx
    Observation.tsx
    Discovery.tsx
    StickerUnlocked.tsx
    MySydney.tsx
    BackToCommute.tsx

  styles/
    tokens.css
    global.css

  App.tsx
  main.tsx
```

---

# 18. Build order

Do not build everything at once.

### Checkpoint 1

Set up:

- React
- Vite
- TypeScript
- routing
- fonts
- `tokens.css`
- `global.css`

### Checkpoint 2

Build reusable components:

- Button
- Card
- Chip
- Header
- ScreenShell
- BottomNav

### Checkpoint 3

Build:

- Sticker
- DetourMarker
- MapRoute

### Checkpoint 4

Build all 3 onboarding screens.

### Checkpoint 5

Build Home and Detour Detail.

### Checkpoint 6

Build Walking and Observation.

### Checkpoint 7

Build Discovery and Sticker Unlocked.

### Checkpoint 8

Build My Sydney and Back to Commute.

### Checkpoint 9

Add motion and polish.

### Checkpoint 10

Compare every screen against Figma and fix visual mismatches.

Commit after each stable checkpoint.

---

# 19. Implementation rules for Cursor

1. **Do not invent new visual styles.**
2. Use this file and the Figma file as the design source of truth.
3. Use shared tokens instead of hardcoded colours, spacing, radii or shadows.
4. Build reusable components before duplicating markup.
5. Keep the UI mobile-first.
6. Do not add features that are not part of the golden path.
7. Do not install large libraries unless clearly necessary.
8. The home map is an illustrated SVG map (version 2). No map SDK. Detours stay dummy data.
9. Walking and return maps can stay simple SVG drawings.
10. Do not add authentication or persistence.
11. Keep content in `data/detours.ts`, not embedded throughout screens.
12. Use actual exported Figma assets when provided.
13. Prefer CSS transitions for simple motion.
14. Keep the product low pressure and story-led.
15. The most important interaction is the observation challenge.
16. The most important long-term payoff is the sticker collection.
17. The reward system must stay visually secondary.
18. The app should be understandable without verbal explanation from the designer.

---

# 20. Definition of done

The prototype is ready when a test participant can move through:

**onboarding → commute → detour → observation → story → sticker → collection → return**

and understand:

1. why Detour exists
2. why they would take a detour
3. that they have to notice something in the real world
4. that stickers are a record of what they discovered
5. that the commute itself remains intact
6. that repeated detours gradually make the city feel more familiar

The coded prototype should visually match the Figma system closely enough that Figma and browser views feel like the same product.

---

# 21. Version 2 changes (rewards rework)

These changes replace the "sticker is the primary reward" rule in sections 13 and 19.

- **Stamp and mystery cards.** The stamp is guaranteed: it is added the moment the reveal screen shows (a "Stamp collected" badge). Then the user picks 3 of 9 face-down cards (`/detour/:id/prizes`). Five cards hide coins (5, 10, 15, 25, 40) and four are "bad luck, try again", so a pick can pay nothing. Stamps are never inside the cards.
- **Coins** are the spendable currency. They redeem Opal credit, coffee and gifts on the Rewards screen (`src/data/wallet.ts`, `offers`). Redeeming asks for a confirmation and shows a ticket code.
- **Stamps** are keepsakes only, one per finished detour. They live in the Stamps tab (was Stickers) and on Me. Un-found stamps show as locked cards.
- **Wallet state** (coins, stamps, tickets, history) lives in `PrototypeState` and is saved per username in `localStorage`. New accounts start at 0.
- **Detour flow.** Every step shows a close button (with a "Changed your mind? Fair." sheet), a segmented progress bar and minutes left. Hints open as a card. The noticing question uses labelled options, marks a wrong answer, and offers "Can't find it? Back to my route" after two misses.
- **Changing the route.** The route chip on the map is now a button (it shows "Change"). It opens a bottom sheet to switch mode, swap direction (for the trip home) or change stops. Back to Commute also has a "Different route today? Change it" link, and the commute screen has "Keep my current route" to back out. The commute is saved with the wallet per username.
- **Illustrated map.** The Google and Leaflet map is gone. The home map is a hand-drawn SVG of central Sydney in the app style: cream land, soft blue harbour with a 2px ink coastline and wave texture, mint parks with ink outlines, white streets, dashed rail lines, uppercase suburb labels. Your commute is drawn as a bold ink line with a white halo and Home and destination tags. Detour coins sit at their real suburbs with name tags, and found ones turn grey with a green tick. It pans, pinches and zooms with +, - and re-centre buttons. No API key or env var is needed.
- **Step maps.** Usability testing found the arrows after accepting a detour unclear. Each guide step now shows a small illustrated map (same style as the home map) instead of a bare arrow: you are the dot at the bottom with a pulsing ring, the route is a bold ink line with a moving yellow dash and a big yellow arrow head, the landmark you are heading for has a yellow tag ("The corner", "Stone steps"), a yellow chip says what to do ("Turn right", "Go straight", "Bear right", "Almost there"), a white chip gives the rough distance, and a "Next:" line under the text says what comes after. Maps are in `src/components/map/StepMap.tsx`. The landmark name is the `goal` field on each step in `src/data/journeys.ts`. The last "stop and look" step keeps the quiet eye.
- **Animated splash.** The splash is no longer static. The two yellow arrows draw themselves along their paths over about 1.7 seconds (the second one starts a beat later), the arrow heads pop in, then DETOUR fades in while its letter spacing settles. The screen then fades out and goes to log in. Tap to skip. The splash now opens first on every fresh load, including deep links.
- **Travel mode moved.** The commute screen now only asks for home and destination. How you travel is chosen on the detour list (chips: Walk, Train, Bus, E-bike, Ferry, Metro) and can also be changed from the route chip on the map. Walk is new. Each detour card shows the extra minutes for the chosen mode in a bubble, and a "Time added, by how you travel" row of pills lists every mode that detour works with, with the chosen one highlighted. The accept screen shows the same row. A detour adds its base walking time plus the cost of getting off and back on (walk +0, e-bike +1, metro +2, bus +3, train +3, ferry +6). The default mode is train until the person picks one.
- **Visual weight.** Hard shadows now only sit on primary buttons, balance and the card backs. List rows use hairlines, locked stamps use dashed outlines.
