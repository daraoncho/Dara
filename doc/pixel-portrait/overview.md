# Pixel portrait (navbar profile)

Interactive **pixel-grid portrait** in the desktop navbar — optional alternative to the static profile photo. Particles sample colors from the avatar image; pointer repulsion creates a “hole” in the grid (scatter wave).

> Implementation name is **Pixel portrait** (canvas squares, not literal ASCII characters). The pointer uses a **crosshair** cursor (+ shape).

## Where it appears

- **Component chain**: `Navbar` → `ProfilePortrait` → `PixelPortrait` (when portrait mode is on)
- **Visibility**: desktop only (`min-width: 992px`) — `ProfilePortrait` returns `null` on smaller viewports
- **Assets**: avatar path passed from `Navbar` (`DaraAvatar.webp`)

## User controls

| Control | Behavior |
|---------|----------|
| **Original / Portrait** toggle | Switches static photo vs interactive canvas |
| Pointer over canvas | Repulsion field + optional spinning crosshair |

Preference is stored in **localStorage** (`constants/portraitView.js`, key `dara-profile-portrait-view`).

## Feature flags & tuning

### View mode (default: original photo)

**`src/constants/portraitView.js`**

- `PORTRAIT_VIEWS.ORIGINAL` | `PORTRAIT_VIEWS.PORTRAIT`
- `readPortraitView()` / `writePortraitView()` — used on toggle

### Cursor (crosshair)

**`src/constants/portraitCursor.js`**

```js
export const PORTRAIT_CURSOR = {
  rotate: true,    // false → browser static crosshair
  armPx: 6,        // half-length of each + arm in cursor bitmap
  bitmapSize: 24,  // cursor image size (px)
  spinHz: 1.25,    // rotations per second when rotate is true
};
```

When `rotate` is `true`, the canvas sets a custom cursor URL each frame (OS cursors cannot rotate natively). Appearance: black cross with light edge, smaller than default crosshair.

Optional prop on `PixelPortrait`: `rotateCursor={false}` or `cursorConfig={…}`.

### Reduced motion

If `prefers-reduced-motion: reduce`, `ProfilePortrait` shows the **static photo** even when the user previously chose Portrait (no canvas animation).

## Pointer / “wave” behavior

**`src/components/PixelPortrait.jsx`**

- Particles spawn from image samples, then ease into grid positions on load
- While pointer is active, particles within `holeRadius` (~22% of portrait size) are pushed away
- Pointer position is mapped to **canvas space** (handles CSS vs bitmap scaling)
- On **enter** or **pointer down**, repulsion center **snaps** to the pointer (avoids wave appearing from off-screen `-1000, -1000`)
- On **move**, position eases slightly for smooth following
- On **leave**, pointer state resets off-canvas

## Code map

| File | Role |
|------|------|
| `components/ProfilePortrait.jsx` | Toggle, desktop gate, reduced motion |
| `components/PixelPortrait.jsx` | Canvas, particles, pointer, cursor |
| `constants/portraitView.js` | localStorage view preference |
| `constants/portraitCursor.js` | Rotation + cursor size |
| `styles/PixelPortrait.module.css` | Frame, canvas, toggle, static img |

Constants: `PORTRAIT_SIZE` (200) exported from `PixelPortrait.jsx`.

## Dependencies

- React hooks + canvas 2D
- `useReducedMotion` from `src/hooks/useReducedMotion.js`
- In-memory particle cache keyed by `src|size` (re-sample only when image or size changes)
