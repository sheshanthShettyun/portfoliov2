# portfoliov2 — Agent Context

## Tech Stack
- **Next.js 16.2.10** (App Router, Turbopack)
- **React 19.2.4** + TypeScript 5
- **Tailwind CSS v4** (`@tailwindcss/postcss`)
- **Framer Motion 12.42.2** (all animations)
- **lucide-react 1.23.0** (icons)
- **clsx + tailwind-merge** (`cn()` utility at `src/lib/utils.ts`)

## Design Language
- **Editorial portfolio** — minimal, high-contrast, heavy whitespace, no gradients/glass/borders
- **Fonts**: Instrument Sans (display headings, `font-display`), Inter (body via `var(--font-inter)`), system-ui fallback
- **Colors**: `#f7f7f5` (light bg), `#111` (dark sections), `#101010` (near-black), `#f4f4f5` (alt light)
- **Easing**: `[0.22, 1, 0.36, 1]` across all framer-motion transitions
- **Cards**: `rounded-[24px]` or `rounded-[2px]`, soft multi-layer shadows, no borders
- **Buttons**: `rounded-full` pills, `.premium-button` class for shadow + hover lift
- **Shadows**: `0 20px 50px rgba(0,0,0,0.06)` soft ambient, layered stacks

## Project Structure
```
src/
├── app/
│   ├── layout.tsx          # Root layout, font imports (Inter, Instrument Sans, Geist)
│   ├── page.tsx            # Page composition — wraps all sections in TechVacuumProvider
│   └── globals.css         # Tailwind v4 @theme, @layer base, custom classes, keyframes
├── components/
│   ├── Nav.tsx             # Fixed nav: SRIYAAN logo + black menu button → slide-down
│   ├── Hero.tsx            # "Available" + headline + bio + CTAs (no carousel)
│   ├── HeroCarousel.tsx    # Tech stack scrolling pills (uses TechVacuumContext)
│   ├── About.tsx           # Dark section: "I'm Sriyaan." + 2+ years / 6+ projects
│   ├── Services.tsx        # Capabilities: Languages & Web / AI & Data / DevOps & Tools
│   ├── Projects.tsx        # Dark section: FlavorInsight + INTutGPT cards → ProjectModal
│   ├── ProjectModal.tsx    # Modal: image/video, description, tags, GitHub button
│   ├── FAQ.tsx             # Accordion: 4 questions about projects/stack/infra/collab
│   ├── Footer.tsx          # Dark footer: logo, tagline, GitHub/LinkedIn/Email icons
│   ├── TechBadge.tsx       # Shared tech pill component (colored badge + text)
│   ├── Blog.tsx            # Not rendered in page (available if needed)
│   ├── Process.tsx         # Not rendered (was "Explore/Build/Operate")
│   └── Testimonials.tsx    # Not rendered
└── lib/
    ├── utils.ts            # cn() utility
    └── TechVacuumContext.tsx # Context: openCard/closeCard, vacuumedSet for carousel→card animation
```

## Page Order
Nav → Hero → About → HeroCarousel → Services → Projects → FAQ → Footer

## Brand / Content
- **Name**: SRIYAAN (Sheshanth Shetty)
- **GitHub**: https://github.com/sheshanthShettyun
- **LinkedIn**: https://www.linkedin.com/in/sheshanthshetty/
- **Email**: contact@sriyaan.me
- **Tagline**: "Digital products, built to reason."
- **Skills**: Python/JS/TS/Next.js/FastAPI/Docker/Git/LangChain/ChromaDB/PostgreSQL/K8s/Linux/MLflow/LangGraph/CI-CD
- **Projects**: FlavorInsight (local RAG, offline, 4318 Yelp reviews), INTutGPT (RAG textbook platform, in progress)

## Key Patterns
- All components are `"use client"` (RSC not used for UI)
- Colors use CSS custom properties from `@theme` in globals.css (`naka-black`, `naka-cream`, etc.)
- Tailwind v4 gradient syntax: `bg-linear-to-br` (not `bg-gradient-to-br`)
- Custom durations: `duration-[400ms]` (v4 requires brackets for arbitrary values)
- `font-sans` maps to Inter via `var(--font-inter)`, `font-display` maps to Instrument Sans via `var(--font-instrument-sans)`
- FlavorInsight thumbnail: `public/images/flavorinsight.png`
- `ease: [0.22, 1, 0.36, 1] as const` required for TypeScript tuple typing

## Running
```bash
npm install
npm run dev    # development with hot reload
npm run build  # production build
npm start      # production server
```

## TechVacuum Feature
TechVacuumContext connects HeroCarousel and Services — clicking a capability card removes matching tech pills from the carousel (via `layoutId` shared element transitions in framer-motion) and shows them inside the expanded card. The carousel dupe set keeps spacing. Close the card to return techs to the carousel.

## Unused Components
`Blog.tsx`, `Process.tsx`, `Testimonials.tsx` exist in `src/components/` but are NOT imported in `page.tsx`. They're available if you want to add those sections back later.
