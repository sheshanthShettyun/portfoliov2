"use client";

import { useEffect, useRef, useState } from "react";

export default function CloneHeader() {
  const [sound, setSound] = useState(false);
  const [dark, setDark] = useState(false);
  const [menu, setMenu] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [time, setTime] = useState("00:00:00");
  const audioContext = useRef<AudioContext | null>(null);
  useEffect(() => { let previous = window.scrollY; const onScroll = () => { const current = window.scrollY; setHidden(current > 72 && current > previous); previous = current; }; window.addEventListener("scroll", onScroll, { passive: true }); return () => window.removeEventListener("scroll", onScroll); }, []);
  useEffect(() => { const update = () => setTime(new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false, timeZone: "Europe/Paris" }).format(new Date())); update(); const timer = window.setInterval(update, 1000); return () => window.clearInterval(timer); }, []);
  useEffect(() => { const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setMenu(false); }; window.addEventListener("keydown", closeOnEscape); return () => window.removeEventListener("keydown", closeOnEscape); }, []);
  const toggleSound = () => {
    setSound((value) => !value);
    if (typeof window !== "undefined" && "AudioContext" in window) {
      const context = audioContext.current ?? new AudioContext();
      audioContext.current = context;
      if (context.state === "suspended") void context.resume();
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.frequency.value = 520;
      gain.gain.setValueAtTime(0.025, context.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.08);
      oscillator.connect(gain).connect(context.destination);
      oscillator.start();
      oscillator.stop(context.currentTime + 0.08);
    }
  };
  const toggleTheme = () => setDark((value) => { const next = !value; document.documentElement.dataset.theme = next ? "dark" : "light"; return next; });

  return (
    <>
      <header className="dm-header" data-dark={dark} data-hidden={hidden || undefined}>
        <a className="dm-signature dm-wordmark" href="#intro" aria-label="SRIYAAN — home">SRIYAAN</a>
        <nav className="dm-nav" aria-label="Primary">
          <a href="#work">Work</a><a href="#work">Playground</a><a href="#intro">About</a>
        </nav>
        <div className="dm-header-links">
          <a href="mailto:contact@sriyaan.me">Book a call</a>
          <a href="/resume.pdf">Résumé</a>
          <button type="button" onClick={toggleSound} aria-pressed={sound} aria-label={sound ? "Sound off" : "Sound on"}>Sound {sound ? "off" : "on"}</button>
          <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19.5 14.6A7.7 7.7 0 0 1 9.4 4.5a7.9 7.9 0 1 0 10.1 10.1Z" /></svg><span>{dark ? "Light" : "Dark"}</span></button>
          <p className="dm-header-time"><span>GMT+1</span><span aria-hidden="true">—</span><time>{time}</time></p>
        </div>
        <button className="dm-menu-button" type="button" onClick={() => setMenu((value) => !value)} aria-expanded={menu} aria-controls="dm-mobile-menu" aria-label={menu ? "Close menu" : "Open menu"}>Menu</button>
      </header>
      <nav id="dm-mobile-menu" className="dm-mobile-menu" data-open={menu || undefined} aria-hidden={!menu} aria-label="Mobile"><a tabIndex={menu ? 0 : -1} href="#work" onClick={() => setMenu(false)}>Work</a><a tabIndex={menu ? 0 : -1} href="#work" onClick={() => setMenu(false)}>Playground</a><a tabIndex={menu ? 0 : -1} href="#intro" onClick={() => setMenu(false)}>About</a><a tabIndex={menu ? 0 : -1} href="#contact" onClick={() => setMenu(false)}>Contact</a></nav>
    </>
  );
}
