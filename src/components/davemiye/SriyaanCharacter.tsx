"use client";

import { useEffect, useRef } from "react";
import { sriyaanAvatarPaths } from "./sriyaanAvatarPaths";

type AvatarVariant = keyof typeof sriyaanAvatarPaths;

function SriyaanAvatar({ variant, setRef }: { variant: AvatarVariant; setRef: (svg: SVGSVGElement | null) => void }) {
  const paths = sriyaanAvatarPaths[variant];
  const silhouetteFilterId = `dm-character-silhouette-filter-${variant}`;

  return (
    <>
      <svg
        className={`dm-character-silhouette dm-character-silhouette--${variant}`}
        viewBox="0 0 1254 1254"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <filter
            id={silhouetteFilterId}
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
            colorInterpolationFilters="sRGB"
          >
            <feMorphology in="SourceGraphic" operator="dilate" radius="24" result="expanded" />
            <feGaussianBlur in="expanded" stdDeviation="1.5" />
          </filter>
        </defs>
        <g filter={`url(#${silhouetteFilterId})`} fill="var(--paper)" fillRule="evenodd">
          <path d={paths.linework} />
          <path d={paths.glasses} />
          <path d={paths.accents} />
        </g>
      </svg>
      <svg
        className={`dm-character-art dm-character-art--${variant}`}
        ref={setRef}
        viewBox="0 0 1254 1254"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Sriyaan character"
        focusable="false"
      >
        <path className="dm-avatar-linework" fill="currentColor" fillRule="evenodd" d={paths.linework} />
        <path className="dm-avatar-accent" fill="#ed202a" fillRule="evenodd" d={paths.glasses} />
        <path className="dm-avatar-accent" fill="#315cff" fillRule="evenodd" d={paths.accents} />
      </svg>
    </>
  );
}

export default function SriyaanCharacter() {
  const containerRef = useRef<HTMLDivElement>(null);
  const characterRefs = useRef<Array<SVGSVGElement | null>>([]);
  const frameRef = useRef(0);

  const eachSvg = (callback: (svg: SVGSVGElement) => void) => {
    characterRefs.current.forEach((character) => {
      if (character) callback(character);
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
      <SriyaanAvatar variant="dark" setRef={(element) => { characterRefs.current[0] = element; }} />
      <SriyaanAvatar variant="light" setRef={(element) => { characterRefs.current[1] = element; }} />
    </div>
  );
}
