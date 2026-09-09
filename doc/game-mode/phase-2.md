# Phase 2 — Thought Fragments

## Goal

Polish gameplay, fix mobile touch issues, improve accessibility and performance, and extend the stage through Work — without breaking Phase 1.

## Delivered in Phase 2

- [x] **Touch control fix** — pointer events + `setPointerCapture` (no passive `preventDefault` warnings)
- [x] **Collect sparkle particles** — lime burst on pickup (skipped when reduced motion is on)
- [x] **Collect toast** — brief on-screen message + screen reader announcement
- [x] **`prefers-reduced-motion`** — static bulbs/robot/door, no particles, no overlay animation
- [x] **Focus trap** — win/lose dialog focuses restart button and traps Tab
- [x] **Desktop spawn fix** — layout anchors to `#home`, `#about`, `#experience`, `#work`
- [x] **Spawn intro** — robot drops from above with bounce settle
- [x] **Drop-through** — ↓ / S to fall through ledges
- [x] **Content dim overlay** — portfolio column dims while game is active
- [x] **Info portal** — instructions panel above canvas via `document.body` portal
- [x] **Stage scroll lock** — clamp scroll to Home → Work

## Phase 2.1 — extended stage & layout

- [x] **Four-section stage** — Home → About → Experience → Work
- [x] **Seeded random layout** — new ledge/spark positions on each game-mode toggle
- [x] **Reachability chains** — vertical spine + horizontal approach ledges (ref-inspired)
- [x] **One spark per section** — four idea fragments across the page

## Phase 2.2 — finish line & copy

- [x] **Finish door** — 5th checkpoint on last Work ledge; locked until 4 sparks collected
- [x] **Collect messages** — First Spark, Origin Thought, Builder Instinct, Final Spark
- [x] **Win / lose modals** — compact ref-style cards
- [x] **Locked door hint** — toast when reaching door early (*Not yet; there are still thoughts left to find.*)

## Collect messages

Defined in `src/features/thought-fragments/constants/copy.js`:

| Checkpoint | Toast |
|------------|-------|
| Home | First Spark |
| About | Origin Thought |
| Experience | Builder Instinct |
| Work | Final Spark |
| Finish door | A thought isn't real until you build it. |

## Touch control fix (details)

React registers `touchstart` as **passive** by default. Calling `preventDefault()` inside those handlers triggers:

> Unable to preventDefault inside passive event listener invocation.

**Solution:** `TouchControlButton` uses **Pointer Events** with `setPointerCapture`. Combined with `touch-action: none` on controls, scrolling is not hijacked.

## Phase 3 ideas

- Sound effects (optional, muted by default)
- `localStorage` progress / resume collection
- `?game=1` URL deep link
- Per-project spark names in Work cards
- Robot reaction animation on collect

## How to test

1. **Toggle layout** — turn game mode off/on; ledges and sparks should move
2. **Reachability** — far-right sparks should have approach chains
3. **Locked door** — reach Work door with < 4 sparks; hint toast should appear once per visit
4. **Win path** — collect 4 sparks, door glows, step through for 5/5 and win modal
5. **Fall** — drop off stage; *you fell.* / *idea lost in the void.*
6. **Mobile touch** — no console warnings; on-screen controls work
7. **Reduced motion** — OS setting disables bob, particles, overlay animation
