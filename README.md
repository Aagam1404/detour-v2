# Detour

A gamified commute side-quest prototype for newcomers to Sydney. Take a small detour on the way to class or work, notice something real, and earn coins and stamps.

Built with React 19, Vite, TypeScript and React Router. Everything is dummy data: no backend, GPS or real rewards.

## How it plays

1. Set your commute (home and destination), then pick how you travel (walk, train, bus, e-bike, ferry or metro). Each detour shows how many minutes it adds in each mode.
2. Accept a detour. Each step shows a small map with a route line, an arrow, a landmark tag, a direction chip and a distance.
3. Spot the thing you were looking for. The detour's **stamp** is yours straight away (a collectible).
4. Pick **3 of 9 mystery cards**. Five hide coins and four are bad luck, so it is a bit hard to earn.
5. Spend **coins** on Opal credit, coffee and gifts in Rewards. Your stamps and stats live in Stamps and Me.

You can change your route any time from the chip at the top of the map.

## Quick start

You need Node 20.19 or newer (`.nvmrc` says 22).

```bash
npm install
npm run dev
```

Open the printed address. The app is built for a 375 x 812 phone screen, so use your browser's device mode or open it on a phone.

| Script              | What it does                                  |
| ------------------- | --------------------------------------------- |
| `npm run dev`       | Start the dev server                          |
| `npm run typecheck` | Type check the whole project                  |
| `npm run build`     | Type check, then build to `dist/`             |
| `npm run preview`   | Serve the production build locally            |

## Project structure

```
.
├── docs/
│   ├── ARCHITECTURE.md      How the code is organised (start here)
│   └── DETOUR_DESIGN.md     Design system and screen specs, plus v2 changes (section 21)
├── public/                  Static files served as is (favicon)
├── src/
│   ├── main.tsx             Entry point
│   ├── App.tsx              Routes and the auth gate
│   ├── assets/              Icons, illustrations and stamp images
│   ├── components/
│   │   ├── brand/           Animated splash arrows
│   │   ├── layout/          Screen shells, bottom nav, header
│   │   ├── map/             Sydney map, step maps, route sheet
│   │   └── ui/              Button, card, chip, coin pill, sticker
│   ├── data/                Dummy content: detours, journeys, wallet offers, map layout
│   ├── screens/
│   │   ├── auth/            Login, sign up
│   │   ├── onboarding/      Splash and three intro screens
│   │   ├── commute/         Set or change your commute
│   │   ├── home/            The map
│   │   ├── detour/          Accept, guide steps, prize cards, back to commute
│   │   └── wallet/          Rewards, stamps, profile
│   ├── state/               Auth and wallet state (saved in localStorage)
│   └── styles/              Design tokens and CSS (index.css lists the order)
├── index.html
├── vercel.json              SPA rewrite so every route works on refresh
└── package.json
```

Imports use the `@/` alias for `src/`, for example `import { Button } from "@/components/ui/Button"`.

## Put it on GitHub

```bash
git init
git add .
git commit -m "Detour v2"
git branch -M main
git remote add origin https://github.com/<you>/detour.git
git push -u origin main
```

A GitHub Action (`.github/workflows/ci.yml`) type checks and builds on every push and pull request.

## Deploy on Vercel

1. In Vercel choose **Add New > Project** and import the GitHub repo.
2. Vercel detects Vite. The defaults match `vercel.json` (build `npm run build`, output `dist`).
3. Click **Deploy**. No environment variables are needed.

`vercel.json` sends every route to `index.html`, so links like `/rewards` work after a refresh. If the link asks you to sign in to Vercel, turn off Deployment Protection in Project Settings so others can open it.

## Notes

- Accounts and wallets are saved in the browser (`localStorage`) per username. Clear site data to start fresh.
- The map is hand-drawn SVG, so there is no map service or API key.
- Detour content lives in `src/data/journeys.ts`. Edit the words there, not in the screens.
