import assert from "node:assert/strict";
import puppeteer from "puppeteer";

const url = process.env.PORTFOLIO_URL ?? "http://localhost:3001/";
const viewports = [375, 768, 769, 1100, 1440, 1600];
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
        return bounds ? { x: bounds.x, y: bounds.y, width: bounds.width, right: bounds.right, bottom: bounds.bottom, height: bounds.height } : null;
      };
      const intro = rect(".dm-intro");
      const heroLandscape = rect(".dm-hero-landscape");
      const heroLandscapeStyle = select(".dm-hero-landscape") ? getComputedStyle(select(".dm-hero-landscape")) : null;
      const heroLandscapeSvg = select(".dm-hero-landscape svg");
      const heroLandscapeLightImage = select(".dm-hero-landscape .dm-hero-landscape-image--light");
      const heroLandscapeDarkImage = select(".dm-hero-landscape .dm-hero-landscape-image--dark");
      const heroLandscapeImage = heroLandscapeLightImage;
      const heroLandscapeImageRect = heroLandscapeImage?.getBoundingClientRect();
      const character = rect(".dm-character");
      const characterStyle = select(".dm-character") ? getComputedStyle(select(".dm-character")) : null;
      const characterSilhouette = select(".dm-character-silhouette--light");
      const characterSilhouetteStyle = characterSilhouette ? getComputedStyle(characterSilhouette) : null;
      const characterArtStyle = select(".dm-character-art--light") ? getComputedStyle(select(".dm-character-art--light")) : null;
      const greeting = rect(".dm-greeting");
      const frame = rect(".dm-site-frame");
      const header = rect(".dm-header");
      const headerInner = rect(".dm-header-inner");
      const rail = rect(".dm-project-rail");
      const project = rect(".dm-project");
      const contact = rect("#contact");
      const experienceHeadingStyle = select("#experience h2") ? getComputedStyle(select("#experience h2")) : null;
      const contactHeadingStyle = select("#contact h2") ? getComputedStyle(select("#contact h2")) : null;
      const railElement = select(".dm-project-rail");
      const frameStyle = select(".dm-site-frame") ? getComputedStyle(select(".dm-site-frame")) : null;
      const headerStyle = select(".dm-header") ? getComputedStyle(select(".dm-header")) : null;
      const headerInnerStyle = select(".dm-header-inner") ? getComputedStyle(select(".dm-header-inner")) : null;
      const contactStyle = select("#contact") ? getComputedStyle(select("#contact")) : null;
      const paragraph = select(".dm-intro-copy > p");
      const nav = rect(".dm-nav");
      const wordmark = rect(".dm-wordmark");
      const wordmarkStyle = select(".dm-wordmark") ? getComputedStyle(select(".dm-wordmark")) : null;
      const navLinkStyle = select(".dm-nav a") ? getComputedStyle(select(".dm-nav a")) : null;
      const activeNavStyle = select(".dm-nav a:first-child") ? getComputedStyle(select(".dm-nav a:first-child")) : null;
      const soundIconStyle = select(".dm-sound-toggle svg") ? getComputedStyle(select(".dm-sound-toggle svg")) : null;
      const themeIconStyle = select(".theme-toggle svg") ? getComputedStyle(select(".theme-toggle svg")) : null;
      const headerTimeStyle = select(".dm-header-time") ? getComputedStyle(select(".dm-header-time")) : null;
      const timezoneLabel = select(".dm-timezone-label");
      const timezoneLabelStyle = timezoneLabel ? getComputedStyle(timezoneLabel) : null;

      return {
        width: innerWidth,
        overflow: document.documentElement.scrollWidth > innerWidth,
        frameX: frame?.x ?? 0,
        frameWidth: frame?.width ?? 0,
        frameMaxWidth: frameStyle?.maxWidth ?? "",
        frameBorderLeft: frameStyle?.borderLeftStyle ?? "",
        frameBorderRight: frameStyle?.borderRightStyle ?? "",
        headerX: header?.x ?? 0,
        headerWidth: header?.width ?? 0,
        headerHeight: header?.height ?? 0,
        headerBackground: headerStyle?.backgroundColor ?? "",
        headerColor: headerStyle?.color ?? "",
        headerBorderBottom: headerStyle?.borderBottomStyle ?? "",
        headerBlendMode: headerStyle?.mixBlendMode ?? "",
        headerBackdropFilter: headerStyle?.backdropFilter ?? "",
        headerInnerX: headerInner?.x ?? 0,
        headerInnerWidth: headerInner?.width ?? 0,
        headerInnerHeight: headerInner?.height ?? 0,
        headerInnerBorderLeft: headerInnerStyle?.borderLeftStyle ?? "",
        headerInnerBorderRight: headerInnerStyle?.borderRightStyle ?? "",
        themeIcon: select(".theme-toggle svg")?.dataset.themeIcon ?? "",
        themeIconClass: select(".theme-toggle svg")?.getAttribute("class") ?? "",
        gmtDisplay: select(".dm-header-time") ? getComputedStyle(select(".dm-header-time")).display : "",
        railX: rail?.x ?? 0,
        railWidth: rail?.width ?? 0,
        railRight: rail?.right ?? 0,
        projectX: project?.x ?? 0,
        projectWidth: project?.width ?? 0,
        projectRight: project?.right ?? 0,
        contactY: contact?.y ?? 0,
        contactPaddingTop: contactStyle?.paddingTop ?? "",
        experienceHeadingFontSize: experienceHeadingStyle?.fontSize ?? "",
        contactHeadingFontSize: contactHeadingStyle?.fontSize ?? "",
        contactHeadingTop: contactHeadingStyle?.top ?? "",
        projectCount: document.querySelectorAll(".dm-project").length,
        railClientWidth: railElement?.clientWidth ?? 0,
        railScrollWidth: railElement?.scrollWidth ?? 0,
        railOverflowX: railElement ? getComputedStyle(railElement).overflowX : "",
        documentScrollWidth: document.documentElement.scrollWidth,
        bodyScrollWidth: document.body.scrollWidth,
        introHeight: intro?.height ?? 0,
        heroX: heroLandscape?.x ?? 0,
        heroY: heroLandscape?.y ?? 0,
        heroWidth: heroLandscape?.width ?? 0,
        heroHeight: heroLandscape?.height ?? 0,
        heroPosition: heroLandscapeStyle?.position ?? "",
        heroBackground: heroLandscapeStyle?.backgroundColor ?? "",
        heroRadius: heroLandscapeStyle?.borderTopLeftRadius ?? "",
        heroBoxShadow: heroLandscapeStyle?.boxShadow ?? "",
        heroOverflow: heroLandscapeStyle?.overflow ?? "",
        heroViewBox: heroLandscapeSvg?.getAttribute("viewBox") ?? "",
        heroShapeRendering: heroLandscapeSvg?.getAttribute("shape-rendering") ?? "",
        heroImageWidthAttribute: heroLandscapeImage?.getAttribute("width") ?? "",
        heroImageHeightAttribute: heroLandscapeImage?.getAttribute("height") ?? "",
        heroLightImageHref: heroLandscapeLightImage?.getAttribute("href") ?? "",
        heroDarkImageHref: heroLandscapeDarkImage?.getAttribute("href") ?? "",
        heroLightImageDisplay: heroLandscapeLightImage ? getComputedStyle(heroLandscapeLightImage).display : "",
        heroDarkImageDisplay: heroLandscapeDarkImage ? getComputedStyle(heroLandscapeDarkImage).display : "",
        heroImagePreserveAspectRatio: heroLandscapeImage?.getAttribute("preserveAspectRatio") ?? "",
        heroSvgPreserveAlign: heroLandscapeSvg?.preserveAspectRatio?.baseVal?.align ?? 0,
        heroImagePreserveAlign: heroLandscapeImage?.preserveAspectRatio?.baseVal?.align ?? 0,
        heroImageMeetOrSlice: heroLandscapeImage?.preserveAspectRatio?.baseVal?.meetOrSlice ?? 0,
        heroImageWidth: heroLandscapeImageRect?.width ?? 0,
        heroImageHeight: heroLandscapeImageRect?.height ?? 0,
        characterTop: character?.y ?? 0,
        characterBottom: character?.bottom ?? 0,
        characterHeight: character?.height ?? 0,
        characterZIndex: characterStyle?.zIndex ?? "",
        characterIsolation: characterStyle?.isolation ?? "",
        characterSilhouetteDisplay: characterSilhouetteStyle?.display ?? "",
        characterSilhouettePosition: characterSilhouetteStyle?.position ?? "",
        characterFilter: characterArtStyle?.filter ?? "",
        greetingTop: greeting?.y ?? 0,
        paragraphMaxWidth: paragraph ? getComputedStyle(paragraph).maxWidth : "",
        navX: nav?.x ?? 0,
        wordmarkRight: wordmark ? wordmark.x + wordmark.width : 0,
        wordmarkFontSize: wordmarkStyle?.fontSize ?? "",
        navFontSize: navLinkStyle?.fontSize ?? "",
        activeNavFontWeight: activeNavStyle?.fontWeight ?? "",
        activeNavColor: activeNavStyle?.color ?? "",
        soundIconWidth: soundIconStyle?.width ?? "",
        soundIconHeight: soundIconStyle?.height ?? "",
        themeIconWidth: themeIconStyle?.width ?? "",
        themeIconHeight: themeIconStyle?.height ?? "",
        gmtFontSize: headerTimeStyle?.fontSize ?? "",
        timezoneText: timezoneLabel?.textContent ?? "",
        timezoneColor: timezoneLabelStyle?.color ?? "",
        desktopNavDisplay: select(".dm-nav") ? getComputedStyle(select(".dm-nav")).display : "",
        menuDisplay: select(".dm-menu-button") ? getComputedStyle(select(".dm-menu-button")).display : "",
      };
    });

    assert.equal(metrics.overflow, false, `horizontal overflow at ${width}px`);
    assert.equal(metrics.documentScrollWidth, width, `document scroll width at ${width}px`);
    assert.equal(metrics.bodyScrollWidth, width, `body scroll width at ${width}px`);
    const expectedFrameWidth = Math.min(width, 800);
    const expectedFrameX = (width - expectedFrameWidth) / 2;
    assert.ok(Math.abs(metrics.frameWidth - expectedFrameWidth) <= 1, `frame width at ${width}px`);
    assert.ok(Math.abs(metrics.frameX - expectedFrameX) <= 1, `frame centering at ${width}px`);
    assert.ok(Math.abs(metrics.headerWidth - width) <= 1, `header viewport width at ${width}px`);
    assert.ok(Math.abs(metrics.headerX) <= 1, `header viewport alignment at ${width}px`);
    assert.equal(metrics.headerHeight, 49, `header height at ${width}px`);
    assert.equal(metrics.headerBackground, "rgb(241, 238, 233)", `light header background at ${width}px`);
    assert.equal(metrics.headerColor, "rgb(20, 20, 18)", `light header text color at ${width}px`);
    assert.equal(metrics.headerBorderBottom, "dashed", `header separator at ${width}px`);
    assert.equal(metrics.headerBlendMode, "normal", `header blend mode at ${width}px`);
    assert.equal(metrics.headerBackdropFilter, "blur(12px)", `header blur at ${width}px`);
    assert.ok(Math.abs(metrics.headerInnerWidth - expectedFrameWidth) <= 1, `header grid width at ${width}px`);
    assert.ok(Math.abs(metrics.headerInnerX - expectedFrameX) <= 1, `header grid alignment at ${width}px`);
    assert.equal(metrics.headerInnerHeight, 48, `header grid height at ${width}px`);
    assert.equal(metrics.headerInnerBorderLeft, "dashed", `header grid left edge at ${width}px`);
    assert.equal(metrics.headerInnerBorderRight, "dashed", `header grid right edge at ${width}px`);
    assert.equal(metrics.themeIcon, "moon", `light theme icon at ${width}px`);
    assert.match(metrics.themeIconClass, /lucide-moon/, `light theme icon glyph at ${width}px`);
    assert.equal(metrics.frameMaxWidth, "800px", `frame max-width at ${width}px`);
    assert.equal(metrics.frameBorderLeft, "dashed", `left frame border at ${width}px`);
    assert.equal(metrics.frameBorderRight, "dashed", `right frame border at ${width}px`);
    assert.ok(metrics.railX >= expectedFrameX && metrics.railX <= expectedFrameX + 1, `project rail alignment at ${width}px`);
    assert.ok(metrics.railWidth > 0 && metrics.railWidth <= expectedFrameWidth, `project rail width at ${width}px`);
    assert.ok(metrics.railRight <= expectedFrameX + expectedFrameWidth, `project rail ends inside frame at ${width}px`);
    assert.ok(metrics.projectX >= expectedFrameX - 1, `project card starts inside frame at ${width}px`);
    assert.ok(metrics.projectRight <= expectedFrameX + expectedFrameWidth + 1, `project card ends inside frame at ${width}px`);
    assert.equal(metrics.projectCount, 2, `project count at ${width}px`);
    assert.equal(metrics.railOverflowX, "auto", `project rail overflow mode at ${width}px`);
    assert.ok(metrics.railScrollWidth > metrics.railClientWidth, `project rail scroll range at ${width}px`);
    const railPadding = width <= 768 ? 40 : 64;
    const expectedProjectWidth = expectedFrameWidth - 2 - railPadding;
    assert.ok(Math.abs(metrics.projectWidth - expectedProjectWidth) <= 1, `project card fills frame content at ${width}px`);

    const scrollState = await page.$eval(".dm-project-rail", (rail) => {
      const maxScroll = rail.scrollWidth - rail.clientWidth;
      rail.style.scrollBehavior = "auto";
      rail.scrollLeft = maxScroll;
      return { maxScroll, scrollLeft: rail.scrollLeft };
    });
    assert.ok(scrollState.maxScroll > 0, `project rail has a scroll range at ${width}px`);
    assert.equal(scrollState.scrollLeft, scrollState.maxScroll, `project rail scrolls to the second card at ${width}px`);
    assert.equal(
      metrics.paragraphMaxWidth,
      width <= 768 ? "min(500px, 100%)" : "608px",
      `hero paragraph width at ${width}px`,
    );

    const expectedIntroHeight = width <= 768 ? 900 : 877;
    assert.ok(metrics.introHeight >= expectedIntroHeight - 1, `hero height at ${width}px`);
    assert.ok(Math.abs(metrics.heroY - (width <= 768 ? 70 : 74)) <= 1, `landscape lower offset at ${width}px`);
    const expectedHeroWidth = expectedFrameWidth - 2 - (width <= 768 ? 40 : 64);
    assert.ok(Math.abs(metrics.heroWidth - expectedHeroWidth) <= 1, `landscape width at ${width}px`);
    assert.ok(Math.abs(metrics.heroHeight - (expectedHeroWidth * 671) / 2048) <= 1, `landscape aspect ratio at ${width}px`);
    assert.equal(metrics.heroPosition, "absolute", `landscape positioning at ${width}px`);
    assert.equal(metrics.heroBackground, "rgb(241, 238, 233)", `landscape carved whitespace color at ${width}px`);
    assert.equal(metrics.heroRadius, width <= 768 ? "6px" : "8px", `landscape slightly rounded corners at ${width}px`);
    assert.match(metrics.heroBoxShadow, /1px.*inset/, `landscape smooth border at ${width}px`);
    assert.equal(metrics.heroOverflow, "hidden", `landscape clipping at ${width}px`);
    assert.equal(metrics.heroViewBox, "0 0 2048 671", `landscape intrinsic viewBox at ${width}px`);
    assert.equal(metrics.heroShapeRendering, "geometricPrecision", `landscape vector edge smoothing at ${width}px`);
    assert.equal(metrics.heroImageWidthAttribute, "2048", `landscape intrinsic width at ${width}px`);
    assert.equal(metrics.heroImageHeightAttribute, "671", `landscape intrinsic height at ${width}px`);
    assert.match(metrics.heroLightImageHref, /hero-landscape-light\.gif$/, `light landscape animation asset at ${width}px`);
    assert.match(metrics.heroDarkImageHref, /hero-landscape-dark\.gif$/, `dark landscape animation asset at ${width}px`);
    assert.notEqual(metrics.heroLightImageDisplay, "none", `light landscape is visible at ${width}px`);
    assert.equal(metrics.heroDarkImageDisplay, "none", `dark landscape is hidden in light mode at ${width}px`);
    assert.equal(metrics.heroImagePreserveAspectRatio, "xMidYMid meet", `landscape image aspect preservation at ${width}px`);
    assert.equal(metrics.heroSvgPreserveAlign, 6, `landscape SVG xMidYMid alignment at ${width}px`);
    assert.equal(metrics.heroImagePreserveAlign, 6, `landscape image xMidYMid alignment at ${width}px`);
    assert.equal(metrics.heroImageMeetOrSlice, 1, `landscape image meet mode at ${width}px`);
    assert.ok(Math.abs(metrics.heroImageWidth - metrics.heroWidth) <= 1, `landscape image fills width at ${width}px`);
    assert.ok(Math.abs(metrics.heroImageHeight - metrics.heroHeight) <= 1, `landscape image fills height at ${width}px`);

    const darkLandscapeDisplays = await page.evaluate(() => {
      document.documentElement.dataset.theme = "dark";
      return {
        light: getComputedStyle(document.querySelector(".dm-hero-landscape-image--light")).display,
        dark: getComputedStyle(document.querySelector(".dm-hero-landscape-image--dark")).display,
      };
    });
    assert.equal(darkLandscapeDisplays.light, "none", `light landscape is hidden in dark mode at ${width}px`);
    assert.notEqual(darkLandscapeDisplays.dark, "none", `dark landscape is visible at ${width}px`);
    assert.ok(metrics.characterTop < metrics.heroY + metrics.heroHeight, `avatar attaches to landscape at ${width}px`);
    assert.ok(metrics.characterBottom > metrics.heroY, `avatar remains in front of landscape at ${width}px`);
    assert.ok(metrics.characterBottom <= metrics.greetingTop, `greeting clears avatar at ${width}px`);
    assert.equal(metrics.characterZIndex, "3", `avatar layer above landscape at ${width}px`);
    assert.equal(metrics.characterIsolation, "isolate", `avatar has an isolated stacking context at ${width}px`);
    assert.equal(metrics.characterSilhouetteDisplay, "block", `avatar silhouette visible at ${width}px`);
    assert.equal(metrics.characterSilhouettePosition, "absolute", `avatar silhouette layer at ${width}px`);
    assert.match(metrics.characterFilter, /drop-shadow/, `avatar silhouette separation at ${width}px`);
    assert.match(metrics.characterFilter, /4px/, `avatar edge smoothing at ${width}px`);
    assert.equal(metrics.contactPaddingTop, width <= 639 ? "72px" : "80px", `contact section lift at ${width}px`);
    assert.equal(metrics.experienceHeadingFontSize, "16px", `experience heading size at ${width}px`);
    assert.equal(metrics.contactHeadingFontSize, "16px", `contact heading size at ${width}px`);
    assert.equal(metrics.contactHeadingTop, "-6px", `contact heading lift at ${width}px`);
    assert.equal(metrics.wordmarkFontSize, "23px", `wordmark size at ${width}px`);

    if (width > 768) {
      assert.equal(metrics.navFontSize, "14px", `header nav size at ${width}px`);
      assert.equal(metrics.activeNavFontWeight, "400", `active nav weight at ${width}px`);
      assert.equal(metrics.activeNavColor, "rgb(20, 20, 18)", `active nav color at ${width}px`);
      assert.equal(metrics.soundIconWidth, "16px", `sound icon width at ${width}px`);
      assert.equal(metrics.soundIconHeight, "16px", `sound icon height at ${width}px`);
      assert.equal(metrics.themeIconWidth, "17px", `theme icon width at ${width}px`);
      assert.equal(metrics.themeIconHeight, "17px", `theme icon height at ${width}px`);
    assert.equal(metrics.gmtFontSize, "12px", `GMT size at ${width}px`);
      assert.equal(metrics.timezoneText, "IST", `India timezone label at ${width}px`);
      assert.equal(metrics.timezoneColor, "rgb(95, 91, 86)", `India timezone label contrast at ${width}px`);
      assert.ok(metrics.navX - metrics.wordmarkRight >= 32, `header group gap at ${width}px`);
      assert.equal(metrics.desktopNavDisplay, "flex", `desktop nav visibility at ${width}px`);
      assert.equal(metrics.gmtDisplay, "flex", `GMT visibility at ${width}px`);
    } else {
      assert.equal(metrics.desktopNavDisplay, "none", `mobile nav visibility at ${width}px`);
      assert.equal(metrics.menuDisplay, "block", `mobile menu visibility at ${width}px`);
      assert.equal(metrics.gmtDisplay, "none", `mobile GMT visibility at ${width}px`);
    }
  }

  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await page.goto(url, { waitUntil: "networkidle0" });
  await page.click(".theme-toggle");
  await page.waitForFunction(() => document.documentElement.dataset.theme === "dark");
  const darkTheme = await page.evaluate(() => {
    const header = document.querySelector(".dm-header");
    const time = document.querySelector(".dm-header-time");
    const liveTime = time?.querySelector("time");
    const icon = document.querySelector(".theme-toggle svg");
    return {
      background: header ? getComputedStyle(header).backgroundColor : "",
      color: header ? getComputedStyle(header).color : "",
      gmtColor: time ? getComputedStyle(time).color : "",
      timeColor: liveTime ? getComputedStyle(liveTime).color : "",
      timezoneColor: time?.querySelector(".dm-timezone-label") ? getComputedStyle(time.querySelector(".dm-timezone-label")).color : "",
      icon: icon?.dataset.themeIcon ?? "",
      iconClass: icon?.getAttribute("class") ?? "",
    };
  });
  assert.equal(darkTheme.background, "rgb(20, 20, 18)", "dark header background");
  assert.equal(darkTheme.color, "rgb(241, 238, 233)", "dark header text color");
  assert.equal(darkTheme.gmtColor, "rgb(241, 238, 233)", "GMT label contrast in dark mode");
  assert.equal(darkTheme.timeColor, "rgb(241, 238, 233)", "GMT time contrast in dark mode");
  assert.equal(darkTheme.timezoneColor, "rgb(145, 139, 131)", "IST label contrast in dark mode");
  assert.equal(darkTheme.icon, "sun", "dark theme icon");
  assert.match(darkTheme.iconClass, /lucide-sun/, "dark theme icon glyph");

  console.log("davemiye clone viewport checks passed");
} finally {
  await browser.close();
}
