# Thought Fragments — components

## ThoughtFragmentsGame

Root orchestrator. Renders nothing when game mode is off. When active:

- Mounts canvas, HUD, dim overlay, info portal, status overlay, and touch controls (coarse pointer only)

## GameCanvas

Fixed full-viewport `<canvas>`. Drawing respects the play area inside the engine; the canvas itself does not block scroll.

**Z-index:** `900`

## GameContentDim

Subtle dim over the portfolio content column while game mode is active so ledges stand out.

**Z-index:** `850`

## GameToggle

Two variants via `variant` prop:

| Variant | Visibility | Location |
|---------|------------|----------|
| `sidebar` | Desktop only | Below nav links in `Navbar` |
| `floating` | Mobile only | Fixed top-left below header |

Toggling **on** increments `restartKey` for a fresh random layout. Shows **i** when active.

## GameInfoPortal / GameInfoPanel

Instructions panel portaled to `document.body` so it stacks above the canvas on desktop. Click **i** to open/close.

**Z-index:** `1035`

## FragmentCounter

Fixed HUD: `collected / 5` with lime pip. Hidden on win/lose screens. Announces checkpoint progress via `aria-live`.

**Z-index:** `1031`

## CollectToast

Brief centered banner on spark pickup, finish door, or locked-door hint. Pairs with `FragmentCounter` for screen readers.

| Variant | When |
|---------|------|
| Default | Spark collected (First Spark, etc.) |
| `toastFinish` | Finish door reached — lime accent |
| `toastHint` | Door touched before all sparks — muted style |

**Z-index:** `1031`

## GameStatusOverlay

Compact ref-style win/lose card:

| State | Title | Subtitle |
|-------|-------|----------|
| Fall | you fell. | idea lost in the void. |
| Win | thoughts shipped. | A thought isn't real until you build it. |

Restart button; Space also restarts after a fall.

**Z-index:** `901`

## TouchControls / TouchControlButton

On-screen ← → ↓ ↑ for coarse-pointer devices. Hidden on desktop (`min-width: 992px`).

Uses **Pointer Events** with `setPointerCapture`.

**Z-index:** `902`

## Context API

```js
const { isActive, showInfo, restartKey, toggle, restart, setShowInfo } = useGameModeContext();
```

- `toggle()` — enable/disable game mode; **new layout on each enable**
- `restart()` — increments `restartKey` to reset the level
