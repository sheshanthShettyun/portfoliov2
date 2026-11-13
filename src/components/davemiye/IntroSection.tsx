"use client";

export default function IntroSection() {
  return (
    <section id="intro" className="dm-intro" aria-labelledby="intro-title">
      <div className="dm-intro-copy">
        <div className="dm-hello"><svg viewBox="0 0 120 140" aria-hidden="true"><path d="M22 108c-8-39 15-70 49-76 30-5 47 12 50 37M32 50c15 12 23 32 18 48M62 34c-2 29 4 50 18 70M80 56c12-8 25-10 33-4M40 82c9-6 18-5 25 1M30 111c17 10 43 14 65 5" /></svg><div><span>Hello</span><small>AI systems<br />&amp; infrastructure</small></div></div>
        <h1 id="intro-title">Sriyaan, AI systems engineer</h1>
        <p>I’m Sriyaan, bridging machine learning and production infrastructure. I build autonomous systems, RAG pipelines, and agentic workflows that <a href="#work">reason through complexity</a>.</p>
        <p>I work across machine learning, LLMs, and backend infrastructure, turning experimental AI capabilities into reliable, usable software. My focus is building systems that can retrieve, reason, and act.</p>
        <p>Explore <a href="#work">FlavorInsight</a>, my shipped local AI review analyzer, and INTutGPT, a RAG textbook platform in progress.</p>
        <div className="dm-intro-actions"><a className="dm-ink-button" href="mailto:contact@sriyaan.me">Let’s build together <span>→</span></a><span className="dm-status"><i /> Available for projects</span><div className="dm-paper-note"><span>Currently exploring</span><strong><b>●</b> Agentic development</strong></div></div>
      </div>
    </section>
  );
}
