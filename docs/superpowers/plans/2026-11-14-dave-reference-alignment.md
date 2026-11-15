# Dave Reference Alignment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Align the Sriyaan clone’s header, About section, and contact CTA with the visual system of `davemiye.com` without removing Sriyaan’s About content or changing its identity.

**Architecture:** Keep the existing `CloneHeader`, `ExperienceSection`, and `ContactFooter` boundaries. Remove only the requested header links, update About/contact markup to expose the same semantic row structure as the reference, and consolidate the final visual treatment in the existing `globals.css` overrides.

**Tech Stack:** Next.js App Router, React, TypeScript, CSS, Node smoke test.

**Spec:** `docs/superpowers/specs/2026-11-14-dave-reference-alignment.md`

## Global Constraints

- Preserve “Two years building systems that retrieve, reason, and act.”
- Preserve the `2+` / `Years building` and `6+` / `Projects built` statistics.
- Remove `Playground` and `Book a call` from both desktop and mobile top navigation.
- Keep Sriyaan’s contact content and links.
- Do not render the unused Playground component.

## Review Focus

- Desktop header: requested links are absent while Work/About remain usable; pin in the smoke test.
- Mobile header: requested links are absent from the mobile menu; pin in the smoke test.
- About content: copy and both statistics remain; pin in the smoke test.
- About rows: dashed top/bottom rules, 15px sizing, three-column baseline grid; verify with live computed styles.
- Contact rows: dashed rules, compact heading, right-aligned values, responsive stacking; verify with live computed styles.

---

### Task 1: Header navigation cleanup

**Files:**
- Modify: `src/components/davemiye/CloneHeader.tsx`
- Test: `tests/davemiye-clone.smoke.mjs`

**Interfaces:**
- Produces the same `CloneHeader` component with Work/About navigation and existing controls intact.

- [ ] **Step 1: Extend the smoke test** to assert that `CloneHeader.tsx` contains neither `Playground` nor `Book a call`, while still containing Work, About, Résumé, and the mobile menu.
- [ ] **Step 2: Run `node tests/davemiye-clone.smoke.mjs`** and confirm it fails on the removed-link assertions.
- [ ] **Step 3: Remove the two links from both desktop and mobile navigation** without changing the other header controls or scroll behavior.
- [ ] **Step 4: Run the smoke test** and confirm it passes.

### Task 2: Dave-style About/Experience layout

**Files:**
- Modify: `src/components/davemiye/ExperienceSection.tsx`
- Modify: `src/app/globals.css`
- Test: `tests/davemiye-clone.smoke.mjs`

**Interfaces:**
- `ExperienceSection` continues to render `id="experience"`, the About heading, Sriyaan’s existing intro/statistics, and the four capability rows.

- [ ] **Step 1: Extend the smoke test** to require the semantic About row classes (`dm-job-company`, `dm-job-role`, `dm-job-time`) and the existing statistics.
- [ ] **Step 2: Run the smoke test** and confirm it fails because the new row structure is absent.
- [ ] **Step 3: Update `ExperienceSection.tsx`** to use a centered narrow content column and semantic row spans while retaining all existing content; use an ordered/list-style structure compatible with Dave’s experience rows.
- [ ] **Step 4: Update the desktop and mobile CSS** so About uses Dave’s reference values: `max-width:38rem`, 15px row text, 22.5px line height, 16px vertical padding, 1px dashed separators, baseline alignment, `1fr 1fr 9.5rem` desktop columns, and a two-column mobile layout.
- [ ] **Step 5: Run the smoke test and production build**; confirm About copy/statistics remain and the app compiles.

### Task 3: Dave-style “Let’s build systems that reason.” contact CTA

**Files:**
- Modify: `src/components/davemiye/ContactFooter.tsx`
- Modify: `src/app/globals.css`
- Test: `tests/davemiye-clone.smoke.mjs`

**Interfaces:**
- `ContactFooter` continues to render `id="contact"`, Sriyaan’s name, email, résumé, GitHub, LinkedIn, and footer metadata.

- [ ] **Step 1: Extend the smoke test** to require semantic contact row classes and reject the old grid-only row structure.
- [ ] **Step 2: Run the smoke test** and confirm it fails before the markup change.
- [ ] **Step 3: Update `ContactFooter.tsx`** to use Dave-style label/value row semantics while preserving all Sriyaan links and the existing heading copy.
- [ ] **Step 4: Update contact/footer CSS** to use the centered `38rem` column, 14px heading, 15px/22.5px rows, 16px vertical padding, dashed separators, right-aligned values, and stacked mobile rows.
- [ ] **Step 5: Run the full verification suite**: smoke test, `npm run build`, and `git diff --check`.
