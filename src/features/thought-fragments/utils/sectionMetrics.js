/** Document-space geometry for a portfolio section element. */
export function getSectionMetrics(sectionId) {
  const element = document.getElementById(sectionId);
  if (!element) return null;

  const rect = element.getBoundingClientRect();
  const scrollY = window.scrollY;

  return {
    top: rect.top + scrollY,
    bottom: rect.bottom + scrollY,
    height: rect.height,
    width: rect.width,
  };
}

/** Wait two frames so scroll + layout settle before measuring DOM. */
export function waitForLayout() {
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(resolve);
    });
  });
}
