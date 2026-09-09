# Thought Fragments — controls & input

## Desktop keyboard

| Input | Action |
|-------|--------|
| ← / → or A / D | Move |
| Space / ↑ / W | Jump |
| ↓ / S | Drop down through a ledge |
| Scroll / trackpad | Explore page (always available) |
| Space (after fall) | Restart |

Game keys call `preventDefault()` while game mode is active to avoid page scroll on space.

## Mobile / touch

When `(pointer: coarse)` matches:

- **← / →** — hold to move
- **↑** — hold to jump
- **↓** — hold to drop through a ledge

Touch controls use `touch-action: none` and sit in a fixed bottom bar with safe-area padding.

## Play area rules

Computed in `utils/playArea.js`:

```js
getPlayArea() → { left, top, width, height, isDesktop }
```

- **Desktop:** `left = var(--sidebar-width)` (240px)
- **Mobile:** `top = navbar bottom` via `[data-game-navbar]`

The robot’s horizontal position is clamped to `[left, left + width - robotWidth]`.

## Scroll lock

While game mode is active, scroll is clamped to the stage bounds (Home top → Work bottom) via `useStageScrollLock`.

## Platforms

Collision uses **generated ledges only** (`USE_DOM_PLATFORMS = false` in `gameConfig.js`). Portfolio text is not used as platforms — it caused floating and stuck movement in early builds.

Platform types:

1. **Spawn ledge** — top-left of Home
2. **Fragment ledges** — under each spark
3. **Approach chains** — horizontal stepping stones for far-right pickups
4. **Vertical spine** — zig-zag connectors between sections
5. **Goal ledge** — wider platform under the finish door

## Collectible placement

| Checkpoint | Section | Kind |
|------------|---------|------|
| 1 | Home | Spark |
| 2 | About | Spark |
| 3 | Experience | Spark |
| 4 | Work | Spark |
| 5 | Work (bottom) | Finish door |

Positions randomize on each game-mode toggle. The finish door stays locked until all four sparks are collected. Touching the door early shows: *Not yet; there are still thoughts left to find.*
