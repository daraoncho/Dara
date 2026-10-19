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
import { computeWalkMetrics } from "../utils/walkBounds";

const initial = {
  travelPx: 0,
  pourReachPx: 36,
  endGapPx: 0,
  stopLeftPx: 0,
  proWidthPx: 0,
};

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
    const trackEl = trackRef.current;
    const soilEl = soilRef.current;
    const protagonistEl = protagonistRef.current;
    if (!trackEl || !soilEl || !protagonistEl) return;

    const measure = () => {
      const trackRect = trackEl.getBoundingClientRect();
      const soilRect = soilEl.getBoundingClientRect();
      const proRect = protagonistEl.getBoundingClientRect();

      if (trackRect.width < 1 || proRect.width < 1) return;

      const walk = computeWalkMetrics(
        trackRect.width,
        soilRect.width,
        proRect.width,
        window.innerWidth,
      );

      const soilLeftInTrack = soilRect.left - trackRect.left;
      const soilPeakX = soilLeftInTrack + soilRect.width / 2;
      const spoutXInPro = spoutOffsetPx(proRect.width);
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
        proWidthPx: Math.round(proRect.width),
      });
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(trackEl);
    observer.observe(soilEl);
    observer.observe(protagonistEl);
    window.addEventListener("resize", measure);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [trackRef, soilRef, protagonistRef]);

  return metrics;
}
