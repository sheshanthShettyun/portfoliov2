"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useMode } from "@/lib/ModeContext";
import { projectIndexRows, type ProjectIndexRow } from "@/data/projectIndex";
import DesignProjectsCTA from "./DesignProjectsCTA";

export interface ProjectIndexProps {
  rows?: ProjectIndexRow[];
}

type PreviewState = {
  image: string;
  meta: string;
  title: string;
};

// Top rule of the directory. Not a static border: its alpha is driven by the
// final row's reveal band, so it is absent while the wordmark is still alone
// at the center, and fully drawn exactly when the last project lands.
const ruleColor = (amount: number) => `rgba(242, 237, 228, ${(0.08 * amount).toFixed(4)})`;

export default function ProjectIndex({ rows = projectIndexRows }: Readonly<ProjectIndexProps>) {
  const { mode, revealed } = useMode();
  const [preview, setPreview] = useState<PreviewState>({
    image: rows[0]?.image ?? "",
    meta: rows[0]?.meta ?? "",
    title: rows[0]?.title ?? "",
  });
  const [previewActive, setPreviewActive] = useState(false);
  const [previewMounted, setPreviewMounted] = useState(false);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  // Cross-faded backdrop: the outgoing project stays painted while the new
  // one fades over it, so a row change never hard-cuts the imagery.
  const [layers, setLayers] = useState<[string, string]>([
    rows[0]?.image ?? "",
    rows[0]?.image ?? "",
  ]);
  const [front, setFront] = useState(0);
  const rowRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const ruleRef = useRef<HTMLElement>(null);

  const portalRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const glide = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const tiltRef = useRef(0);
  const visible = useRef(false);
  const leaveTimer = useRef<number | null>(null);
  const unmountTimer = useRef<number | null>(null);
  // Which side of the cursor the preview sits on. Flipping has hysteresis:
  // the arrow sits almost exactly on the flip boundary, so without this the
  // preview teleports 475px back and forth as the mouse straddles it.
  const sideRef = useRef<1 | -1>(1);

  // Two-stage damped follow for the floating preview (runs always, cheap).
  // NOTE: portal has NO CSS transition on transform — this loop owns it.
  //  • glide chases the cursor almost immediately, absorbing the quantised
  //    mousemove samples so the travelled path is a continuous curve.
  //  • current trails glide with a longer time constant, giving the panel a
  //    fluid body instead of sticking rigidly to the pointer.
  //  • tilt is derived from lateral velocity and low-passed, so it eases
  //    between angles instead of stepping on every event.
  // All coefficients are exponential in real delta time, so the motion is
  // identical at 60Hz and 120Hz — higher refresh rates simply add frames.
  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const render = (now: number) => {
      raf = requestAnimationFrame(render);
      const p = portalRef.current;
      if (!visible.current || !p) {
        last = now;
        return;
      }
      const dt = Math.min(64, Math.max(1, now - last)) / 1000;
      last = now;

      const aFast = 1 - Math.exp(-dt / 0.028);
      glide.current.x += (target.current.x - glide.current.x) * aFast;
      glide.current.y += (target.current.y - glide.current.y) * aFast;

      const aSlow = 1 - Math.exp(-dt / 0.085);
      current.current.x += (glide.current.x - current.current.x) * aSlow;
      current.current.y += (glide.current.y - current.current.y) * aSlow;

      const desiredTilt = Math.max(
        -8,
        Math.min(8, (glide.current.x - current.current.x) * 0.05),
      );
      tiltRef.current +=
        (desiredTilt - tiltRef.current) * (1 - Math.exp(-dt / 0.1));

      // Sub-pixel output: whole-pixel snapping is visible as 1px stepping
      p.style.transform = `translate3d(${current.current.x.toFixed(2)}px, ${current.current.y.toFixed(2)}px, 0) scale(1) rotate(${tiltRef.current.toFixed(3)}deg)`;
    };
    raf = requestAnimationFrame(render);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Crossfade the backdrop when the previewed project changes: the outgoing
  // image is already painted in the hidden layer, so the new one fades over
  // it instead of hard-cutting when the cursor crosses a row boundary.
  useEffect(() => {
    if (layers[front] === preview.image) return;
    const back = 1 - front;
    setLayers((prev) => {
      const next: [string, string] = [prev[0], prev[1]];
      next[back] = preview.image;
      return next;
    });
    setFront(back);
  }, [preview.image, front, layers]);

  useEffect(
    () => () => {
      if (leaveTimer.current) window.clearTimeout(leaveTimer.current);
      if (unmountTimer.current) window.clearTimeout(unmountTimer.current);
    },
    [],
  );

  // The directory lives on a single screen — no scrolling. On entering
  // projects mode the four rows cascade in once, each owning a quarter of the
  // run, so the reveal still reads one-by-one but is time-driven, not scroll-
  // driven. Returning home clears them.
  useEffect(() => {
    let raf = 0;
    const RUN_MS = 2100;
    const paint = (p: number) => {
      let tail = 0;
      rows.forEach((_, i) => {
        const q = Math.min(1, Math.max(0, (p - i / rows.length) * rows.length));
        if (i === rows.length - 1) tail = q;
        const el = rowRefs.current.get(i);
        if (el) {
          el.style.opacity = String(q);
          el.style.transform = `translateY(${(1 - q) * 22}px)`;
        }
      });
      if (ruleRef.current) ruleRef.current.style.borderTopColor = ruleColor(tail);
    };

    if (mode !== "projects" || !revealed) {
      paint(0);
      return;
    }
    const started = performance.now();
    const frame = (now: number) => {
      const t = Math.min(1, (now - started) / RUN_MS);
      // Smoothstep: the whole cascade eases in and settles, never linear
      paint(t * t * (3 - 2 * t));
      if (t < 1) raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [mode, revealed, rows]);

  // One placement rule for every pointer sample — enter and move compute the
  // exact same target, so crossing from one row into the next can't introduce
  // a jump (different offsets or a reset flip side were what made the panel
  // "disconnect" mid-drag).
  const placePreview = useCallback((clientX: number, clientY: number) => {
    const PREVIEW_W = 420;
    const PREVIEW_H = 270;
    const GAP = 35;
    const xRight = clientX + GAP;
    // Hysteresis band (~160px): flip left only when truly overflowing,
    // flip back right only once well clear of the edge.
    if (sideRef.current === 1 && xRight + PREVIEW_W > window.innerWidth) {
      sideRef.current = -1;
    } else if (
      sideRef.current === -1 &&
      xRight + PREVIEW_W < window.innerWidth - 160
    ) {
      sideRef.current = 1;
    }
    const x = sideRef.current === 1 ? xRight : clientX - (PREVIEW_W + 20);
    let y = clientY - 130;
    if (y < 20) y = 20;
    if (y + PREVIEW_H > window.innerHeight) y = window.innerHeight - 280;
    return { x, y };
  }, []);

  const onRowEnter = useCallback(
    (e: React.MouseEvent, row: ProjectIndexRow, i: number) => {
      if (mode !== "projects" || !revealed) return;
      if (leaveTimer.current) {
        window.clearTimeout(leaveTimer.current);
        leaveTimer.current = null;
      }
      if (unmountTimer.current) {
        window.clearTimeout(unmountTimer.current);
        unmountTimer.current = null;
      }
      // First appearance snaps under the cursor; every later row change keeps
      // the existing position and glides, so the drag reads as one motion.
      const firstAppearance = !visible.current;
      if (firstAppearance) sideRef.current = 1;
      visible.current = true;
      setActiveIdx(i);
      setPreview({
        image: row.image,
        meta: row.meta,
        title: row.title,
      });
      const next = placePreview(e.clientX, e.clientY);
      target.current = next;
      if (firstAppearance) {
        glide.current = { ...next };
        current.current = { ...next };
        tiltRef.current = 0;
      }
      // Mount one frame before activating so the opacity transition has a
      // from-style to animate out of (display:none → block can't fade).
      setPreviewMounted(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setPreviewActive(true));
      });
    },
    [mode, revealed, placePreview],
  );

  const onRowMove = useCallback(
    (e: React.MouseEvent) => {
      if (!visible.current) return;
      target.current = placePreview(e.clientX, e.clientY);
    },
    [placePreview],
  );

  const onRowLeave = useCallback(() => {
    // Rows are contiguous; leaving one means entering the next a millisecond
    // later. A short grace period keeps the panel from blinking between rows
    // — it simply glides on to the new row's content.
    if (leaveTimer.current) window.clearTimeout(leaveTimer.current);
    leaveTimer.current = window.setTimeout(() => {
      visible.current = false;
      setPreviewActive(false);
      setActiveIdx(null);
      leaveTimer.current = null;
      // Keep the node displayed until the fade finishes, then unmount it
      unmountTimer.current = window.setTimeout(() => {
        setPreviewMounted(false);
        unmountTimer.current = null;
      }, 380);
    }, 90);
  }, []);

  return (
    <div>
      {/* Master Floating Interactive Preview Window */}
      <div
        id="floating-preview-portal"
        ref={portalRef}
        className={`${previewMounted ? "mounted " : ""}${previewActive ? "active" : ""}`.trim()}
        aria-hidden
      >
        <div
          className="relative flex h-full w-full flex-col justify-end overflow-hidden p-6"
          id="preview-inner-canvas"
        >
          {layers.map((src, i) => (
            <div
              key={i}
              aria-hidden
              className="preview-backdrop absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(11,11,11,0.2) 0%, rgba(11,11,11,0.85) 100%), url('${src}')`,
                opacity: front === i ? 1 : 0,
              }}
            />
          ))}
          <div className="z-10 rounded-xl border border-white/10 bg-black/80 p-3 backdrop-blur-md">
            <div
              className="mb-1 text-[20px] font-normal leading-none tracking-[-0.02em] text-[#F2EDE4]"
              id="preview-headline"
              style={{ fontFamily: '"PangeaAfrikan", system-ui, sans-serif' }}
            >
              {preview.title}
            </div>
            <div
              className="text-[16px] font-normal leading-[112%] tracking-[-0.014em] text-[#85817B]"
              id="preview-meta"
              style={{ fontFamily: '"PangeaAfrikan", system-ui, sans-serif' }}
            >
              {preview.meta}
            </div>
          </div>
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#C6F68D]/15 via-transparent to-transparent"
            id="preview-glow"
          />
        </div>
      </div>

      {/* Editorial Project Index Directory */}
      <section
        aria-label="Selected Projects Directory"
        className="z-30 mx-auto mb-4 mt-0 w-full max-w-6xl border-t px-4 pt-4 sm:px-8"
        id="editorial-projects-section"
        ref={ruleRef}
        style={{ borderTopColor: ruleColor(0) }}
      >
        {/* Editorial Rows */}
        <div className="flex w-full flex-col divide-y divide-white/5">
          {rows.map((row, i) => (
            <div
              key={row.index}
              ref={(el) => {
                if (el) rowRefs.current.set(i, el);
              }}
              className={`project-row group flex cursor-pointer flex-col justify-between gap-4 px-3 py-7 opacity-0 sm:px-6 sm:py-9 md:flex-row md:items-center${
                activeIdx === i
                  ? " row-active"
                  : activeIdx !== null
                    ? " row-dim"
                    : ""
              }`}
              style={{
                "--row-color": row.color,
              } as React.CSSProperties}
              onMouseEnter={(e) => onRowEnter(e, row, i)}
              onMouseMove={onRowMove}
              onMouseLeave={onRowLeave}
            >
              <div className="flex items-baseline">
                <h3 className="row-title font-display text-[1.5rem] font-bold tracking-tight text-[#ECEBE4] sm:text-[1.7rem] md:text-[1.9rem]">
                  {row.title}
                </h3>
              </div>
              <div className="flex items-center justify-between gap-6 sm:gap-10 md:justify-end">
                <div className="row-tags flex items-center gap-2 text-xs text-[#85817B]">
                  {row.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 px-2.5 py-1 text-white/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="row-arrow" style={{ color: row.color }}>
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M7 17L17 7M17 7H7M17 7V17"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <DesignProjectsCTA />
    </div>
  );
}
