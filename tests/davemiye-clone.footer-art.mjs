import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import puppeteer from "puppeteer";

const footer = await readFile(new URL("../src/components/davemiye/ContactFooter.tsx", import.meta.url), "utf8");
const styles = await readFile(new URL("../src/app/globals.css", import.meta.url), "utf8");
const artwork = await readFile(new URL("../public/images/mediterranean-coast-vector.svg", import.meta.url), "utf8");
let darkArtwork = Buffer.alloc(0);
try {
  darkArtwork = await readFile(new URL("../public/images/coastal-exact-dark-transparent.png", import.meta.url));
} catch {
  // The regression assertion below reports the missing dark asset clearly.
}

assert.match(footer, /data-footer-image/);
assert.match(footer, /src="\/images\/mediterranean-coast-vector\.svg"/);
assert.match(footer, /data-dark-src="\/images\/coastal-exact-dark-transparent\.png"/);
assert.match(footer, /alt="Mediterranean coast landscape"/);
assert.match(footer, /<h2>Let's Talk<\/h2>/);
assert.doesNotMatch(footer, /Let’s have coffee/);
assert.doesNotMatch(footer, /FooterCanvasArt|data-footer-art-canvas/);
assert.match(styles, /\.dm-footer-image\{/);
assert.match(styles, /\.dm-footer-image img\{/);
assert.match(styles, /:root\[data-theme="dark"\] \.dm-footer-image img\{content:url\("\/images\/coastal-exact-dark-transparent\.png"\)\}/);
assert.doesNotMatch(styles, /mediterranean-clean-dark-vector\.svg/);
assert.doesNotMatch(styles, /\.dm-footer-art\{/);
assert.match(artwork, /viewBox="0 0 2172 724"/);
assert.match(artwork, /#15517F/);
assert.doesNotMatch(artwork, /<rect\b/i, "the supplied artwork background is transparent for footer blending");
assert.ok(darkArtwork.length > 0, "dark artwork exists");
assert.deepEqual([...darkArtwork.subarray(0, 8)], [137, 80, 78, 71, 13, 10, 26, 10], "dark artwork is a PNG");
assert.equal(darkArtwork.readUInt32BE(16), 1143, "dark artwork width");
assert.equal(darkArtwork.readUInt32BE(20), 360, "dark artwork height");

const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox", "--disable-setuid-sandbox"] });
const page = await browser.newPage();

try {
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await page.goto(process.env.PORTFOLIO_URL ?? "http://localhost:3001/", { waitUntil: "domcontentloaded" });
  await page.waitForSelector("[data-footer-image] img");
  await page.waitForFunction(() => document.querySelector("[data-footer-image] img")?.complete === true);
  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = "auto";
    document.querySelector("[data-footer-image]")?.scrollIntoView({ block: "center", behavior: "auto" });
  });

  const desktop = await page.$eval("[data-footer-image]", (container) => {
    const rect = container.getBoundingClientRect();
    const image = container.querySelector("img");
    if (!image) throw new Error("footer image is missing");
    const imageRect = image.getBoundingClientRect();
    const frameElement = document.querySelector(".dm-site-frame");
    if (!frameElement) throw new Error("portfolio frame is missing");
    const frame = frameElement.getBoundingClientRect();
    return {
      x: rect.x,
      width: rect.width,
      right: rect.right,
      imageWidth: imageRect.width,
      imageHeight: imageRect.height,
      imageRight: imageRect.right,
      containerHeight: rect.height,
      footerBottomY: document.querySelector(".dm-footer-bottom")?.getBoundingClientRect().y ?? 0,
      naturalWidth: image.naturalWidth,
      naturalHeight: image.naturalHeight,
      display: getComputedStyle(image).display,
      src: image.getAttribute("src"),
      content: getComputedStyle(image).content,
      frameX: frame.x,
      frameRight: frame.right,
    };
  });
  assert.ok(desktop.naturalWidth > 0 && desktop.naturalHeight > 0, "footer image loaded");
  assert.ok(Math.abs(desktop.x) <= 1 && Math.abs(desktop.width - 1440) <= 1, "desktop artwork spans the viewport");
  assert.ok(desktop.x <= desktop.frameX && desktop.right >= desktop.frameRight, "desktop artwork clears the frame grid");
  assert.ok(desktop.imageWidth > 0 && desktop.imageRight <= 1440, "desktop artwork image stays within its full-bleed container");
  assert.equal(desktop.display, "block");
  assert.equal(desktop.src, "/images/mediterranean-coast-vector.svg", "light artwork source remains unchanged");
  assert.equal(desktop.content, "normal", "light artwork is not overridden");
  assert.ok(desktop.imageHeight > 0, "light artwork reserves its height");
  assert.equal(await page.$("[data-footer-art-canvas]"), null, "pixelated canvas was removed");

  await page.evaluate(() => { document.documentElement.dataset.theme = "dark"; });
  const darkMode = await page.$eval("[data-footer-image] img", (image) => ({
    src: image.getAttribute("src"),
    content: getComputedStyle(image).content,
  }));
  assert.equal(darkMode.src, "/images/mediterranean-coast-vector.svg", "dark mode preserves the semantic image source");
  assert.match(darkMode.content, /coastal-exact-dark-transparent\.png/, "dark mode renders the supplied artwork");
  await page.waitForFunction(() => document.querySelector("[data-footer-image] img")?.getBoundingClientRect().height > 0);
  const darkGeometry = await page.$eval("[data-footer-image]", (container) => {
    const image = container.querySelector("img");
    const imageRect = image?.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    return {
      imageHeight: imageRect?.height ?? 0,
      containerHeight: containerRect.height,
      footerBottomY: document.querySelector(".dm-footer-bottom")?.getBoundingClientRect().y ?? 0,
    };
  });
  assert.ok(Math.abs(darkGeometry.imageHeight - desktop.imageHeight) <= 1, "artwork height stays stable across themes");
  assert.ok(Math.abs(darkGeometry.containerHeight - desktop.containerHeight) <= 1, "artwork container height stays stable across themes");
  assert.ok(Math.abs(darkGeometry.footerBottomY - desktop.footerBottomY) <= 1, "footer content does not move across themes");
  await page.evaluate(() => { document.documentElement.dataset.theme = "light"; });

  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
  await page.reload({ waitUntil: "domcontentloaded" });
  await page.waitForSelector("[data-footer-image] img");
  const mobile = await page.$eval("[data-footer-image]", (container) => {
    const rect = container.getBoundingClientRect();
    const image = container.querySelector("img");
    const imageRect = image?.getBoundingClientRect();
    return { width: rect.width, x: rect.x, right: rect.right, imageRight: imageRect?.right ?? 0 };
  });
  assert.ok(Math.abs(mobile.x) <= 1 && Math.abs(mobile.width - 390) <= 1, "mobile artwork spans the viewport");
  assert.ok(mobile.right <= 390 && mobile.imageRight <= 390, "mobile artwork does not overflow horizontally");

  console.log("davemiye footer image checks passed");
} finally {
  await browser.close();
}
