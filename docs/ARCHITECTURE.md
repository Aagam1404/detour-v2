# Architecture

A short guide to how Detour is put together.

## Stack

React 19, TypeScript, Vite, React Router 7. Plain CSS with design tokens. No backend, no map service. State is held in React context and saved to `localStorage`.

## Folder map

| Folder                    | What lives there                                                                 |
| ------------------------- | -------------------------------------------------------------------------------- |
| `src/components/brand`    | `SplashArt`, the two arrows that draw themselves on the splash screen            |
| `src/components/layout`   | `AppScreen`, `ScreenShell`, `BottomNav`, `Header`, `OnboardingScreen`            |
| `src/components/ui`       | `Button`, `Card`, `Chip`, `CoinPill`, `Sticker`                                  |
| `src/components/map`      | `SydneyMap` and `MapArt` (home map), `StepMap` (guide steps), `RouteSheet`, small map graphics |
| `src/screens/*`           | One folder per area of the app, one file per screen                              |
| `src/data`                | All content and rules, no UI                                                     |
| `src/state`               | Context providers and storage helpers                                            |
| `src/styles`              | `tokens.css` (colours, type, spacing) then one CSS file per area                 |
| `src/assets`              | Icons, illustrations, stamp images                                               |

## Routes

Defined in `src/App.tsx`.

| Path                         | Screen                                   |
| ---------------------------- | ---------------------------------------- |
| `/`                          | Animated splash, then log in             |
| `/login`, `/signup`          | Auth                                     |
| `/onboarding/1` to `/3`      | Intro                                    |
| `/commute`                   | Set or change commute                    |
| `/commute/detours`           | Detours on your commute                  |
| `/home`                      | Map                                      |
| `/detour/:id`                | Accept a detour                          |
| `/detour/:id/guide`          | Step maps, "who did you find", reveal    |
| `/detour/:id/prizes`         | Pick 3 of 9 cards                        |
| `/back-to-commute`           | Return screen                            |
| `/stickers`                  | Stamps tab                               |
| `/rewards`                   | Coins and rewards                        |
| `/me`                        | Profile                                  |

## Splash

The app opens on `/`. Two yellow arrows draw themselves along their own paths, the arrow heads pop in, then the name fades in. After about 3.6 seconds the screen fades out and goes to log in (or to the intro if you are already signed in). Tap anywhere to skip. With reduced motion on, it shows the finished frame for about a second.

The arrows are the solid shapes from the design file, revealed by a thick line that follows the middle of each ribbon. The shapes and that centre line are in `src/data/splashPaths.ts`, the drawing is in `src/components/brand/SplashArt.tsx` and the timings are in `src/styles/splash.css`. If you change a delay in the CSS, change `HOLD_MS` in `src/screens/onboarding/Splash.tsx` too.

`AuthGate` in `src/App.tsx` lets `/`, `/login` and `/signup` open without an account. Any other address sends you back to the splash.

## State

- `AuthState` keeps the signed in user. Accounts are stored under `detour.accounts`.
- `PrototypeState` keeps the wallet for the signed in user under `detour.wallet.<username>`: coins, stamps, finished detours, history, tickets and the commute. It also exposes `completeDetour` (gives the stamp), `claimPrizes` (adds coins from the cards) and `redeem` (spends coins).

## Data

- `journeys.ts` holds the words for every detour: steps, hints, landmark names (`goal`), the "who did you find" question and the reveal.
- `detours.ts` builds the lighter detour objects the map and lists use.
- `wallet.ts` holds the reward offers, the mystery card deck (`buildDeck`), levels and stamp lookups.
- `commute.ts` holds places, travel modes, which detours suit each mode, and the time each mode adds to a detour (`modeAddOn`, `extraMinutesFor`, `modeTimesFor`).
- `mapLayout.ts` holds where each detour sits on the map and the suburb labels.

## The map

The home map is an SVG illustration of central Sydney (`MapArt`) inside a pannable, zoomable canvas (`SydneyMap`). Everything is placed in a 0 to 100 coordinate space shared with `commutePlaces`, so a place name always maps to the same spot. Your commute is drawn as a line between its two places. Each guide step has its own small scene in `StepMap`.

## Changing things

- **Reword a detour:** edit `src/data/journeys.ts`.
- **Change coin amounts or odds:** edit `buildDeck` in `src/data/wallet.ts`.
- **Change rewards:** edit `offers` in `src/data/wallet.ts`.
- **Move a coin on the map:** edit `detourSpots` in `src/data/mapLayout.ts`.
- **Add a screen:** create it in the right `src/screens/*` folder and add a route in `src/App.tsx`.
