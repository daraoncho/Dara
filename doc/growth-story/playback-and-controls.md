# Growth story — playback & controls

## What users see

When enabled, a **Story pace** control appears above the day headline (desktop) or in the **top-right of the story block** (viewports ≤991px). It includes:

- Range slider **0.5×–3×** (step 0.25)
- Presets: **0.75×**, **1×**, **1.5×**, **2×**

Higher values shorten each day’s loop (e.g. **2×** → 4 s per day instead of 8 s). The full **9-day** master cycle scales the same way (~72 s at 1× per day × 9 with default 8 s day length).

Hidden when:

- `STORY_PLAYBACK.showControl` is `false`
- Story is not animating (e.g. reduced motion / static layout)
- `prefers-reduced-motion: reduce` (control CSS)

## Site-wide flags (defaults)

Edit **`src/features/growth-story/constants/playback.js`**:

```js
export const STORY_PLAYBACK = {
  showControl: true,   // false → hide UI; story still runs at defaultSpeed
  defaultSpeed: 1,     // 1 = normal; 2 = twice as fast
};
```

| Key | Purpose |
|-----|---------|
| `showControl` | Show or hide `StoryPlaybackControl` |
| `defaultSpeed` | Initial pace on load (clamped 0.5–3) |

Helpers in the same file: `clampStoryPlaybackSpeed`, `storyDayDurationSec`, `STORY_PLAYBACK_SPEED_MIN` / `MAX`.

## Component overrides

`GrowthStoryStage` accepts optional props (defaults come from `STORY_PLAYBACK`):

```jsx
<GrowthStoryStage
  showPlaybackControl={false}
  defaultPlaybackSpeed={1.5}
/>
```

Exports from `src/features/growth-story/index.js`: `STORY_PLAYBACK`, `StoryPlaybackControl`, and playback helpers.

## How speed reaches CSS

`GrowthStoryStage` sets on the scene wrapper:

- `--story-duration` — `8s / speed` (from `STORY_ANIMATION.durationMs` and clamped speed)
- `--story-day-count` — `STORY_DAY_COUNT` (9)

Walk, pour, headlines, beats, sprout/tree, and wonder animations reference `var(--story-duration)` or `calc(var(--story-day-count) * var(--story-duration))`. Changing speed updates the variable; animations pick up the new timing on the next cycle (no full remount required).

## Layout (control placement)

| Breakpoint | Placement |
|------------|-----------|
| ≥992px | Above day headline, left-aligned; headline position unchanged (`playbackAboveHeadline` + `bottom: 100%` on header) |
| ≤991px | Top-right of `.wrapper` (matches story rail mobile breakpoint) |

Styles: `styles/StoryPlaybackControl.module.css`, `styles/GrowthStoryStage.module.css` (`.playbackAboveHeadline`).

## Related files

| File | Role |
|------|------|
| `components/StoryPlaybackControl.jsx` | Slider + presets |
| `components/GrowthStoryStage.jsx` | State, CSS vars, conditional render |
| `constants/playback.js` | Flags and duration helper |
| `constants/animation.js` | Base 8000 ms day length |

## Note on `useGrowthStoryBeat`

`hooks/useGrowthStoryBeat.js` is a separate JS-timed walk/water hook. **Home** uses the CSS master loop in `GrowthStoryStage`, not this hook. Playback speed only affects CSS-driven timelines today.
