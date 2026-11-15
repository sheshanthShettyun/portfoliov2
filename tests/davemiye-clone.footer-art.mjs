import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import puppeteer from "puppeteer";

const footer = await readFile(new URL("../src/components/davemiye/ContactFooter.tsx", import.meta.url), "utf8");
const styles = await readFile(new URL("../src/app/globals.css", import.meta.url), "utf8");
const artwork = await readFile(new URL("../public/images/mediterranean-coast-vector.svg", import.meta.url), "utf8");

assert.match(footer, /data-footer-image/);
assert.match(footer, /src="\/images\/mediterranean-coast-vector\.svg"/);
assert.match(footer, /alt="Mediterranean coast landscape"/);
assert.doesNotMatch(footer, /FooterCanvasArt|data-footer-art-canvas/);
assert.match(styles, /\.dm-footer-image\{/);
assert.match(styles, /\.dm-footer-image img\{/);
assert.doesNotMatch(styles, /\.dm-footer-art\{/);
assert.match(artwork, /viewBox="0 0 2172 724"/);
assert.match(artwork, /#15517F/);
assert.doesNotMatch(artwork, /<rect\b/i, "the supplied artwork background is transparent for footer blending");

const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox", "--disable-setuid-sandbox"] });
const page = await browser.newPage();

try {
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await page.goto(process.env.PORTFOLIO_URL ?? "http://localhost:3001/", { waitUntil: "domcontentloaded" });
  await page.waitForSelector("[data-footer-image] img");
  await page.waitForFunction(() => document.querySelector("[data-footer-image] img")?.complete === true);
  await page.evaluate(() => document.querySelector("[data-footer-image]")?.scrollIntoView({ block: "center" }));

  const desktop = await page.$eval("[data-footer-image] img", (image) => {
    const rect = image.getBoundingClientRect();
    return {
      width: rect.width,
      height: rect.height,
      naturalWidth: image.naturalWidth,
      naturalHeight: image.naturalHeight,
      display: getComputedStyle(image).display,
    };
  });
  assert.ok(desktop.naturalWidth > 0 && desktop.naturalHeight > 0, "footer image loaded");
  assert.ok(desktop.width >= 1200, "desktop artwork spans the footer width");
  assert.equal(desktop.display, "block");
  assert.equal(await page.$("[data-footer-art-canvas]"), null, "pixelated canvas was removed");

  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
  await page.reload({ waitUntil: "domcontentloaded" });
  await page.waitForSelector("[data-footer-image] img");
  const mobile = await page.$eval("[data-footer-image] img", (image) => {
    const rect = image.getBoundingClientRect();
    return { width: rect.width, right: rect.right };
  });
  assert.ok(mobile.width <= 390, "mobile artwork fits the viewport");
  assert.ok(mobile.right <= 390, "mobile artwork does not overflow horizontally");

  console.log("davemiye footer image checks passed");
} finally {
  await browser.close();
}
