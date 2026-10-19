import { STORY_RAIL, WALK_BOUNDS } from "../constants/rail";

export function isDesktopRail(viewportWidth = window.innerWidth) {
  return viewportWidth >= STORY_RAIL.breakpointPx;
}

function pickBounds(viewportWidth) {
  return isDesktopRail(viewportWidth) ? WALK_BOUNDS.desktop : WALK_BOUNDS.mobile;
}

/** Gap from soil mound right edge → protagonist left edge at walk end. */
export function computeWalkEndGap(soilWidthPx, proWidthPx, viewportWidth) {
  const b = pickBounds(viewportWidth);
  const scaled = soilWidthPx * b.endGapSoilRatio + proWidthPx * b.endGapProRatio;
  return Math.round(Math.max(b.endGapMinPx, Math.min(b.endGapMaxPx, scaled)));
}

/**
 * Walk metrics inside the story track.
 * Start: protagonist anchored right. End: just right of soil + endGap.
 */
export function computeWalkMetrics(
  trackWidthPx,
  soilWidthPx,
  proWidthPx,
  viewportWidth = window.innerWidth,
) {
  const b = pickBounds(viewportWidth);
  const endGapPx = computeWalkEndGap(soilWidthPx, proWidthPx, viewportWidth);

  const startProLeft = trackWidthPx - proWidthPx;
  let endProLeft = soilWidthPx + endGapPx;
  let naturalTravel = startProLeft - endProLeft;

  // Narrow rails: soil + gap can exceed track — still allow a short walk instead of static.
  if (naturalTravel < b.minTravelPx && startProLeft > b.minTravelPx) {
    endProLeft = startProLeft - b.minTravelPx;
    naturalTravel = b.minTravelPx;
  } else if (naturalTravel < 1 && startProLeft > 8) {
    const fallbackTravel = Math.min(b.minTravelPx, Math.floor(startProLeft * 0.75));
    endProLeft = Math.max(0, startProLeft - fallbackTravel);
    naturalTravel = startProLeft - endProLeft;
  }

  let travelPx = Math.max(0, naturalTravel);

  if (travelPx > 0) {
    travelPx = Math.min(travelPx, b.maxTravelPx);
    if (naturalTravel >= b.minTravelPx) {
      travelPx = Math.max(travelPx, b.minTravelPx);
    }
  }

  return {
    travelPx: Math.round(travelPx),
    endGapPx,
    startProLeft: Math.round(startProLeft),
    endProLeft: Math.round(endProLeft),
  };
}
