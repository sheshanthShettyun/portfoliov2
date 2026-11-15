"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { Moon, Sun, Volume2, VolumeX } from "lucide-react";
import { getDaveSoundEnabled, playDaveSound, setDaveSoundEnabled } from "@/lib/davemiyeSound";
import { switchThemeWithReveal } from "@/lib/themeTransition";

export default function CloneHeader() {
  const [sound, setSound] = useState(false);
  const [dark, setDark] = useState(false);
  const [menu, setMenu] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [time, setTime] = useState("00:00:00");
  useEffect(() => setSound(getDaveSoundEnabled()), []);
  useEffect(() => { let previous = window.scrollY; const onScroll = () => { const current = window.scrollY; setHidden(current > 72 && current > previous); previous = current; }; window.addEventListener("scroll", onScroll, { passive: true }); return () => window.removeEventListener("scroll", onScroll); }, []);
  useEffect(() => { const update = () => setTime(new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false, timeZone: "Asia/Kolkata" }).format(new Date())); update(); const timer = window.setInterval(update, 1000); return () => window.clearInterval(timer); }, []);
  useEffect(() => { const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setMenu(false); }; window.addEventListener("keydown", closeOnEscape); return () => window.removeEventListener("keydown", closeOnEscape); }, []);
  useEffect(() => {
    const root = document.documentElement;
    const syncTheme = () => setDark(root.dataset.theme === "dark");
    syncTheme();
    const observer = new MutationObserver(syncTheme);
    observer.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const interactive = (target: EventTarget | null) => (target as Element | null)?.closest("a,button");
    const onPointerOver = (event: PointerEvent) => { const element = interactive(event.target); if (element && !element.hasAttribute("data-sound-toggle")) playDaveSound("detent"); };
    const onClick = (event: globalThis.MouseEvent) => { const element = interactive(event.target); if (!element || element.hasAttribute("data-sound-toggle")) return; if (element.matches(".theme-toggle")) playDaveSound("stamp"); else if (element.matches(".dm-ink-button") || element.tagName === "A") playDaveSound("page"); else playDaveSound("click"); };
    document.addEventListener("pointerover", onPointerOver);
    document.addEventListener("click", onClick);
    return () => { document.removeEventListener("pointerover", onPointerOver); document.removeEventListener("click", onClick); };
  }, []);
  const toggleSound = () => { const next = !sound; setSound(next); setDaveSoundEnabled(next); if (next) playDaveSound("toggle"); };
  const toggleTheme = (event: MouseEvent<HTMLButtonElement>) => { const rect = event.currentTarget.getBoundingClientRect(); const next = !dark; switchThemeWithReveal(next ? "dark" : "light", { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }); setDark(next); };

  return (
    <>
      <header className="dm-header" data-dark={dark} data-hidden={hidden || undefined}>
        <div className="dm-header-inner">
          <div className="dm-header-left">
            <a className="dm-signature dm-wordmark" href="#intro" aria-label="SRYAN — home">SRYAN</a>
            <nav className="dm-nav" aria-label="Primary">
              <a href="#work">Work</a><a href="#experience">Experience</a><a href="#contact">Contact</a>
            </nav>
          </div>
          <div className="dm-header-links">
            <button className="dm-sound-toggle" type="button" data-sound-toggle onClick={toggleSound} aria-pressed={sound} aria-label={sound ? "Sound off" : "Sound on"}><span className="dm-inline-icon" data-sound-icon={sound ? "on" : "off"} aria-hidden="true">{sound ? <Volume2 /> : <VolumeX />}</span></button>
            <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}>{dark ? <Sun data-theme-icon="sun" aria-hidden="true" /> : <Moon data-theme-icon="moon" aria-hidden="true" />}<span>{dark ? "Light" : "Dark"}</span></button>
            <p className="dm-header-time"><span className="dm-timezone-label">IST</span><span aria-hidden="true">—</span><time>{time}</time></p>
          </div>
          <button className="dm-menu-button" type="button" onClick={() => setMenu((value) => !value)} aria-expanded={menu} aria-controls="dm-mobile-menu" aria-label={menu ? "Close menu" : "Open menu"}>Menu</button>
        </div>
      </header>
      <nav id="dm-mobile-menu" className="dm-mobile-menu" data-open={menu || undefined} aria-hidden={!menu} aria-label="Mobile"><a tabIndex={menu ? 0 : -1} href="#work" onClick={() => setMenu(false)}>Work</a><a tabIndex={menu ? 0 : -1} href="#experience" onClick={() => setMenu(false)}>Experience</a><a tabIndex={menu ? 0 : -1} href="#contact" onClick={() => setMenu(false)}>Contact</a></nav>
    </>
  );
}
