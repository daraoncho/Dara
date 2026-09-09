import { BLOCK_H, PLATFORM_SELECTORS, USE_DOM_PLATFORMS } from "../constants/gameConfig";
import { isInPlayArea } from "./playArea";

/**
 * Collect visible DOM platforms and generated ledges for collision detection.
 * DOM queries are served from platformCache when provided.
 */
export function collectPlatforms(blocks, playArea, scrollY, platformCache) {
  const ledgePlatforms = blocks
    .filter((block) => block.alpha > 0.45)
    .map((block) => ({ x: block.x, y: block.docY, w: block.w }));

  if (!USE_DOM_PLATFORMS) return ledgePlatforms;

  const domPlatforms = platformCache
    ? platformCache.getDomPlatforms(playArea, scrollY)
    : queryDomPlatforms(playArea, scrollY);

  return ledgePlatforms.concat(domPlatforms);
}

function queryDomPlatforms(playArea, scrollY) {
  const viewBottom = scrollY + window.innerHeight + 200;
  const viewTop = scrollY - 200;
  const platforms = [];

  PLATFORM_SELECTORS.forEach((selector) => {
    document.querySelectorAll(selector).forEach((element) => {
      const rect = element.getBoundingClientRect();
      if (rect.width < 60 || rect.height > 120 || rect.height < 4) return;
      if (!isInPlayArea(rect, playArea)) return;

      const docTop = rect.top + scrollY;
      if (docTop > viewBottom || docTop + rect.height < viewTop) return;

      platforms.push({ x: rect.left, y: docTop, w: rect.width });
    });
  });

  return platforms;
}

/** Nudge a ledge downward if it would overlap short text lines. */
export function adjustForTextZones(docY, textZones) {
  let y = docY;
  for (let pass = 0; pass < 4; pass += 1) {
    const hit = textZones.find((zone) => y < zone.bot && y + BLOCK_H > zone.top);
    if (!hit) break;
    y = hit.bot + 5;
  }
  return y;
}

/** Build DOM collision zones used when scattering ledges and fragments. */
export function collectDomZones(playArea) {
  const allDomZones = [];
  const textZones = [];

  if (!USE_DOM_PLATFORMS) return { allDomZones, textZones };

  PLATFORM_SELECTORS.forEach((selector) => {
    document.querySelectorAll(selector).forEach((element) => {
      const rect = element.getBoundingClientRect();
      if (rect.width < 60 || rect.height < 4) return;
      if (!isInPlayArea(rect, playArea)) return;

      allDomZones.push({ top: rect.top - 4, bot: rect.bottom + 4 });
      if (rect.height <= 55) {
        textZones.push({ top: rect.top - 4, bot: rect.bottom + 4 });
      }
    });
  });

  return { allDomZones, textZones };
}

export function clearZone(docY, avoidZones) {
  let y = docY;
  for (let pass = 0; pass < 8; pass += 1) {
    const hit = avoidZones.find(
      (zone) => y - 20 < zone.bot && y + BLOCK_H + 4 > zone.top,
    );
    if (!hit) break;
    y = hit.bot + 10;
  }
  return y;
}
