import { useLayoutEffect, useState } from "react";
import {
  PROTAGONIST_GRIP,
  PROTAGONIST_SIZE,
  PROTAGONIST_VIEWBOX,
} from "../constants/characters";
import { POUR_BOUNDS } from "../constants/pour";
import {
  WATERING_CAN_ANCHOR,
  WATERING_CAN_HAND_SIZE,
  WATERING_CAN_SPOUT,
  WATERING_CAN_VIEWBOX,
} from "../constants/wateringCan";
import { SOIL_PILE_SIZE } from "../constants/stage";
import { STORY_RAIL } from "../constants/rail";
import { computeWalkMetrics, isDesktopRail } from "../utils/walkBounds";

const initial = {
  travelPx: 0,
  pourReachPx: 36,
  endGapPx: 0,
  stopLeftPx: 0,
  proWidthPx: 0,
};

const MAX_MEASURE_RETRIES = 48;

function estimateTrackWidthPx(viewportWidth = window.innerWidth) {
  const rail = isDesktopRail(viewportWidth)
    ? STORY_RAIL.desktop
    : STORY_RAIL.mobile;
  const fromPercent = viewportWidth * (rail.widthPercent / 100);
  return Math.round(
    Math.min(rail.maxWidthPx, Math.max(rail.minWidthPx, fromPercent)),
  );
}

function spoutOffsetPx(proWidth) {
  const canW =
    proWidth * (WATERING_CAN_HAND_SIZE.width / PROTAGONIST_SIZE.width);
  const gripPxX =
    (PROTAGONIST_GRIP.x / PROTAGONIST_VIEWBOX.width) * proWidth;
  const canLeft =
    gripPxX -
    (WATERING_CAN_ANCHOR.gripX / WATERING_CAN_VIEWBOX.width) * canW;
  return (
    canLeft + (WATERING_CAN_SPOUT.x / WATERING_CAN_VIEWBOX.width) * canW
  );
}

export function useStoryWalkTravel(trackRef, soilRef, protagonistRef) {
  const [metrics, setMetrics] = useState(initial);

  useLayoutEffect(() => {
    let cancelled = false;
    let retryCount = 0;
    let retryRaf = 0;

    const measure = () => {
      if (cancelled) return false;

      const trackEl = trackRef.current;
      const soilEl = soilRef.current;
      const protagonistEl = protagonistRef.current;
      if (!trackEl || !soilEl || !protagonistEl) {
        return false;
      }

      const trackRect = trackEl.getBoundingClientRect();
      const soilRect = soilEl.getBoundingClientRect();
      const proRect = protagonistEl.getBoundingClientRect();

      const trackWidth =
        trackRect.width >= 1
          ? trackRect.width
          : estimateTrackWidthPx(window.innerWidth);
      const proWidth =
        proRect.width >= 1 ? proRect.width : PROTAGONIST_SIZE.width;
      const soilWidth =
        soilRect.width >= 1 ? soilRect.width : SOIL_PILE_SIZE.width;

      if (trackWidth < 1 || proWidth < 1) {
        return false;
      }

      const walk = computeWalkMetrics(
        trackWidth,
        soilWidth,
        proWidth,
        window.innerWidth,
      );

      if (trackRect.width < 1 && retryCount < MAX_MEASURE_RETRIES) {
        return false;
      }

      const soilLeftInTrack =
        trackRect.width >= 1 ? soilRect.left - trackRect.left : 0;
      const soilPeakX = soilLeftInTrack + soilWidth / 2;
      const spoutXInPro = spoutOffsetPx(proWidth);
      const spoutAtStopX = walk.endProLeft + spoutXInPro;
      const horizontalReachPx = Math.max(
        POUR_BOUNDS.minHorizontalReachPx,
        spoutAtStopX - soilPeakX,
      );

      setMetrics({
        travelPx: walk.travelPx,
        endGapPx: walk.endGapPx,
        pourReachPx: Math.round(horizontalReachPx),
        stopLeftPx: walk.endProLeft,
        proWidthPx: Math.round(proWidth),
      });
      return true;
    };

    let observing = false;

    const ensureObserved = (observer) => {
      if (observing) return;
      const trackEl = trackRef.current;
      const soilEl = soilRef.current;
      const protagonistEl = protagonistRef.current;
      if (!trackEl || !soilEl || !protagonistEl) return;
      observer.observe(trackEl);
      observer.observe(soilEl);
      observer.observe(protagonistEl);
      observing = true;
    };

    const applyEstimatedMetrics = () => {
      const trackWidth = estimateTrackWidthPx(window.innerWidth);
      const proWidth = PROTAGONIST_SIZE.width;
      const soilWidth = SOIL_PILE_SIZE.width;
      const walk = computeWalkMetrics(
        trackWidth,
        soilWidth,
        proWidth,
        window.innerWidth,
      );
      const soilPeakX = soilWidth / 2;
      const spoutAtStopX = walk.endProLeft + spoutOffsetPx(proWidth);
      const horizontalReachPx = Math.max(
        POUR_BOUNDS.minHorizontalReachPx,
        spoutAtStopX - soilPeakX,
      );
      setMetrics({
        travelPx: walk.travelPx,
        endGapPx: walk.endGapPx,
        pourReachPx: Math.round(horizontalReachPx),
        stopLeftPx: walk.endProLeft,
        proWidthPx: proWidth,
      });
    };

    const scheduleRetry = () => {
      if (cancelled) return;
      if (retryCount >= MAX_MEASURE_RETRIES) {
        applyEstimatedMetrics();
        return;
      }
      retryCount += 1;
      retryRaf = requestAnimationFrame(runMeasureWithObserve);
    };

    const runMeasure = () => {
      if (measure()) return;
      scheduleRetry();
    };

    let observer;
    const runMeasureWithObserve = () => {
      ensureObserved(observer);
      runMeasure();
    };

    observer = new ResizeObserver(runMeasureWithObserve);

    runMeasureWithObserve();

    window.addEventListener("resize", runMeasureWithObserve);
    document.fonts?.ready?.then(() => runMeasureWithObserve());
    window.addEventListener("visibilitychange", runMeasureWithObserve);

    return () => {
      cancelled = true;
      cancelAnimationFrame(retryRaf);
      observer.disconnect();
      window.removeEventListener("resize", runMeasureWithObserve);
      window.removeEventListener("visibilitychange", runMeasureWithObserve);
    };
  }, [trackRef, soilRef, protagonistRef]);

  return metrics;
}
