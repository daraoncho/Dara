import { DESKTOP_BREAKPOINT } from "../constants/gameConfig";

const DEFAULT_SIDEBAR_WIDTH = 240;
const DEFAULT_MOBILE_NAV_HEIGHT = 64;

/**
 * Returns the playable viewport rectangle (content column on desktop).
 * Coordinates are in CSS pixels relative to the viewport.
 */
export function getPlayArea() {
  const sidebarVar = getComputedStyle(document.documentElement)
    .getPropertyValue("--sidebar-width")
    .trim();
  const sidebarWidth = parseInt(sidebarVar, 10) || DEFAULT_SIDEBAR_WIDTH;
  const isDesktop = window.innerWidth >= DESKTOP_BREAKPOINT;

  let left = 0;
  let top = 0;

  if (isDesktop) {
    left = sidebarWidth;
  } else {
    const navbar = document.querySelector("[data-game-navbar]");
    top = navbar ? navbar.getBoundingClientRect().bottom : DEFAULT_MOBILE_NAV_HEIGHT;
  }

  return {
    left,
    top,
    width: Math.max(0, window.innerWidth - left),
    height: Math.max(0, window.innerHeight - top),
    isDesktop,
  };
}

/** Clamp a horizontal canvas coordinate inside the play area. */
export function clampX(x, playArea, entityWidth) {
  const min = playArea.left;
  const max = playArea.left + playArea.width - entityWidth;
  return Math.min(Math.max(x, min), Math.max(min, max));
}

/** True when a DOM rect overlaps the play column horizontally. */
export function isInPlayArea(rect, playArea) {
  return rect.right > playArea.left && rect.left < playArea.left + playArea.width;
}
