import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import puppeteer from "puppeteer";

const lightAsset = await readFile(new URL("../public/images/sriyaan-character-light.svg", import.meta.url), "utf8");
const darkAsset = await readFile(new URL("../public/images/sriyaan-character-dark.svg", import.meta.url), "utf8");
const suppliedLightAsset = await readFile("/home/sriyaan/Downloads/sriyaan-light.svg", "utf8");
const suppliedDarkAsset = await readFile("/home/sriyaan/Downloads/sriyaan-dark.svg", "utf8");
const character = await readFile(new URL("../src/components/davemiye/SriyaanCharacter.tsx", import.meta.url), "utf8");

const extractPathData = (asset) => [...asset.matchAll(/<path\b[^>]*\bd="([^"]*)"/g)].map((match) => match[1]);
assert.deepEqual(extractPathData(lightAsset), extractPathData(suppliedLightAsset));
assert.deepEqual(extractPathData(darkAsset), extractPathData(suppliedDarkAsset));

for (const [name, asset] of [["light", lightAsset], ["dark", darkAsset]]) {
  assert.doesNotMatch(asset, /<rect\b/i, `${name} avatar still contains a background rect`);
  assert.doesNotMatch(asset, /<image\b/i, `${name} avatar must remain vector-only`);
  assert.match(asset, /fill="currentColor"/, `${name} avatar linework must be theme-aware`);
}

assert.match(character, /className={`dm-character-art dm-character-art--\$\{variant\}`}/);
assert.match(character, /fill="currentColor"/);
assert.doesNotMatch(character, /<object\b/);

const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox", "--disable-setuid-sandbox"] });
const page = await browser.newPage();
await page.setViewport({ width: 1153, height: 909, deviceScaleFactor: 1 });

try {
  await page.goto(process.env.PORTFOLIO_URL ?? "http://localhost:3001/", { waitUntil: "networkidle0" });
  await page.waitForSelector(".dm-character-art--light .dm-avatar-linework");

  const inspect = () => page.evaluate(() => {
    const root = document.documentElement;
    const activeSelector = root.dataset.theme === "dark" ? ".dm-character-art--dark" : ".dm-character-art--light";
    const active = document.querySelector(activeSelector);
    const linework = active?.querySelector(".dm-avatar-linework");
    const accents = [...(active?.querySelectorAll(".dm-avatar-accent") ?? [])];
    const cssInk = getComputedStyle(root).getPropertyValue("--ink").trim();
    return {
      theme: root.dataset.theme === "dark" ? "dark" : "light",
      cssInk,
      lineworkFill: linework ? getComputedStyle(linework).fill : "",
      accentFills: accents.map((accent) => getComputedStyle(accent).fill),
      pathData: active ? [...active.querySelectorAll("path")].map((path) => path.getAttribute("d")) : [],
      background: active ? getComputedStyle(active).backgroundColor : "",
      rectCount: active?.querySelectorAll("rect").length ?? -1,
    };
  });

  const light = await inspect();
  assert.equal(light.theme, "light");
  assert.equal(light.cssInk, "#141412");
  assert.equal(light.lineworkFill, "rgb(20, 20, 18)");
  assert.deepEqual(light.accentFills, ["rgb(237, 32, 42)", "rgb(49, 92, 255)"]);
  assert.deepEqual(light.pathData, extractPathData(lightAsset));
  assert.equal(light.background, "rgba(0, 0, 0, 0)");
  assert.equal(light.rectCount, 0);

  await page.click(".theme-toggle");
  await page.waitForFunction(() => document.documentElement.dataset.theme === "dark");
  const dark = await inspect();
  assert.equal(dark.theme, "dark");
  assert.equal(dark.cssInk, "#f1eee9");
  assert.equal(dark.lineworkFill, "rgb(241, 238, 233)");
  assert.deepEqual(dark.accentFills, ["rgb(237, 32, 42)", "rgb(49, 92, 255)"]);
  assert.deepEqual(dark.pathData, extractPathData(darkAsset));
  assert.equal(dark.background, "rgba(0, 0, 0, 0)");
  assert.equal(dark.rectCount, 0);

  console.log("davemiye avatar transparency and theme checks passed");
} finally {
  await browser.close();
}
