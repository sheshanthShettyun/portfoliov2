import assert from "node:assert/strict";
import puppeteer from "puppeteer";

const url = process.env.PORTFOLIO_URL ?? "http://localhost:3001/";
const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox", "--disable-setuid-sandbox"] });
const page = await browser.newPage();

try {
  await page.evaluateOnNewDocument(() => {
    const nativeMatchMedia = window.matchMedia.bind(window);
    window.matchMedia = (query) => {
      const media = nativeMatchMedia(query);
      if (query === "(pointer: fine)") Object.defineProperty(media, "matches", { configurable: true, value: true });
      return media;
    };
  });
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await page.goto(url, { waitUntil: "networkidle0" });
  await page.waitForFunction(() => document.documentElement.classList.contains("dm-custom-cursor"));

  const finePointer = await page.evaluate(() => {
    const cursor = document.querySelector(".dm-cursor");
    const style = cursor ? getComputedStyle(cursor) : null;
    return {
      pointerFine: matchMedia("(pointer: fine)").matches,
      reducedMotion: matchMedia("(prefers-reduced-motion: reduce)").matches,
      rootClass: document.documentElement.classList.contains("dm-custom-cursor"),
      width: style?.width ?? "",
      height: style?.height ?? "",
      background: style?.backgroundColor ?? "",
      pointerEvents: style?.pointerEvents ?? "",
      cursor: getComputedStyle(document.body).cursor,
    };
  });

  assert.equal(finePointer.pointerFine, true, "desktop test uses a fine pointer");
  assert.equal(finePointer.reducedMotion, false, "desktop test does not reduce motion");
  assert.equal(finePointer.rootClass, true, "custom cursor class enabled for fine pointers");
  assert.equal(finePointer.width, "8px", "cursor dot width");
  assert.equal(finePointer.height, "8px", "cursor dot height");
  assert.equal(finePointer.background, "rgb(17, 17, 17)", "cursor dot is black");
  assert.equal(finePointer.pointerEvents, "none", "cursor dot does not intercept input");
  assert.equal(finePointer.cursor, "none", "native cursor hidden for fine pointers");

  await page.evaluate(() => { document.documentElement.dataset.theme = "dark"; });
  const darkModeCursor = await page.$eval(".dm-cursor", (cursor) => getComputedStyle(cursor).backgroundColor);
  assert.equal(darkModeCursor, "rgb(255, 255, 255)", "dark mode cursor dot is white");

  await page.mouse.move(240, 320);
  await page.waitForFunction(() => getComputedStyle(document.querySelector(".dm-cursor")).opacity === "1");
  await new Promise((resolve) => setTimeout(resolve, 80));
  const dotPosition = await page.$eval(".dm-cursor", (cursor) => {
    const bounds = cursor.getBoundingClientRect();
    return { x: bounds.left + bounds.width / 2, y: bounds.top + bounds.height / 2 };
  });
  assert.ok(Math.abs(dotPosition.x - 240) <= 2, "cursor dot follows pointer horizontally");
  assert.ok(Math.abs(dotPosition.y - 320) <= 2, "cursor dot follows pointer vertically");

  await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  await page.reload({ waitUntil: "networkidle0" });
  const reducedMotion = await page.$eval(".dm-cursor", (cursor) => ({
    rootClass: document.documentElement.classList.contains("dm-custom-cursor"),
    display: getComputedStyle(cursor).display,
    cursor: getComputedStyle(document.body).cursor,
  }));
  assert.equal(reducedMotion.rootClass, false, "reduced motion keeps the native cursor");
  assert.equal(reducedMotion.display, "none", "reduced motion hides the animated dot");
  assert.notEqual(reducedMotion.cursor, "none", "reduced motion does not hide the native cursor");

  const touchPage = await browser.newPage();
  await touchPage.emulate({
    viewport: { width: 375, height: 900, isMobile: true, hasTouch: true },
    userAgent: "Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 Chrome/120 Mobile Safari/537.36",
  });
  await touchPage.goto(url, { waitUntil: "networkidle0" });
  const touchPointer = await touchPage.$eval(".dm-cursor", (cursor) => ({
    pointerFine: matchMedia("(pointer: fine)").matches,
    pointerCoarse: matchMedia("(pointer: coarse)").matches,
    rootClass: document.documentElement.classList.contains("dm-custom-cursor"),
    display: getComputedStyle(cursor).display,
    cursor: getComputedStyle(document.body).cursor,
  }));
  assert.equal(touchPointer.pointerFine, false, "touch test does not use a fine pointer");
  assert.equal(touchPointer.pointerCoarse, true, "touch test uses a coarse pointer");
  assert.equal(touchPointer.rootClass, false, "custom cursor class disabled for touch");
  assert.equal(touchPointer.display, "none", "touch hides the dot");
  assert.notEqual(touchPointer.cursor, "none", "touch keeps the native cursor behavior");
  await touchPage.close();

  console.log("davemiye cursor checks passed");
} finally {
  await browser.close();
}
