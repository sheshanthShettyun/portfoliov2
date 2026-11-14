"use client";

import { useEffect, useState } from "react";
import { BrainCircuit, Gamepad2, Tv } from "lucide-react";
import SriyaanCharacter from "./SriyaanCharacter";

const greetings = [
  ["Hello,", "English"],
  ["ನಮಸ್ಕಾರ,", "Kannada"],
  ["नमस्ते,", "Hindi"],
  ["नमस्कार,", "Marathi"],
  ["ನಮಸ್ಕಾರ,", "Tulu"],
] as const;

export default function IntroSection() {
  const [greetingIndex, setGreetingIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setGreetingIndex((index) => (index + 1) % greetings.length);
    }, 3000);

    return () => window.clearInterval(timer);
  }, []);

  const [greeting, language] = greetings[greetingIndex];

  return (
    <section id="intro" className="dm-intro" aria-labelledby="intro-title">
      <div className="dm-intro-copy">
        <div className="dm-hello"><SriyaanCharacter /><div className="dm-greeting" aria-live="polite"><span key={language} className="hello-word">{greeting}</span><small key={`${language}-label`} className="hello-language">{language}</small></div></div>
        <h1 id="intro-title" className="dm-visually-hidden">Sriyaan, AI systems engineer</h1>
        <p>I am Sriyaan, bridging machine learning and production infrastructure. I build autonomous systems, RAG pipelines, and agentic workflows that <a href="#work">reason through complexity</a>.</p>
        <p>I work across machine learning, LLMs, and backend infrastructure, turning experimental AI capabilities into reliable, usable software. My focus is building systems that can retrieve, reason, and act.</p>
        <p>I care about useful abstractions, thoughtful interfaces, and software that keeps its promises after it leaves the notebook.</p>
        <p>When I am away from the keyboard, I am usually watching a good series <span className="dm-inline-icon"><Tv aria-hidden="true" /></span>, playing a game <span className="dm-inline-icon"><Gamepad2 aria-hidden="true" /></span>, or following the next useful idea in <span className="dm-ai-mark">AI <span className="dm-inline-icon"><BrainCircuit aria-hidden="true" /></span></span>.</p>
        <div className="dm-intro-actions"><a className="dm-ink-button" href="mailto:contact@sriyaan.me">Let’s build together <span>→</span></a><span className="dm-status"><i /> Available for projects</span></div>
      </div>
    </section>
  );
}
