# Thought Fragments — overview

**Thought Fragments** is an optional game mode on the portfolio site. Visitors toggle it on, control a small pixel robot (D-bot), and collect glowing thought fragments while exploring the page.

## Current stage: Home → About → Experience → Work

Gameplay spans four sections with **one spark each**, plus a **finish door** at the bottom of Work:

| Checkpoint | Collect message |
|------------|-----------------|
| Home | First Spark |
| About | Origin Thought |
| Experience | Builder Instinct |
| Work | Final Spark |
| Work (door) | A thought isn't real until you build it. |

**5 checkpoints total** (4 sparks + 1 door). Collect all four sparks to unlock the door, then step through to win. Each time game mode is toggled on, ledge and pickup positions randomize.

Touching the door before all sparks are collected shows: *Not yet; there are still thoughts left to find.*

Scroll is clamped to the active stage while game mode is on. Portfolio content dims slightly so ledges stand out.

## Player experience

1. Click **game mode** (sidebar on desktop, floating button on mobile).
2. D-bot drops onto the spawn ledge (top-left of Home).
3. Move **← →**, jump **space**, drop **↓**, scroll to explore all four sections.
4. Collect **4 / 5** sparks — each shows its title in a toast.
5. Reach the glowing **door** on the last Work ledge for **5 / 5**.
6. Toggle game mode off and on again for a fresh layout.

## Win & lose

| State | Modal |
|-------|-------|
| Fall | **you fell.** → *idea lost in the void.* |
| Win | **thoughts shipped.** → *A thought isn't real until you build it.* |

Both use compact ref-style cards with a restart button.

## Play area

| Layout | Play region |
|--------|-------------|
| Desktop (≥992px) | Main content column — right of the 240px sidebar |
| Mobile | Full width below the top navigation bar |

## Instructions

Click **i** — panel renders above the game layer (portal) with full controls visible on all screen sizes.

## Further reading

- [architecture.md](./architecture.md) — folder layout and data flow
- [components.md](./components.md) — UI pieces and z-index stack
- [controls-and-input.md](./controls-and-input.md) — keyboard, touch, platforms
- [phase-1.md](./phase-1.md) / [phase-2.md](./phase-2.md) — delivery history
