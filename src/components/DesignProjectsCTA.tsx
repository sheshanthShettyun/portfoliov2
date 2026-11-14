"use client";

import { useCallback, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import DesignWorld, { type MorphOrigin } from "./DesignWorld";
import { ctaPreviews } from "@/data/designProjects";

/* The doorway from the projects directory into the design world.
   The row measures itself on press so the board can grow out of it. */
export default function DesignProjectsCTA() {
  const [open, setOpen] = useState(false);
  const [origin, setOrigin] = useState<MorphOrigin | null>(null);

  const rowRef = useRef<HTMLButtonElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const swatchRefs = useRef<Array<HTMLSpanElement | null>>([]);

  const openWorld = useCallback(() => {
    const row = rowRef.current?.getBoundingClientRect();
    const label = labelRef.current?.getBoundingClientRect();
    if (row && label) {
      setOrigin({
        row,
        label,
        swatches: ctaPreviews.map((_, i) => swatchRefs.current[i]?.getBoundingClientRect() ?? null),
      });
      /* the row's own parts are re-drawn by the morph, so they stand down */
      if (rowRef.current) rowRef.current.style.visibility = "hidden";
    }
    setOpen(true);
  }, []);

  const closeWorld = useCallback(() => {
    setOpen(false);
    setOrigin(null);
    if (rowRef.current) rowRef.current.style.visibility = "";
  }, []);

  return (
    <div className="dw-cta">
      <p className="dw-cta-kicker">Elsewhere</p>
      <button ref={rowRef} type="button" className="dw-cta-btn" onClick={openWorld}>
        <span className="dw-cta-text" ref={labelRef}>
          Want to explore my design projects?
        </span>
        <span className="dw-cta-tail">
          <span className="dw-cta-stack" aria-hidden="true">
            {ctaPreviews.map((p, i) => (
              <span
                key={p.id}
                ref={(el) => {
                  swatchRefs.current[i] = el;
                }}
                className="dw-cta-swatch"
                style={{ backgroundImage: `url('${p.image}')` }}
              />
            ))}
          </span>
          <span className="dw-cta-icon" aria-hidden="true">
            <ArrowUpRight className="h-5 w-5" strokeWidth={1.6} />
          </span>
        </span>
      </button>
      <DesignWorld open={open} onClose={closeWorld} origin={origin} />
    </div>
  );
}
