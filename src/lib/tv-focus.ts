import { useEffect } from "react";

export const FOCUSABLE = "[data-tv-focusable]:not([disabled])";

type Dir = "left" | "right" | "up" | "down";

function visibleFocusables(scope?: HTMLElement | null) {
  const root = scope ?? document;
  return Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((el) => {
    const r = el.getBoundingClientRect();
    return r.width > 0 && r.height > 0;
  });
}

function center(el: HTMLElement) {
  const r = el.getBoundingClientRect();
  return { x: r.left + r.width / 2, y: r.top + r.height / 2, r };
}

function bestCandidate(current: HTMLElement, dir: Dir) {
  const from = center(current);
  let best: HTMLElement | null = null;
  let bestScore = Number.POSITIVE_INFINITY;

  for (const el of visibleFocusables()) {
    if (el === current) continue;
    const to = center(el);
    const dx = to.x - from.x;
    const dy = to.y - from.y;

    const primary =
      dir === "left" ? -dx : dir === "right" ? dx : dir === "up" ? -dy : dy;
    if (primary <= 4) continue;
    const secondary = dir === "left" || dir === "right" ? Math.abs(dy) : Math.abs(dx);
    if (secondary > primary * 3 + 220) continue;

    const score = primary + secondary * 2.2;
    if (score < bestScore) {
      bestScore = score;
      best = el;
    }
  }
  return best;
}

export function focusElement(el: HTMLElement | null) {
  if (!el) return;
  el.focus({ preventScroll: true });
  el.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
}

/** Global DPad spatial navigation for the LG magic remote / arrow keys. */
export function useSpatialNavigation(onBack?: () => void) {
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      const key = event.key;
      const code = event.keyCode;

      // webOS back button
      if (key === "Backspace" || key === "GoBack" || code === 461) {
        if (onBack) {
          event.preventDefault();
          onBack();
        }
        return;
      }

      const dir: Dir | null =
        key === "ArrowLeft" || code === 37
          ? "left"
          : key === "ArrowRight" || code === 39
            ? "right"
            : key === "ArrowUp" || code === 38
              ? "up"
              : key === "ArrowDown" || code === 40
                ? "down"
                : null;

      if (!dir) return;

      const active = document.activeElement as HTMLElement | null;
      if (active && (active.tagName === "INPUT" || active.tagName === "TEXTAREA")) return;

      event.preventDefault();

      if (!active || !active.matches(FOCUSABLE)) {
        focusElement(visibleFocusables()[0] ?? null);
        return;
      }
      focusElement(bestCandidate(active, dir));
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onBack]);
}

/** Focus the first focusable element inside the page after mount. */
export function useAutoFocusFirst(deps: unknown[] = []) {
  useEffect(() => {
    const id = window.setTimeout(() => {
      const active = document.activeElement as HTMLElement | null;
      if (active && active.matches?.(FOCUSABLE)) return;
      const first = document.querySelector<HTMLElement>("[data-tv-autofocus]") ??
        visibleFocusables()[0];
      focusElement(first ?? null);
    }, 120);
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
