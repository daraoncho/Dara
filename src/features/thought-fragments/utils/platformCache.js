import { PLATFORM_SELECTORS } from "../constants/gameConfig";
import { isInPlayArea } from "./playArea";

const SCROLL_BUCKET = 120;

/**
 * Caches DOM platform queries — rebuilt when scroll bucket or play area changes.
 */
export function createPlatformCache() {
  let bucket = null;
  let playKey = null;
  let domPlatforms = [];

  return {
    getDomPlatforms(playArea, scrollY) {
      const nextBucket = Math.floor(scrollY / SCROLL_BUCKET);
      const nextPlayKey = `${playArea.left}|${playArea.width}`;

      if (nextBucket === bucket && nextPlayKey === playKey) {
        return domPlatforms;
      }

      bucket = nextBucket;
      playKey = nextPlayKey;

      const viewBottom = scrollY + window.innerHeight + 200;
      const viewTop = scrollY - 200;
      domPlatforms = [];

      PLATFORM_SELECTORS.forEach((selector) => {
        document.querySelectorAll(selector).forEach((element) => {
          const rect = element.getBoundingClientRect();
          if (rect.width < 60 || rect.height > 120 || rect.height < 4) return;
          if (!isInPlayArea(rect, playArea)) return;

          const docTop = rect.top + scrollY;
          if (docTop > viewBottom || docTop + rect.height < viewTop) return;

          domPlatforms.push({ x: rect.left, y: docTop, w: rect.width });
        });
      });

      return domPlatforms;
    },

    invalidate() {
      bucket = null;
      playKey = null;
      domPlatforms = [];
    },
  };
}
