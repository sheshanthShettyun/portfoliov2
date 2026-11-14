"use client";

import { useEffect, useRef } from "react";

export default function SriyaanCharacter() {
  const containerRef = useRef<HTMLDivElement>(null);
  const characterRefs = useRef<Array<HTMLObjectElement | null>>([]);
  const frameRef = useRef(0);

  const eachSvg = (callback: (svg: Document) => void) => {
    characterRefs.current.forEach((character) => {
      if (character?.contentDocument) callback(character.contentDocument);
    });
  };

  const resetEyes = () => {
    cancelAnimationFrame(frameRef.current);
    eachSvg((svg) => {
      svg.querySelectorAll<SVGGraphicsElement>("[data-gaze-eye]").forEach((eye) => {
        eye.setAttribute("transform", "translate(0 0)");
      });
    });
  };

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const handlePointerMove = (event: PointerEvent) => {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = requestAnimationFrame(() => {
        const x = (event.clientX / window.innerWidth - 0.5) * 48;
        const y = (event.clientY / window.innerHeight - 0.5) * 36;
        eachSvg((svg) => {
          svg.querySelectorAll<SVGGraphicsElement>("[data-gaze-eye]").forEach((eye) => {
            eye.setAttribute("transform", `translate(${x} ${y})`);
          });
        });
      });
    };
    const handlePointerOut = (event: PointerEvent) => {
      if (event.relatedTarget === null) resetEyes();
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerout", handlePointerOut, { passive: true });
    window.addEventListener("blur", resetEyes);
    containerRef.current?.addEventListener("pointerleave", resetEyes);
    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerout", handlePointerOut);
      window.removeEventListener("blur", resetEyes);
      containerRef.current?.removeEventListener("pointerleave", resetEyes);
    };
  }, []);

  return (
    <div ref={containerRef} className="dm-character" aria-hidden="true" onPointerLeave={resetEyes}>
      <object className="dm-character-art dm-character-art--dark" ref={(element) => { characterRefs.current[0] = element; }} data="/images/sriyaan-character-dark.svg" type="image/svg+xml" aria-label="Sriyaan character" />
      <object className="dm-character-art dm-character-art--light" ref={(element) => { characterRefs.current[1] = element; }} data="/images/sriyaan-character-light.svg" type="image/svg+xml" aria-label="Sriyaan character" />
    </div>
  );
}
