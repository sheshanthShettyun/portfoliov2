"use client";

import { useState } from "react";

const notes = [["A note from Joe", "Dave is the best UX designer I’ve worked with so far. Timely, polite, inventive and professional, with a top-class finish right off the bat.", "Joe C.", "Founder, Circa"], ["A note from David & Franco", "We worked with Dave for four weeks on a fast-paced design project, and the results exceeded our expectations. He consistently delivered high-quality work ahead of schedule and brought fresh ideas that elevated the final outcome.", "David H. & Franco M.", "Co-founders, Goals"], ["A note from David", "My feedback was listened to. Really loved that. Overall satisfaction with the final designs: 100%. They will absolutely slay.", "David A.", "Founder, Faithbridge Central"]];

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);
  return <section id="testimonials" className="dm-section dm-notes"><div className="dm-notes-heading"><h2>Kind words</h2><small>{String(active + 1).padStart(2, "0")} / {String(notes.length).padStart(2, "0")}</small></div><div className="dm-note-grid">{notes.map(([label, quote, name, role], index) => <article className={`dm-note dm-note-${(index - active + notes.length) % notes.length}`} key={label} onClick={() => setActive(index)} aria-hidden={index !== active}><small>{label}</small><p>“{quote}”</p><strong>{name}</strong><span>{role}</span></article>)}</div><button type="button" onClick={() => setActive((value) => (value + 1) % notes.length)}>Next note →</button></section>;
}
