import { useEffect } from "react";
import { STAGE_SECTION_IDS } from "../constants/fragments";
import { getSectionMetrics } from "../utils/sectionMetrics";

function resolveBounds(stageBounds) {
  if (stageBounds) {
    return {
      top: stageBounds.sectionTop ?? stageBounds.top,
      bottom: stageBounds.sectionBottom ?? stageBounds.bottom,
    };
  }

  const sections = STAGE_SECTION_IDS.map((id) => getSectionMetrics(id)).filter(Boolean);
  if (sections.length === 0) return null;

  return {
    top: sections[0].top,
    bottom: sections[sections.length - 1].bottom,
  };
}

/**
 * Keeps scroll within the active stage (Home → Work) while game mode is on.
 */
export function useStageScrollLock(isActive, stageBounds) {
  useEffect(() => {
    if (!isActive) return undefined;

    const clampScroll = () => {
      const bounds = resolveBounds(stageBounds);
      if (!bounds) return;

      const maxScroll = Math.max(bounds.top, bounds.bottom - window.innerHeight);
      const minScroll = bounds.top;

      if (window.scrollY > maxScroll) {
        window.scrollTo(0, maxScroll);
      } else if (window.scrollY < minScroll) {
        window.scrollTo(0, minScroll);
      }
    };

    clampScroll();
    window.addEventListener("scroll", clampScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", clampScroll);
    };
  }, [isActive, stageBounds]);
}
