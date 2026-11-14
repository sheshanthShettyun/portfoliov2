type ViewTransition = {
  ready: Promise<void>;
  finished: Promise<void>;
};

type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => void) => ViewTransition;
};

export function switchThemeWithReveal(theme: "light" | "dark", origin: { x: number; y: number }) {
  const root = document.documentElement;
  try {
    localStorage.setItem("dm:theme", theme);
  } catch {
    // Theme changes should still work when storage is unavailable.
  }

  const commit = () => {
    root.dataset.theme = theme;
  };
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const viewDocument = document as ViewTransitionDocument;
  if (!viewDocument.startViewTransition || reducedMotion) {
    commit();
    return;
  }

  root.classList.add("theme-switching");
  const transition = viewDocument.startViewTransition(commit);
  transition.finished.finally(() => root.classList.remove("theme-switching"));
  const radius = Math.hypot(Math.max(origin.x, innerWidth - origin.x), Math.max(origin.y, innerHeight - origin.y));
  transition.ready.then(() => {
    root.animate(
      { clipPath: [`circle(0px at ${origin.x}px ${origin.y}px)`, `circle(${radius}px at ${origin.x}px ${origin.y}px)`] },
      { duration: 750, easing: "cubic-bezier(0.22, 1, 0.36, 1)", pseudoElement: "::view-transition-new(root)" },
    );
  }).catch(() => {});
}
