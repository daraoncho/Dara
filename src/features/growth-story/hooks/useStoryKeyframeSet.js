import { useEffect, useState } from "react";
import { STORY_RAIL } from "../constants/rail";
import {
  STORY_KEYFRAME,
  STORY_KEYFRAME_NARROW,
} from "../constants/animation";

export function useStoryKeyframeSet() {
  const [narrow, setNarrow] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth < STORY_RAIL.breakpointPx;
  });

  useEffect(() => {
    const mq = window.matchMedia(
      `(max-width: ${STORY_RAIL.breakpointPx - 1}px)`,
    );
    const sync = () => setNarrow(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return narrow ? STORY_KEYFRAME_NARROW : STORY_KEYFRAME;
}
