"use client";

import { useEffect, useRef } from "react";

const projects = [
  { title: "FlavorInsight", meta: "AI RAG · Shipped", image: "/images/flavorinsight.png", href: "/work/flavorinsight" },
  { title: "INTutGPT", meta: "AI RAG · In Progress", image: "/images/hero-bg.png", href: "/work/intutgpt" },
];

export default function ProjectRail() {
  const rail = useRef<HTMLDivElement>(null);
  const section = useRef<HTMLElement>(null);
  useEffect(() => {
    const node = rail.current;
    const parent = section.current;
    if (!node || !parent) return;
    let frame = 0;
    const sync = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
      const range = Math.max(1, parent.offsetHeight - innerHeight);
      const progress = Math.max(0, Math.min(1, (scrollY - parent.offsetTop) / range));
      node.scrollLeft = progress * (node.scrollWidth - node.clientWidth);
      });
    };
    addEventListener("scroll", sync, { passive: true });
    addEventListener("resize", sync);
    sync();
    return () => { removeEventListener("scroll", sync); removeEventListener("resize", sync); cancelAnimationFrame(frame); };
  }, []);
  return <section id="work" className="dm-work" ref={section} aria-labelledby="work-title"><h2 id="work-title" className="dm-sr-only">Featured projects</h2><div className="dm-project-sticky"><div className="dm-project-rail" ref={rail} tabIndex={0} aria-label="Projects — scroll sideways">{projects.map((project) => <a className="dm-project" href={project.href} key={project.title}><div className="dm-project-image"><img src={project.image} alt={`${project.title} project`} loading="lazy" /></div><div className="dm-project-info"><h3>{project.title}</h3><span>{project.meta}</span><em>Read case study <span>→</span></em></div></a>)}</div></div></section>;
}
