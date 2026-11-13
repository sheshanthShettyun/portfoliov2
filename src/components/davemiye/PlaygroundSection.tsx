import type { CSSProperties } from "react";

export default function PlaygroundSection() { return <section id="playground" className="dm-section dm-playground"><h2>Playground</h2><div className="dm-playground-card"><span>Come play</span><strong>→</strong><div className="dm-dial">{["goals.png","plate.jpg","circa.jpg","sidequest.jpg","dialme.jpg","portrait.jpg"].map((image, index) => <i key={image} style={{ "--n": index, backgroundImage: `url(/images/davemiye/${image})` } as CSSProperties} />)}<b>✦</b></div><p>Explorations, experiments and things I made just because.</p></div></section>; }
