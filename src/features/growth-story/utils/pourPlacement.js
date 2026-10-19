import { POUR_BOUNDS } from "../constants/pour";
import {
  POUR_STREAM,
  WATERING_CAN_SPOUT,
  WATERING_CAN_VIEWBOX,
} from "../constants/wateringCan";

/**
 * Arc from spout → soil center using measured horizontal reach (px).
 * `horizontalReachPx` = spout X − soil center X at walk end (track space).
 */
export function computePourGeometry(horizontalReachPx, pourWidthPx) {
  const { viewBox, spoutAnchor } = POUR_STREAM;
  const sx = spoutAnchor.x;
  const sy = spoutAnchor.y;
  const landY = POUR_BOUNDS.landY;
  const peakY = POUR_BOUNDS.arcPeakY;

  const reach = Math.max(POUR_BOUNDS.minHorizontalReachPx, horizontalReachPx);
  const landOffsetUnits = (reach / pourWidthPx) * viewBox.width;
  const landX = Math.max(6, sx - landOffsetUnits);
  const peakX = (sx + landX) / 2;

  const mainArc = `M${sx} ${sy} Q${peakX} ${peakY} ${landX} ${landY}`;
  const trailArcs = [
    mainArc,
    `M${sx - 1} ${sy} Q${peakX + 1} ${peakY + 2} ${landX + 1} ${landY}`,
    `M${sx} ${sy - 1} Q${peakX - 1} ${peakY + 1} ${landX - 1} ${landY}`,
  ];

  const t = landOffsetUnits / sx;
  const droplets = [
    { cx: sx - 4 * t, cy: sy - 2 * t, i: 0 },
    { cx: sx - 7 * t, cy: sy - 6 * t, i: 1 },
    { cx: sx - 10 * t, cy: sy - 11 * t, i: 2 },
    { cx: sx - 13 * t, cy: sy - 9 * t, i: 3 },
    { cx: sx - 16 * t, cy: sy - 4 * t, i: 4 },
    { cx: landX, cy: landY - 5, i: 5 },
  ];

  return { trailArcs, droplets, landX, landY };
}

export function computePourPlacement({ canW, canH }, horizontalReachPx = 36) {
  const { viewBox, spoutAnchor } = POUR_STREAM;
  const reach =
    Math.max(POUR_BOUNDS.minHorizontalReachPx, horizontalReachPx) +
    POUR_BOUNDS.arcPaddingPx;

  const width = Math.max(canW * 1.45, reach * 2.2);
  const height = width * (viewBox.height / viewBox.width);

  const spoutOnCanX =
    (WATERING_CAN_SPOUT.x / WATERING_CAN_VIEWBOX.width) * canW;
  const spoutOnCanY =
    (WATERING_CAN_SPOUT.y / WATERING_CAN_VIEWBOX.height) * canH;

  const left = spoutOnCanX - (spoutAnchor.x / viewBox.width) * width;
  const top = spoutOnCanY - (spoutAnchor.y / viewBox.height) * height;

  const geometry = computePourGeometry(horizontalReachPx, width);

  return { left, top, width, height, geometry };
}
