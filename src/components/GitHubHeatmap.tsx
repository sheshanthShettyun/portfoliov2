"use client";

import { useEffect, useRef, useState } from "react";

type Contribution = { date: string; count: number; level: number };

export default function GitHubHeatmap({ username, compact }: { username: string; compact?: boolean }) {
  const [data, setData] = useState<Contribution[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(`https://github-contributions-api.jogruber.de/v4/${username}`)
      .then((r) => r.json())
      .then((json) => {
        const contributions: Contribution[] = json.contributions || [];
        setData(contributions);
        const t = contributions.reduce((s: number, c: Contribution) => s + c.count, 0);
        setTotal(t);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [username]);

  useEffect(() => {
    if (!loading && scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
  }, [loading, data]);

  if (loading) {
    if (compact) return null;
    return (
      <div className="mt-16 rounded-[24px] bg-white/[0.04] px-6 py-6">
        <p className="text-[11px] uppercase tracking-[0.18em] text-white/25">
          Loading contributions...
        </p>
      </div>
    );
  }

  if (!data.length) {
    if (compact) return null;
    return (
      <div className="mt-16 rounded-[24px] bg-white/[0.04] px-6 py-6">
        <p className="text-[11px] uppercase tracking-[0.18em] text-white/25">
          No contribution data available
        </p>
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 block text-[10px] text-white/50 hover:text-white/80 transition-colors"
        >
          View @{username} on GitHub ↗
        </a>
      </div>
    );
  }

  const today = new Date();
  const oneYearAgo = new Date(today);
  oneYearAgo.setFullYear(today.getFullYear() - 1);

  const filtered = data.filter((d) => {
    const date = new Date(d.date);
    return date >= oneYearAgo && date <= today;
  });

  const cols = 52;
  const rows = 7;
  const cellSize = "12px";
  const gap = "3px";
  const levels = ["#1a1a2e", "#0e4429", "#006d32", "#26a641", "#39d353"];

  const heatmapGrid = (
    <div
      ref={scrollRef}
      className="overflow-x-auto scrollbar-hide"
      style={{ scrollBehavior: "auto" }}
    >
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${cols}, ${cellSize})`,
          gridTemplateRows: `repeat(${rows}, ${cellSize})`,
          gridAutoFlow: "column",
          gap,
          width: `calc(${cols} * ${cellSize} + ${cols - 1} * ${gap})`,
        }}
      >
        {Array.from({ length: cols * rows }).map((_, i) => {
          const col = Math.floor(i / rows);
          const row = i % rows;
          const idx = col * rows + row;
          const c = filtered[idx];
          const level = c ? Math.min(c.level, 4) : 0;
          return (
            <div
              key={i}
              className="rounded-[2px]"
              style={{
                width: cellSize,
                height: cellSize,
                backgroundColor: levels[level],
              }}
              title={c ? `${c.date}: ${c.count} contributions` : undefined}
            />
          );
        })}
      </div>
    </div>
  );

  const legend = (
    <div className="mt-3 flex items-center justify-end gap-1.5 text-[9px] text-white/25">
      Less
      {levels.map((color, i) => (
        <div
          key={i}
          className="rounded-[2px]"
          style={{ width: "10px", height: "10px", backgroundColor: color }}
        />
      ))}
      More
    </div>
  );

  if (compact) {
    return (
      <>
        <div className="mb-3 flex items-center justify-between">
          <p className="text-[11px] uppercase tracking-[0.18em] text-white/35">
            {total.toLocaleString()} contributions this year
          </p>
          <a href={`https://github.com/${username}`} target="_blank" rel="noopener noreferrer" className="text-[10px] text-white/25 transition-colors hover:text-white/50">
            @{username} ↗
          </a>
        </div>
        {heatmapGrid}
        {legend}
      </>
    );
  }

  return (
    <div className="mt-16 rounded-[24px] bg-white/[0.04] px-5 py-5 md:px-7 md:py-6">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-[11px] uppercase tracking-[0.18em] text-white/35">
          {total.toLocaleString()} contributions this year
        </p>
        <a href={`https://github.com/${username}`} target="_blank" rel="noopener noreferrer" className="text-[10px] text-white/25 transition-colors hover:text-white/50">
          @{username} ↗
        </a>
      </div>
      {heatmapGrid}
      {legend}
    </div>
  );
}
