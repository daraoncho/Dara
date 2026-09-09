# Phase 1 — Thought Fragments

## Goal

Ship a working, maintainable first version of game mode without breaking the existing portfolio.

## Delivered in Phase 1

- [x] Feature folder under `src/features/thought-fragments/`
- [x] D-bot pixel robot renderer (lime accent palette)
- [x] Light-bulb fragment collectibles
- [x] Win / lose overlays
- [x] Game mode toggle — sidebar (desktop) + floating (mobile)
- [x] Fragment counter HUD
- [x] Play area limited to content column on desktop
- [x] Keyboard controls (desktop)
- [x] Touch controls (coarse pointer / mobile)
- [x] `GameModeProvider` context — no prop drilling
- [x] Documentation in `doc/game-mode/`
- [x] Portfolio content wrapper id: `#portfolio-content`

## Explicitly deferred (later phases)

- Sound effects and music
- Score / timer / leaderboards
- Persisting progress in `localStorage`
- Game mode URL query param (`?game=1`)

See [phase-2.md](./phase-2.md) for polish, extended stage, finish door, and accessibility work that shipped afterward.

## How to test locally

```bash
npm run dev
```

1. Open the site on desktop — toggle game mode in the sidebar
2. Move, jump, scroll, collect sparks, reach the finish door, confirm win screen
3. Fall off the bottom — confirm lose + restart
4. Resize to mobile width — use floating toggle and on-screen controls

## How to disable quickly

Set game mode off via toggle, or remove `<ThoughtFragmentsGame />` and toggles from `App.jsx` / `Navbar.jsx` — portfolio sections are unchanged.
