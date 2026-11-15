import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const styles = await readFile(new URL("../src/app/globals.css", import.meta.url), "utf8");
const transition = await readFile(new URL("../src/lib/themeTransition.ts", import.meta.url), "utf8");
const header = await readFile(new URL("../src/components/davemiye/CloneHeader.tsx", import.meta.url), "utf8");
const heroLandscape = await readFile(new URL("../src/components/davemiye/HeroLandscape.tsx", import.meta.url), "utf8");

assert.match(styles, /@keyframes dm-theme-old-dim\{/);
assert.match(styles, /::view-transition-old\(root\)\{[^}]*animation:dm-theme-old-dim/);
assert.match(styles, /::view-transition-new\(root\)\{[^}]*will-change:clip-path/);
assert.match(transition, /duration: 750/);
assert.match(transition, /pseudoElement: "::view-transition-new\(root\)"/);
assert.doesNotMatch(heroLandscape, /viewTransitionName: "dm-hero-landscape"/);
assert.doesNotMatch(styles, /@keyframes dm-hero-landscape-in|@keyframes dm-hero-landscape-out/);
assert.doesNotMatch(styles, /::view-transition-old\(dm-hero-landscape\)|::view-transition-new\(dm-hero-landscape\)/);
assert.doesNotMatch(header, /setDark\(\(value\) =>/);
assert.match(header, /const next = !dark;[\s\S]*switchThemeWithReveal\([\s\S]*setDark\(next\)/);

console.log("davemiye theme transition checks passed");
