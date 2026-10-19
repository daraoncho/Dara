# Growth story — overview

Horizontal narrative in **Home** (above “hi, Dara here.”). The story progresses **left → right** along a single ground line, then loops.

## Code location

```
src/features/growth-story/
├── index.js                    # public exports
├── components/
│   ├── GrowthStoryStage.jsx    # rail, protagonist walk, soil stack
│   ├── StoryDayHeadline.jsx
│   ├── StoryBeatOverlay.jsx    # Day 7 / 20 / wonder observers
│   ├── StoryPlaybackControl.jsx
│   ├── Day35Beat.jsx
│   ├── Protagonist.jsx / ProtagonistSitting.jsx
│   ├── ObserverFigure.jsx
│   ├── SoilPile.jsx / SoilWetSpot.jsx / SoilSprout.jsx
│   ├── WonderTree.jsx
│   └── WateringCan.jsx / WaterSprinkle.jsx
├── constants/                  # layout, days, beats, playback, observers, …
├── hooks/                      # walk travel, keyframe set (wide vs narrow)
├── styles/                     # CSS modules + master-timeline keyframes
└── utils/                      # walk bounds, timelines, keyframe printers
```

Entry point on the site: `<GrowthStoryStage />` in `src/components/Home.jsx` (hidden while **Thought Fragments** game mode is active).

## Story loop (days)

Configured in `constants/days.js` — **9 slots** per master cycle (`STORY_DAY_COUNT`):

| Slot | Label / beat |
|------|----------------|
| 1, 2, 4 | Routine watering (`Day N`) |
| 7 | Skeptic + peer dialogue |
| 20 | Naysayer — “Give up!!!” |
| 35 | Seated hero + “doubt creeps in” (walker hidden) |
| `**` | Routine — headline “Day **” |
| `***` | **Surprise** — sprout, celebration, can on ground, **no pour** |
| `day-wonder` | **Wonder** — tree grows, still hero, three observers walk in; **no day headline** |

Symbolic tokens: `STORY_UNKNOWN_DAY`, `STORY_SURPRISE_DAY`, `STORY_WONDER_DAY`.

## Timeline & CSS

- **Per-day duration**: `STORY_ANIMATION.durationMs` (8000 ms) exposed as CSS `--story-duration` (scaled by playback speed — see [playback-and-controls.md](./playback-and-controls.md)).
- **Master loop**: `calc(var(--story-day-count) * var(--story-duration))` on beat/headline animations.
- **Wide vs narrow keyframes**: breakpoint `992px` (`constants/rail.js`, `useStoryKeyframeSet.js`) — `STORY_KEYFRAME` vs `STORY_KEYFRAME_NARROW` in `constants/animation.js`.
- **`prefers-reduced-motion`**: static pose beside soil; playback UI hidden. Chrome DevTools → **Rendering** → “Emulate prefers-reduced-motion” will look the same (by design).
- **Narrow rails**: walk distance is computed in `utils/walkBounds.js`; if soil measurement is wider than the track, the stop position is adjusted so `travelPx` stays &gt; 0 instead of disabling animation.

### Regenerating keyframe CSS

After changing day order, beat phases, or day count, run the matching printer and paste output into the listed CSS module (do not hand-tweak master percents blindly):

| Script | Typical output target |
|--------|------------------------|
| `node src/features/growth-story/utils/printStoryDayKeyframes.js` | `styles/StoryDayHeadline.module.css` |
| `node src/features/growth-story/utils/printStoryBeatKeyframes.js` | `styles/StoryBeat.module.css` |
| `node src/features/growth-story/utils/printSurpriseBeatKeyframes.js` | `styles/SurpriseDayBeat.module.css` |
| `node src/features/growth-story/utils/printWonderGrowKeyframes.js` | `styles/SoilSprout.module.css` |
| `node src/features/growth-story/utils/printWonderDayBeatKeyframes.js` | `styles/WonderDayBeat.module.css` |
| `node src/features/growth-story/utils/printWonderObserverKeyframes.js` | `styles/StoryBeat.module.css` |
| `node src/features/growth-story/utils/printProtagonistMasterFade.js` | `styles/GrowthStoryStage.module.css` |

Reference timelines: `utils/storyBeatTimeline.js`, `utils/surpriseDayTimeline.js`, `utils/storyDayMasterPercent.js`.

## Rail, walk, pour

- **Rail width**: desktop ~25% of Home (`STORY_RAIL.desktop`); mobile ~50% (`STORY_RAIL.mobile`) — `constants/rail.js` + `.wrapper` in `GrowthStoryStage.module.css`.
- **Walk**: start at rail right → stop at soil (`utils/walkBounds.js`, `hooks/useStoryWalkTravel.js`).
- **Loop phases**: walk → pour → fade → reappear (`STORY_KEYFRAME` in `constants/animation.js`).

## Story beats (content)

- **Config**: `constants/storyBeats.js` — dialogue + `STORY_BEAT_LOOP_INDEX` (must stay aligned with `STORY_DAY_NUMBERS`).
- **Day 7**: `DAY_SEVEN_DIALOGUE` — skeptic (blue), peer (green).
- **Day 20**: `DAY_TWENTY_DIALOGUE` — naysayer (red).
- **Day 35**: `DAY_THIRTY_FIVE_COPY` + `Day35Beat.jsx` / caption in header.
- **Surprise**: sprout (`SoilSprout.jsx`), ground can, jump animation — `SurpriseDayBeat.module.css`.
- **Wonder**: `WonderTree.jsx`, still protagonist (`WonderDayBeat.module.css`, `constants/wonderDay.js`), observers (`WONDER_DAY_DIALOGUE`, `constants/wonderObserver.js`, `constants/observers.js`).
- **Speech bubbles**: `constants/speechBubble.js`, styles in `StoryBeat.module.css`.

## Tuning sizes & layout

| What | File | Keys / notes |
|------|------|----------------|
| Protagonist size & colors | `constants/characters.js` | `PROTAGONIST_SIZE`, `PROTAGONIST_COLORS`, `PROTAGONIST_GRIP` |
| Soil pile & baseline | `constants/stage.js` | `SOIL_PILE_SIZE`, `SOIL_SHAPE`, `STAGE` |
| Watering can | `constants/wateringCan.js` | `WATERING_CAN_SIZE`, `HAND_SIZE`, `ANCHOR`, colors |
| Rail & walk gaps | `constants/rail.js` | `STORY_RAIL`, `WALK_BOUNDS` |
| Pour placement | `constants/pour.js`, `utils/pourPlacement.js` | |
| Sprout / tree | `constants/sprout.js`, `constants/tree.js` | |
| Wonder layout | `constants/wonderDay.js`, `constants/wonderObserver.js` | stand ratios, walk stagger, speech lift |
| Observer layout (Day 7/20) | `constants/observers.js` | |
| Stage CSS nudges | `styles/GrowthStoryStage.module.css` | anchors, walk keyframes |

## Playback & UI controls

Documented in **[playback-and-controls.md](./playback-and-controls.md)** — `STORY_PLAYBACK` flags, pace slider, responsive control placement, and `--story-duration`.

## Quick iteration tip

To test only surprise + wonder, temporarily trim `STORY_DAY_NUMBERS` in `constants/days.js` to `[STORY_SURPRISE_DAY, STORY_WONDER_DAY]`, regenerate keyframes, then restore the full list before shipping.
