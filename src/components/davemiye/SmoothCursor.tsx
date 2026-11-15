"use client";

import { useEffect, useRef } from "react";

const DOT_RADIUS = 4;
const FOLLOW_SPEED = 0.2;

export default function SmoothCursor() {
  const cursorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const finePointer = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!cursor || !finePointer.matches || reducedMotion.matches) return;

    const root = document.documentElement;
    let frame = 0;
    let visible = false;
    let targetX = -100;
    let targetY = -100;
    let currentX = targetX;
    let currentY = targetY;

    root.classList.add("dm-custom-cursor");

    const render = () => {
      currentX += (targetX - currentX) * FOLLOW_SPEED;
      currentY += (targetY - currentY) * FOLLOW_SPEED;
      cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;

      if (Math.abs(targetX - currentX) > 0.1 || Math.abs(targetY - currentY) > 0.1) {
        frame = requestAnimationFrame(render);
      } else {
        frame = 0;
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;

      targetX = event.clientX - DOT_RADIUS;
      targetY = event.clientY - DOT_RADIUS;

      if (!visible) {
        currentX = targetX;
        currentY = targetY;
        cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
        cursor.style.opacity = "1";
        visible = true;
      }

      if (!frame) frame = requestAnimationFrame(render);
    };

    const hideCursor = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      cursor.style.opacity = "0";
      visible = false;
    };

    const handlePointerOut = (event: PointerEvent) => {
      if (event.relatedTarget === null) hideCursor();
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerout", handlePointerOut, { passive: true });
    window.addEventListener("blur", hideCursor);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerout", handlePointerOut);
      window.removeEventListener("blur", hideCursor);
      root.classList.remove("dm-custom-cursor");
    };
  }, []);

  return <span ref={cursorRef} className="dm-cursor" aria-hidden="true" />;
}
