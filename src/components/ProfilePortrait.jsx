import { useCallback, useEffect, useState } from "react";
import {
  PORTRAIT_VIEWS,
  readPortraitView,
  writePortraitView,
} from "../constants/portraitView";
import { useReducedMotion } from "../hooks/useReducedMotion";
import PixelPortrait, { PORTRAIT_SIZE } from "./PixelPortrait";
import styles from "../styles/PixelPortrait.module.css";

const DESKTOP_QUERY = "(min-width: 992px)";

/**
 * Sidebar profile — original photo by default, optional interactive pixel portrait.
 * Preference persisted in localStorage.
 */
export default function ProfilePortrait({ src, alt = "Dara" }) {
  const reducedMotion = useReducedMotion();
  const [desktop, setDesktop] = useState(false);
  const [view, setView] = useState(readPortraitView);

  useEffect(() => {
    const media = window.matchMedia(DESKTOP_QUERY);
    const update = () => setDesktop(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const isPortrait = view === PORTRAIT_VIEWS.PORTRAIT;
  const showPixel = isPortrait && !reducedMotion;

  const toggleView = useCallback(() => {
    setView((current) => {
      const next =
        current === PORTRAIT_VIEWS.ORIGINAL
          ? PORTRAIT_VIEWS.PORTRAIT
          : PORTRAIT_VIEWS.ORIGINAL;
      writePortraitView(next);
      return next;
    });
  }, []);

  if (!desktop) return null;

  const toggleLabel = isPortrait ? "Original" : "Portrait";
  const toggleHint = isPortrait
    ? "Show original profile photo"
    : "Show interactive pixel portrait";

  return (
    <div className={styles.profileBlock}>
      <button
        type="button"
        className={styles.viewToggle}
        onClick={toggleView}
        aria-pressed={isPortrait}
        aria-label={toggleHint}
      >
        {toggleLabel}
      </button>

      {showPixel ? (
        <PixelPortrait src={src} alt={alt} size={PORTRAIT_SIZE} />
      ) : (
        <div className={styles.frame}>
          <img
            src={src}
            alt={alt}
            className={styles.staticImg}
            width={PORTRAIT_SIZE}
            height={PORTRAIT_SIZE}
            decoding="async"
          />
        </div>
      )}
    </div>
  );
}
