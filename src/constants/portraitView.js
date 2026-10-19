export const PORTRAIT_VIEW_STORAGE_KEY = "dara-profile-portrait-view";

export const PORTRAIT_VIEWS = {
  ORIGINAL: "original",
  PORTRAIT: "portrait",
};

export function readPortraitView() {
  try {
    const stored = localStorage.getItem(PORTRAIT_VIEW_STORAGE_KEY);
    if (stored === PORTRAIT_VIEWS.PORTRAIT || stored === PORTRAIT_VIEWS.ORIGINAL) {
      return stored;
    }
  } catch {
    /* private browsing / blocked storage */
  }
  return PORTRAIT_VIEWS.ORIGINAL;
}

export function writePortraitView(view) {
  try {
    localStorage.setItem(PORTRAIT_VIEW_STORAGE_KEY, view);
  } catch {
    /* ignore */
  }
}
