# Dave Miye Portfolio Clone Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rebuild the observed `davemiye.com` portfolio experience in the existing Next.js app with matching typography, layout, assets, responsive behavior, and interactions.

**Architecture:** Replace the current page composition with small client components for the header, intro, horizontal project rail, experience/clients/testimonials, playground, and contact footer. Keep the existing Next.js/Tailwind stack, add local font files and a small set of public image assets, and use CSS/React state for the sound/theme/menu controls and scroll-linked project rail.

**Tech Stack:** Next.js App Router, React, TypeScript, Tailwind CSS v4, local WOFF2 fonts, CSS keyframes/transitions.

**Spec:** The live site was inspected at `https://davemiye.com/` on 2026-11-13. Observed body canvas is `rgb(241, 238, 233)`, body text is `rgb(20, 20, 18)`, primary font is Inter variable, handwritten accent is Caveat 500, desktop header is 64px, hero is 889.625px at 1255px viewport width, and project cards are 1040×693px in a horizontal rail.

## Global Constraints

- Preserve the existing repository and unrelated user changes.
- Use local fonts; do not depend on the source site at runtime.
- Keep the implementation accessible: semantic landmarks, keyboard focus, reduced-motion support, and alt text.
- Do not expose or copy analytics/telemetry behavior.
- Use public project imagery only as local reference assets or replaceable placeholders where licensing is unclear.

## Review Focus

- Mobile layout must collapse navigation and project rail without horizontal page overflow.
- Reduced-motion users must not receive looping motion or delayed reveal animations.
- Theme and sound controls must update visible state without requiring external services.
- Horizontal project navigation must remain keyboard reachable and preserve the active card state.
- Local font loading must fall back cleanly if a font file is unavailable.

### Task 1: Establish clone shell and typography

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/app/globals.css`
- Modify: `src/app/page.tsx`
- Create: `src/components/davemiye/CloneHeader.tsx`
- Create: `src/components/davemiye/IntroSection.tsx`

**Interfaces:** Header exposes theme, sound, and mobile menu controls. Intro exposes the hero content and links.

- [ ] Add a smoke test or DOM-level assertion for the required landmarks and control labels.
- [ ] Run the test/lint command and confirm it fails before the replacement shell exists.
- [ ] Implement local Inter/Caveat font declarations, canvas colors, shared spacing, reveal keyframes, and the header/intro shell.
- [ ] Run lint/build and confirm the shell compiles.

### Task 2: Implement project rail and remaining page sections

**Files:**
- Create: `src/components/davemiye/ProjectRail.tsx`
- Create: `src/components/davemiye/ExperienceSection.tsx`
- Create: `src/components/davemiye/ClientsSection.tsx`
- Create: `src/components/davemiye/TestimonialsSection.tsx`
- Create: `src/components/davemiye/PlaygroundSection.tsx`
- Create: `src/components/davemiye/ContactFooter.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:** `ProjectRail` renders project metadata and card navigation; each content section renders one semantic section by id.

- [ ] Add assertions for project titles, experience entries, testimonials, and contact links.
- [ ] Verify the assertions fail before the sections are implemented.
- [ ] Implement the horizontal rail, scroll-linked progress/active state, section copy, paper note, playground illustration, and footer contact rows.
- [ ] Run lint/build and verify no TypeScript or accessibility errors.

### Task 3: Add responsive interaction fidelity and visual verification

**Files:**
- Modify: `src/components/davemiye/CloneHeader.tsx`
- Modify: `src/components/davemiye/ProjectRail.tsx`
- Modify: `src/app/globals.css`
- Create: `tests/davemiye-clone.test.tsx` or equivalent project-supported test file

**Interfaces:** Controls are keyboard and pointer operable; CSS media queries cover desktop/mobile/reduced-motion states.

- [ ] Add failing behavior tests for menu toggle, sound label toggle, theme label toggle, and reduced-motion class behavior.
- [ ] Run the focused tests and confirm expected failures.
- [ ] Implement the minimal state and responsive behavior, including focus-visible styles and overflow guards.
- [ ] Run focused tests, lint, and production build.
- [ ] Start the app and compare desktop/mobile screenshots against the inspected reference, correcting geometry and animation timing.

### Task 4: Final verification

**Files:**
- Modify only files required by verification findings.

- [ ] Run `npm run lint`.
- [ ] Run `npm run build`.
- [ ] Inspect the rendered page at desktop and mobile viewport sizes.
- [ ] Confirm the git diff contains only the clone implementation and intended assets.
