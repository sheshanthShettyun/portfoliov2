import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const page = await readFile(new URL("../src/app/page.tsx", import.meta.url), "utf8");
const header = await readFile(new URL("../src/components/davemiye/CloneHeader.tsx", import.meta.url), "utf8");
const sound = await readFile(new URL("../src/lib/davemiyeSound.ts", import.meta.url), "utf8");
const theme = await readFile(new URL("../src/lib/themeTransition.ts", import.meta.url), "utf8");
const intro = await readFile(new URL("../src/components/davemiye/IntroSection.tsx", import.meta.url), "utf8");
const about = await readFile(new URL("../src/components/davemiye/ExperienceSection.tsx", import.meta.url), "utf8");
const character = await readFile(new URL("../src/components/davemiye/SriyaanCharacter.tsx", import.meta.url), "utf8");
const characterAsset = await readFile(new URL("../public/images/sriyaan-character.svg", import.meta.url), "utf8");
const originalCharacterAsset = await readFile("/home/sriyaan/Downloads/file.svg", "utf8");
const darkTransparentCharacterAsset = await readFile(new URL("../public/images/sriyaan-character-dark.svg", import.meta.url), "utf8");
const lightCharacterAsset = await readFile(new URL("../public/images/sriyaan-character-light.svg", import.meta.url), "utf8");
const projects = await readFile(new URL("../src/components/davemiye/ProjectRail.tsx", import.meta.url), "utf8");
const footer = await readFile(new URL("../src/components/davemiye/ContactFooter.tsx", import.meta.url), "utf8");
const notes = await readFile(new URL("../src/components/davemiye/TestimonialsSection.tsx", import.meta.url), "utf8");
const caseStudy = await readFile(new URL("../src/app/work/[slug]/page.tsx", import.meta.url), "utf8");
const styles = await readFile(new URL("../src/app/globals.css", import.meta.url), "utf8");

assert.match(page, /CloneHeader/);
assert.match(page, /<ProjectRail \/>/);
assert.doesNotMatch(page, /<ClientsSection \/>/);
assert.doesNotMatch(page, /<TestimonialsSection \/>/);
assert.doesNotMatch(page, /<PlaygroundSection \/>/);
assert.doesNotMatch(page, /href="#clients"/);
assert.doesNotMatch(page, /href="#testimonials"/);
assert.doesNotMatch(page, /href="#playground"/);
assert.doesNotMatch(page, /dm-section-nav/);
assert.match(intro, /id="intro"/);
assert.match(intro, /Sriyaan/);
assert.match(intro, /reason/);
assert.match(intro, /hello-word/);
assert.match(intro, /SriyaanCharacter/);
assert.match(about, /Two years building systems/);
assert.match(about, /Projects built/);
assert.match(about, /dm-job-company/);
assert.match(about, /dm-job-role/);
assert.match(about, /dm-job-time/);
assert.match(styles, /\.dm-narrow-column\{[^}]*max-width:38rem/);
assert.match(styles, /\.dm-job[^}]*border-bottom:1px dashed/);
assert.doesNotMatch(about, /I'm Sriyaan|🏋️|📺|🧠/);
assert.doesNotMatch(about, /FlavorInsight|INTutGPT/);
assert.doesNotMatch(intro, /Explore .*FlavorInsight|INTutGPT/);
assert.match(intro, /I am Sriyaan/);
assert.doesNotMatch(intro, /I’m/);
assert.match(intro, /className="dm-visually-hidden"/);
assert.match(styles, /\.dm-visually-hidden\{position:absolute;width:1px;height:1px;padding:0;margin:-1px/);
assert.doesNotMatch(intro, /Dumbbell/);
assert.match(intro, /Tv/);
assert.match(intro, /Brain/);
assert.match(intro, /Gamepad2/);
assert.match(intro, /dm-inline-icon/);
assert.doesNotMatch(intro, /lifting/);
assert.doesNotMatch(intro, /dm-hero-interests/);
assert.doesNotMatch(intro, /dm-paper-note/);
assert.match(styles, /\.dm-paper-note\{display:none/);
assert.match(intro, /\["Hello,", "English"\]/);
assert.match(intro, /नमस्ते/);
assert.match(intro, /नमस्कार/);
assert.match(intro, /ನಮಸ್ಕಾರ/);
assert.match(intro, /Tulu/);
assert.doesNotMatch(intro, /Telugu/);
assert.match(header, /Sound on/);
assert.match(header, /Résumé/);
assert.match(header, /playDaveSound/);
assert.match(header, /setDaveSoundEnabled/);
assert.match(header, /data-sound-toggle/);
assert.match(header, /pointerover/);
assert.match(sound, /export function playDaveSound/);
assert.match(sound, /AudioContext/);
assert.match(sound, /localStorage/);
assert.match(sound, /cooldown/);
assert.match(theme, /dataset\.theme/);
assert.match(header, /switchThemeWithReveal/);
assert.match(header, /getBoundingClientRect/);
assert.match(theme, /startViewTransition/);
assert.match(theme, /circle\(0px at/);
assert.match(styles, /::view-transition-new\(root\)\{[^}]*z-index:2/);
assert.match(styles, /::view-transition-old\(root\)\{[^}]*z-index:1/);
assert.match(styles, /::view-transition-new\(root\)\{[^}]*will-change:clip-path/);
assert.match(styles, /html\.theme-switching \*,html\.theme-switching :before,html\.theme-switching :after\{transition:none!important\}/);
assert.match(header, /data-hidden/);
assert.match(header, /dm-wordmark/);
assert.doesNotMatch(header, /Book a call/);
assert.doesNotMatch(header, /Playground/);
assert.match(header, /href="#work">Work/);
assert.match(header, /href="#intro">About/);
assert.match(header, /GMT\+1/);
assert.match(header, /theme-toggle/);
assert.match(header, /keydown/);
assert.match(header, /aria-controls/);
assert.match(header, /data-open/);
assert.match(header, /onClick/);
assert.match(header, /setInterval/);
assert.doesNotMatch(intro, /dm-photo-stack/);
assert.doesNotMatch(projects, /href="#contact"/);
assert.match(notes, /useState/);
assert.match(notes, /setActive/);
assert.match(caseStudy, /generateStaticParams/);
assert.match(projects, /dm-project-sticky/);
assert.match(projects, /scrollLeft/);
assert.match(projects, /FlavorInsight/);
assert.match(projects, /INTutGPT/);
assert.doesNotMatch(projects, /Goals/);
assert.match(footer, /contact@sriyaan\.me/);
assert.match(footer, /sheshanthShettyun/);
assert.match(footer, /dm-contact-row/);
assert.match(footer, /dm-contact-label/);
assert.match(footer, /dm-contact-value/);
assert.match(styles, /#contact \.dm-narrow-column\{[^}]*max-width:38rem/);
assert.match(styles, /\.dm-contact-row[^}]*border-bottom:1px dashed/);
assert.match(projects, /requestAnimationFrame/);
assert.match(styles, /prefers-reduced-motion:reduce/);
assert.match(styles, /view-transition-new\(root\)/);
assert.match(styles, /theme-switching/);
assert.match(styles, /scroll-behavior:smooth/);
assert.match(styles, /#experience\{[^}]*min-height:0/);
assert.match(styles, /#contact\{[^}]*min-height:0/);
assert.match(styles, /\.dm-hello \.dm-greeting\{[^}]*align-items:baseline/);
assert.match(styles, /\.dm-intro p\{max-width:min\(500px,100%\)/);
assert.match(character, /sriyaan-character-dark\.svg/);
assert.match(character, /sriyaan-character-light\.svg/);
assert.match(character, /dm-character-art--light/);
assert.match(styles, /data-theme="dark"\].*dm-character-art--light/);
assert.match(character, /contentDocument/);
assert.match(character, /data-gaze-eye/);
assert.match(character, /resetEyes/);
assert.match(character, /pointerout/);
assert.match(character, /onPointerLeave/);
assert.doesNotMatch(character, /dm-character-eye/);
assert.doesNotMatch(characterAsset, /data-gaze-eye=/);
assert.doesNotMatch(characterAsset, /class="character-palette"/);
assert.match(characterAsset, /fill="#141212"/);
assert.equal(characterAsset, originalCharacterAsset);
assert.match(darkTransparentCharacterAsset, /fill="#141212"/);
assert.doesNotMatch(darkTransparentCharacterAsset, /M905\.000000,1080\.000000/);
assert.match(lightCharacterAsset, /<path fill="#f1eee9"[^>]*d="\s*M506\.613037,290\.697662/);
assert.match(lightCharacterAsset, /<path fill="#f1eee9"[^>]*d="\s*M782\.005981,614\.001831/);
assert.match(lightCharacterAsset, /<path fill="#f1eee9"[^>]*d="\s*M596\.788574,756\.314392/);
for (const start of [
  "M526.504333,499.119324",
  "M578.107788,582.432190",
  "M885.243530,494.178467",
  "M728.143311,513.752441",
  "M764.881653,587.646729",
  "M749.034668,615.119568",
  "M904.800232,524.914856",
  "M715.094360,624.961731",
  "M703.556763,571.843384",
  "M684.290833,605.891174",
  "M694.021851,587.853271",
  "M711.003235,539.891418",
  "M710.880249,615.798645",
  "M709.310425,589.036621",
]) {
  assert.match(lightCharacterAsset, new RegExp(`<path fill="#f1eee9"[^>]*d="\\s*${start.replaceAll(".", "\\.")}`));
}
assert.doesNotMatch(lightCharacterAsset, /M905\.000000,1080\.000000/);
assert.match(styles, /\.dm-character\{[^}]*isolation:isolate/);
assert.doesNotMatch(styles, /\.dm-character-art--light\{[^}]*filter:/);
assert.doesNotMatch(styles, /\.dm-character-art--light\{[^}]*background:/);
for (const color of ["#413C38", "#47413D", "#504A45", "#37332F", "#292624", "#84786F"]) {
  assert.doesNotMatch(lightCharacterAsset, new RegExp(`fill="${color}"`));
}
assert.match(lightCharacterAsset, /fill="#1f1d1b"/);
assert.match(styles, /\.dm-character\{[^}]*width:210px/);
assert.match(styles, /\.dm-character\{[^}]*left:-52px/);
assert.doesNotMatch(styles, /cdn\.sanity\.io/);
assert.match(styles, /\.dm-photo-stack\{[^}]*pointer-events:auto/);
console.log("davemiye clone smoke checks passed");
