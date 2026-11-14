"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { BOARD_H, BOARD_W, ctaPreviews, designPieces, type DesignPiece } from "@/data/designProjects";

const ease = [0.22, 1, 0.36, 1] as const;
/* How long the button takes to become the board. */
const MORPH_S = 0.92;

/* Zoom limits and how much empty space to leave around the board when fitting. */
const MIN_S = 0.3;
const MAX_S = 2.4;
const FIT_PAD = 120;
/* How fast the view eases toward its goal, and how quickly a fling decays. */
const FOLLOW = 0.18;
const FRICTION = 0.93;
const MIN_FLING = 0.15;
/* Cursor parallax amplitude in world units (subtle by design). */
const PARALLAX = 16;

type View = { x: number; y: number; s: number };
type Ptr = { clientX: number; clientY: number; pointerId: number };

const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));

/* The entry button's own geometry, measured the instant it is pressed. */
export interface MorphOrigin {
  row: DOMRect;
  label: DOMRect;
  swatches: Array<DOMRect | null>;
}

export interface DesignWorldProps {
  open: boolean;
  onClose: () => void;
  origin?: MorphOrigin | null;
}

export default function DesignWorld({ open, onClose, origin }: Readonly<DesignWorldProps>) {
  const [mounted, setMounted] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const [morphDone, setMorphDone] = useState(false);

  const stageRef = useRef<HTMLDivElement>(null);
  const planeRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  /* live view, goal view, fling velocity, cursor parallax */
  const view = useRef<View>({ x: 0, y: 0, s: 1 });
  const goal = useRef<View>({ x: 0, y: 0, s: 1 });
  const vel = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const par = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const parGoal = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const layerRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  const openRef = useRef(false);
  const reduceRef = useRef(false);
  const draggingRef = useRef(false);
  const movedRef = useRef(false);
  const pointers = useRef<Map<number, { x: number; y: number }>>(new Map());
  const pinchRef = useRef<{ d: number; s: number; x: number; y: number; mx: number; my: number } | null>(null);
  const panRef = useRef<{ x: number; y: number } | null>(null);
  const fittedRef = useRef(false);
  const timers = useRef<number[]>([]);

  /* Every open plays the morph exactly once. */
  const [wasOpen, setWasOpen] = useState(false);
  if (open !== wasOpen) {
    setWasOpen(open);
    if (open) setMorphDone(false);
  }
  const morphOn = !!origin && !reduceRef.current && !morphDone;
  const morphingRef = useRef(false);
  morphingRef.current = morphOn;

  useEffect(() => {
    setMounted(true);
    reduceRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    return () => timers.current.forEach(window.clearTimeout);
  }, []);

  useEffect(() => {
    openRef.current = open;
  }, [open]);

  /* Park the morph once it has played, so the live board takes over. */
  useEffect(() => {
    if (!open || !origin || reduceRef.current) return;
    const id = window.setTimeout(() => setMorphDone(true), MORPH_S * 1000);
    timers.current.push(id);
    return () => window.clearTimeout(id);
  }, [open, origin]);

  const vp = useCallback(() => {
    const r = stageRef.current?.getBoundingClientRect();
    return { w: r?.width ?? window.innerWidth, h: r?.height ?? window.innerHeight };
  }, []);

  /* Fit the whole board, centred, with padding. */
  const fit = useCallback(() => {
    const { w, h } = vp();
    const s = clamp(Math.min(w / (BOARD_W + FIT_PAD), h / (BOARD_H + FIT_PAD)), MIN_S, MAX_S);
    goal.current = { s, x: (w - BOARD_W * s) / 2, y: (h - BOARD_H * s) / 2 };
    view.current = { ...goal.current };
  }, [vp]);

  /* Keep at least a third of the board on screen so it can never be lost. */
  const clampGoal = useCallback(() => {
    const { w, h } = vp();
    const g = goal.current;
    const bw = BOARD_W * g.s;
    const bh = BOARD_H * g.s;
    g.x = clamp(g.x, w * 0.35 - bw, w * 0.65);
    g.y = clamp(g.y, h * 0.35 - bh, h * 0.65);
  }, [vp]);

  /* Lock the page while the world is up. Reserving the scrollbar keeps the
     measured button exactly where the reader left it. */
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const sbw = window.innerWidth - root.clientWidth;
    if (sbw > 0) root.style.setProperty("--sbw", `${sbw}px`);
    root.classList.add("dw-lock");
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      root.classList.remove("dw-lock");
      root.style.removeProperty("--sbw");
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  /* Fit once the stage has real dimensions. */
  useEffect(() => {
    if (!open) {
      fittedRef.current = false;
      return;
    }
    setFocused(null);
    const id = requestAnimationFrame(() => {
      fit();
      fittedRef.current = true;
    });
    const onResize = () => {
      if (!fittedRef.current) return;
      clampGoal();
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("resize", onResize);
    };
  }, [open, fit, clampGoal]);

  /* The single animation loop. Writes transforms straight to the DOM. */
  useEffect(() => {
    let raf = 0;
    const loop = () => {
      if (openRef.current) {
        const v = view.current;
        const g = goal.current;
        const reduce = reduceRef.current;

        if (!draggingRef.current) {
          const fl = vel.current;
          if (Math.abs(fl.x) > MIN_FLING || Math.abs(fl.y) > MIN_FLING) {
            g.x += fl.x;
            g.y += fl.y;
            fl.x *= FRICTION;
            fl.y *= FRICTION;
            clampGoal();
          } else {
            fl.x = 0;
            fl.y = 0;
          }
        }

        const k = reduce ? 1 : FOLLOW;
        v.x += (g.x - v.x) * k;
        v.y += (g.y - v.y) * k;
        v.s += (g.s - v.s) * k;

        if (planeRef.current) {
          planeRef.current.style.transform = `translate3d(${v.x.toFixed(2)}px, ${v.y.toFixed(2)}px, 0) scale(${v.s.toFixed(4)})`;
        }
        /* Graph paper pans but doesn't scale: an endless surface, not a zoomed image. */
        if (gridRef.current) {
          gridRef.current.style.backgroundPosition = `${v.x.toFixed(1)}px ${v.y.toFixed(1)}px`;
        }

        /* Depth: far drifts against the cursor, near drifts with it.
           Held still while the button is still becoming the board, so the
           morph lands on the exact rects the board will settle at. */
        const p = par.current;
        if (morphingRef.current) {
          p.x = 0;
          p.y = 0;
          parGoal.current = { x: 0, y: 0 };
        } else {
          p.x += (parGoal.current.x - p.x) * (reduce ? 1 : 0.06);
          p.y += (parGoal.current.y - p.y) * (reduce ? 1 : 0.06);
        }
        layerRefs.current.forEach((el, layer) => {
          const amt = layer === 0 ? -0.4 : layer === 1 ? 0.2 : 0.75;
          el.style.transform = `translate3d(${(p.x * amt).toFixed(2)}px, ${(p.y * amt).toFixed(2)}px, 0)`;
        });
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [clampGoal]);

  /* Wheel zoom, anchored on the cursor. */
  useEffect(() => {
    const el = stageRef.current;
    if (!open || !el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const r = el.getBoundingClientRect();
      const v = view.current;
      const g = goal.current;
      const px = e.clientX - r.left;
      const py = e.clientY - r.top;
      const ns = clamp(v.s * Math.exp(-e.deltaY * 0.0016), MIN_S, MAX_S);
      const wx = (px - v.x) / v.s;
      const wy = (py - v.y) / v.s;
      g.s = ns;
      g.x = px - wx * ns;
      g.y = py - wy * ns;
      vel.current = { x: 0, y: 0 };
      clampGoal();
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [open, clampGoal]);

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    movedRef.current = false;
    vel.current = { x: 0, y: 0 };

    if (pointers.current.size === 1) {
      panRef.current = { x: e.clientX, y: e.clientY };
      draggingRef.current = true;
      pinchRef.current = null;
    } else if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      const v = view.current;
      pinchRef.current = {
        d: Math.hypot(a.x - b.x, a.y - b.y),
        s: v.s,
        x: v.x,
        y: v.y,
        mx: (a.x + b.x) / 2,
        my: (a.y + b.y) / 2,
      };
      draggingRef.current = true;
      panRef.current = null;
    }
  };

  /* Tracked on the window rather than the stage: no pointer capture, so a
     click still lands on the card under the cursor instead of the stage. */
  const handleMove = useCallback(
    (e: Ptr) => {
      if (!draggingRef.current && !morphingRef.current) {
        const r = stageRef.current?.getBoundingClientRect();
        if (r) {
          parGoal.current = {
            x: ((e.clientX - r.left) / r.width - 0.5) * 2 * PARALLAX,
            y: ((e.clientY - r.top) / r.height - 0.5) * 2 * PARALLAX,
          };
        }
      }

      if (!pointers.current.has(e.pointerId)) return;
      pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

      if (pinchRef.current && pointers.current.size >= 2) {
        const [a, b] = [...pointers.current.values()];
        const p = pinchRef.current;
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        const mx = (a.x + b.x) / 2;
        const my = (a.y + b.y) / 2;
        const ns = clamp(p.s * (d / Math.max(1, p.d)), MIN_S, MAX_S);
        const wx = (p.mx - p.x) / p.s;
        const wy = (p.my - p.y) / p.s;
        const g = goal.current;
        g.s = ns;
        g.x = mx - wx * ns;
        g.y = my - wy * ns;
        view.current = { ...g };
        movedRef.current = true;
        clampGoal();
        return;
      }

      if (panRef.current) {
        const dx = e.clientX - panRef.current.x;
        const dy = e.clientY - panRef.current.y;
        if (Math.abs(dx) + Math.abs(dy) > 3) movedRef.current = true;
        panRef.current = { x: e.clientX, y: e.clientY };
        const v = view.current;
        const g = goal.current;
        g.x += dx;
        g.y += dy;
        v.x = g.x;
        v.y = g.y;
        vel.current = { x: dx, y: dy };
        clampGoal();
      }
    },
    [clampGoal],
  );

  const handleUp = useCallback((e: Ptr) => {
    pointers.current.delete(e.pointerId);

    if (pointers.current.size === 1) {
      /* Lifted one finger of a pinch: continue as a pan from the survivor. */
      const [only] = [...pointers.current.values()];
      pinchRef.current = null;
      panRef.current = { x: only.x, y: only.y };
      draggingRef.current = true;
      return;
    }
    if (pointers.current.size === 0) {
      pinchRef.current = null;
      panRef.current = null;
      draggingRef.current = false;
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    const move = (e: PointerEvent) => handleMove(e);
    const up = (e: PointerEvent) => handleUp(e);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
    };
  }, [open, handleMove, handleUp]);

  /* Click a piece to fly to it; click the canvas to return to the full board. */
  const focusPiece = (p: DesignPiece) => {
    const { w, h } = vp();
    const s = clamp(Math.min(w / (p.w + 300), h / (p.h + 300)), MIN_S, MAX_S);
    goal.current = { s, x: w / 2 - (p.x + p.w / 2) * s, y: h / 2 - (p.y + p.h / 2) * s };
    vel.current = { x: 0, y: 0 };
    parGoal.current = { x: 0, y: 0 };
    setFocused(p.id);
    clampGoal();
  };

  const resetBoard = () => {
    fit();
    vel.current = { x: 0, y: 0 };
    setFocused(null);
  };

  const close = useCallback(() => {
    if (reduceRef.current) {
      onClose();
      return;
    }
    setLeaving(true);
    timers.current.push(window.setTimeout(onClose, 520));
  }, [onClose]);

  const layers = useMemo(() => [0, 1, 2] as const, []);

  /* Both ends of the morph, authored. The end rects are computed from the same
     fit the board will settle at, so the hand-off is pixel-for-pixel. */
  const morph = useMemo(() => {
    if (!origin || typeof window === "undefined") return null;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const s = clamp(Math.min(vw / (BOARD_W + FIT_PAD), vh / (BOARD_H + FIT_PAD)), MIN_S, MAX_S);
    const fx = (vw - BOARD_W * s) / 2;
    const fy = (vh - BOARD_H * s) / 2;
    const r = origin.row;
    const size = clamp(vw * 0.024, 15, 26);
    const long = Math.max(10, origin.label.height / 1.05);

    return {
      vh,
      rowTop: r.top,
      rowBottom: Math.max(0, r.bottom - 1),
      clip: `inset(${Math.max(0, r.top)}px ${Math.max(0, vw - r.right)}px ${Math.max(
        0,
        vh - r.bottom,
      )}px ${Math.max(0, r.left)}px)`,
      title: {
        left: 44,
        top: vh - 44 - size * 1.05,
        fromLeft: origin.label.left,
        fromTop: origin.label.top,
        fromSize: long,
        size,
      },
      cards: ctaPreviews.map((p, i) => {
        const sw = origin.swatches[i];
        return {
          piece: p,
          to: { left: fx + p.x * s, top: fy + p.y * s, width: p.w * s, height: p.h * s },
          from: sw
            ? { left: sw.left, top: sw.top, width: sw.width, height: sw.height }
            : { left: fx + p.x * s, top: fy + p.y * s, width: p.w * s, height: p.h * s },
        };
      }),
    };
  }, [origin]);

  const previewIds = useMemo(() => new Set(ctaPreviews.map((p) => p.id)), []);
  const morphT = { duration: MORPH_S, ease };

  return mounted && open
    ? createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Design projects"
          className="dw-overlay"
        >
          <motion.div
            className="dw-stage"
            ref={stageRef}
            initial={
              morphOn && morph
                ? { opacity: 1, clipPath: morph.clip }
                : { opacity: 0, clipPath: "inset(0px)" }
            }
            animate={{ opacity: leaving ? 0 : 1, clipPath: "inset(0px)" }}
            transition={{ duration: reduceRef.current ? 0 : morphOn ? MORPH_S : 0.4, ease }}
            onPointerDown={onPointerDown}
            onClick={() => {
              if (!movedRef.current) resetBoard();
            }}
          >
            <motion.div
              className="dw-grid"
              ref={gridRef}
              aria-hidden="true"
              initial={{ opacity: morphOn ? 0 : 1 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: morphOn ? 0.22 : 0, ease }}
            />

            <motion.div
              className="dw-entrance"
              initial={morphOn ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.97 }}
              animate={{ opacity: leaving ? 0 : 1, scale: leaving ? 0.985 : 1 }}
              transition={{ duration: reduceRef.current ? 0 : 0.6, ease }}
            >
              <div
                className="dw-plane"
                ref={planeRef}
                style={{ width: BOARD_W, height: BOARD_H }}
              >
                {layers.map((layer) => (
                  <div
                    key={layer}
                    ref={(el) => {
                      if (el) layerRefs.current.set(layer, el);
                    }}
                    className="dw-layer"
                    style={{
                      width: BOARD_W,
                      height: BOARD_H,
                      ...(layer === 0
                        ? { filter: "blur(1.8px) brightness(0.74)", opacity: 0.88 }
                        : null),
                    }}
                  >
                    {designPieces
                      .filter((p) => p.layer === layer)
                      .map((p) => (
                        <button
                          type="button"
                          key={p.id}
                          className="dw-card"
                          data-focused={focused === p.id}
                          style={{
                            left: p.x,
                            top: p.y,
                            width: p.w,
                            height: p.h,
                            backgroundImage: `url('${p.image}')`,
                            rotate: `${p.rot}deg`,
                            /* the morph is carrying these three in already */
                            opacity: morphOn && previewIds.has(p.id) ? 0 : undefined,
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (!movedRef.current) focusPiece(p);
                          }}
                          aria-label={`${p.title}, ${p.category}, ${p.year}`}
                        >
                          <span className="dw-chip">
                            <b>{p.title}</b>
                            <span>
                              {p.category} · {p.year}
                            </span>
                          </span>
                        </button>
                      ))}
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="dw-vignette" aria-hidden="true" />

            {!morphOn && <p className="dw-title">Design projects</p>}
          </motion.div>

          {morphOn && morph ? (
            <div className="dw-morph" aria-hidden="true">
              <motion.div
                className="dw-morph-line"
                initial={{ top: morph.rowTop, opacity: 1 }}
                animate={{ top: 0, opacity: 0 }}
                transition={{ ...morphT, opacity: { duration: 0.28, delay: MORPH_S - 0.28, ease } }}
              />
              <motion.div
                className="dw-morph-line"
                initial={{ top: morph.rowBottom, opacity: 1 }}
                animate={{ top: morph.vh - 1, opacity: 0 }}
                transition={{ ...morphT, opacity: { duration: 0.28, delay: MORPH_S - 0.28, ease } }}
              />

              <motion.div
                className="dw-morph-title"
                initial={{
                  left: morph.title.fromLeft,
                  top: morph.title.fromTop,
                  fontSize: morph.title.fromSize,
                }}
                animate={{
                  left: morph.title.left,
                  top: morph.title.top,
                  fontSize: morph.title.size,
                }}
                transition={morphT}
              >
                <motion.span
                  className="dw-morph-long"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0 }}
                  transition={{ duration: MORPH_S * 0.5, ease }}
                >
                  Want to explore my design projects?
                </motion.span>
                <motion.span
                  className="dw-morph-short"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: MORPH_S * 0.5, delay: MORPH_S * 0.5, ease }}
                >
                  Design projects
                </motion.span>
              </motion.div>

              {morph.cards.map(({ piece, from, to }) => (
                <motion.div
                  key={piece.id}
                  className="dw-morph-card"
                  style={{ backgroundImage: `url('${piece.image}')`, rotate: `${piece.rot}deg` }}
                  initial={{ ...from, borderRadius: 6 }}
                  animate={{ ...to, borderRadius: 12 }}
                  transition={morphT}
                />
              ))}
            </div>
          ) : null}

          <button
            type="button"
            className="dw-close"
            onClick={close}
            aria-label="Close design projects"
            data-wait={morphOn ? "true" : undefined}
          >
            <X className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
          </button>
        </div>,
        document.body,
      )
    : null;
}
