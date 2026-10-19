import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useReducedMotion } from "../../../hooks/useReducedMotion";
import { STORY_BEAT, STORY_PHASE } from "../constants/animation";

function measureWalkDistancePx(soilEl, protagonistEl) {
  if (!soilEl || !protagonistEl) return 0;
  const soil = soilEl.getBoundingClientRect();
  const protag = protagonistEl.getBoundingClientRect();
  const targetLeft = soil.right + STORY_BEAT.soilStandoffPx;
  return Math.max(0, Math.round(protag.left - targetLeft));
}

/**
 * Runs idle → walk → water → done when the stage enters the viewport (once).
 * Walk distance is measured from layout so it stays correct across breakpoints.
 */
export function useGrowthStoryBeat({ stageRef, soilRef, protagonistRef }) {
  const reducedMotion = useReducedMotion();
  const [phase, setPhase] = useState(STORY_PHASE.IDLE);
  const [walkDistancePx, setWalkDistancePx] = useState(0);
  const [layoutReady, setLayoutReady] = useState(false);
  const startedRef = useRef(false);
  const waterTimerRef = useRef(null);

  const measure = useCallback(() => {
    const distance = measureWalkDistancePx(soilRef.current, protagonistRef.current);
    setWalkDistancePx(distance);
    setLayoutReady(distance > 0 || soilRef.current != null);
  }, [soilRef, protagonistRef]);

  useLayoutEffect(() => {
    measure();
    const stage = stageRef.current;
    if (!stage || typeof ResizeObserver === "undefined") return undefined;

    const ro = new ResizeObserver(() => measure());
    ro.observe(stage);
    return () => ro.disconnect();
  }, [measure, stageRef]);

  const finishReducedMotion = useCallback(() => {
    measure();
    setPhase(STORY_PHASE.DONE);
  }, [measure]);

  const beginSequence = useCallback(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    if (reducedMotion) {
      finishReducedMotion();
      return;
    }

    measure();
    window.setTimeout(() => {
      setPhase(STORY_PHASE.WALK);
    }, STORY_BEAT.idleBeforeWalkMs);
  }, [reducedMotion, finishReducedMotion, measure]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || typeof IntersectionObserver === "undefined") {
      beginSequence();
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) beginSequence();
      },
      { threshold: STORY_BEAT.intersectionThreshold },
    );

    observer.observe(stage);
    return () => observer.disconnect();
  }, [stageRef, beginSequence]);

  const onWalkAnimationEnd = useCallback(() => {
    setPhase((current) => {
      if (current !== STORY_PHASE.WALK) return current;
      return STORY_PHASE.WATER;
    });
  }, []);

  useEffect(() => {
    if (phase !== STORY_PHASE.WATER) return undefined;

    waterTimerRef.current = window.setTimeout(() => {
      setPhase(STORY_PHASE.DONE);
    }, STORY_BEAT.waterDurationMs);

    return () => {
      if (waterTimerRef.current) {
        window.clearTimeout(waterTimerRef.current);
      }
    };
  }, [phase]);

  const sprinkleActive = phase === STORY_PHASE.WATER;
  const atSoil =
    phase === STORY_PHASE.WATER ||
    phase === STORY_PHASE.DONE ||
    (reducedMotion && phase === STORY_PHASE.DONE);

  return {
    phase,
    walkDistancePx,
    layoutReady,
    walkDurationMs: STORY_BEAT.walkDurationMs,
    onWalkAnimationEnd,
    sprinkleActive,
    atSoil,
    reducedMotion,
  };
}
