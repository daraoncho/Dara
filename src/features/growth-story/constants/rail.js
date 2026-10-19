export const STORY_RAIL = {
  breakpointPx: 992,
  desktop: {
    widthPercent: 25,
    minWidthPx: 260,
    maxWidthPx: 400,
  },
  mobile: {
    widthPercent: 50,
    minWidthPx: 200,
    maxWidthPx: 360,
  },
};

/** Walk stop gap — lower = closer to soil. */
export const WALK_BOUNDS = {
  desktop: {
    endGapMinPx: 6,
    endGapMaxPx: 22,
    endGapSoilRatio: 0.12,
    endGapProRatio: 0.06,
    minTravelPx: 40,
    maxTravelPx: 280,
  },
  mobile: {
    endGapMinPx: 4,
    endGapMaxPx: 18,
    endGapSoilRatio: 0.1,
    endGapProRatio: 0.05,
    minTravelPx: 32,
    maxTravelPx: 220,
  },
};
