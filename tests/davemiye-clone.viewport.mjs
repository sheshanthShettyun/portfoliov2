import assert from "node:assert/strict";
import puppeteer from "puppeteer";

const url = process.env.PORTFOLIO_URL ?? "http://localhost:3001/";
const viewports = [375, 768, 769, 1100, 1600];
const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox", "--disable-setuid-sandbox"] });
const page = await browser.newPage();

try {
  for (const width of viewports) {
    await page.setViewport({ width, height: 900, deviceScaleFactor: 1 });
    await page.goto(url, { waitUntil: "networkidle0" });

    const metrics = await page.evaluate(() => {
      const select = (selector) => document.querySelector(selector);
      const rect = (selector) => {
        const element = select(selector);
        const bounds = element?.getBoundingClientRect();
        return bounds ? { x: bounds.x, width: bounds.width, height: bounds.height } : null;
      };
      const intro = rect(".dm-intro");
      const paragraph = select(".dm-intro-copy > p");
      const nav = rect(".dm-nav");
      const wordmark = rect(".dm-wordmark");

      return {
        width: innerWidth,
        overflow: document.documentElement.scrollWidth > innerWidth,
        introHeight: intro?.height ?? 0,
        paragraphMaxWidth: paragraph ? getComputedStyle(paragraph).maxWidth : "",
        navX: nav?.x ?? 0,
        wordmarkRight: wordmark ? wordmark.x + wordmark.width : 0,
        desktopNavDisplay: select(".dm-nav") ? getComputedStyle(select(".dm-nav")).display : "",
        menuDisplay: select(".dm-menu-button") ? getComputedStyle(select(".dm-menu-button")).display : "",
      };
    });

    assert.equal(metrics.overflow, false, `horizontal overflow at ${width}px`);
    assert.equal(
      metrics.paragraphMaxWidth,
      width <= 768 ? "min(500px, 100%)" : "608px",
      `hero paragraph width at ${width}px`,
    );

    const expectedIntroHeight = width <= 768 ? 900 : 877;
    assert.ok(Math.abs(metrics.introHeight - expectedIntroHeight) <= 1, `hero height at ${width}px`);

    if (width > 768) {
      assert.equal(Math.round(metrics.navX - metrics.wordmarkRight), 32, `header group gap at ${width}px`);
      assert.equal(metrics.desktopNavDisplay, "flex", `desktop nav visibility at ${width}px`);
    } else {
      assert.equal(metrics.desktopNavDisplay, "none", `mobile nav visibility at ${width}px`);
      assert.equal(metrics.menuDisplay, "block", `mobile menu visibility at ${width}px`);
    }
  }

  console.log("davemiye clone viewport checks passed");
} finally {
  await browser.close();
}
