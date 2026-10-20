const { chromium } = require("playwright-core");
const assert = require("node:assert/strict");
const base = process.env.TEST_BASE_URL || "http://localhost:3000";
(async () => {
  const browser = await chromium.launch({
    executablePath: "/usr/bin/chromium",
    args: [
      "--no-sandbox",
      "--use-gl=angle",
      "--use-angle=swiftshader",
      "--enable-unsafe-swiftshader",
    ],
  });
  try {
    const page = await browser.newPage({
      viewport: { width: 1440, height: 1000 },
    });
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.addInitScript(() =>
      sessionStorage.setItem("barber-studio:intro:v2", "seen"),
    );
    await page.goto(base);
    await page.locator(".product-stage").scrollIntoViewIfNeeded();
    await page.locator(".product-model canvas").waitFor();
    await page.waitForTimeout(1800);
    await page.getByRole("button", { name: "01 Lâmina" }).click();
    await page
      .getByRole("heading", { name: "A LÂMINA.", exact: true })
      .waitFor();
    const area = await page.locator(".product-model").boundingBox();
    await page.mouse.move(
      area.x + area.width * 0.4,
      area.y + area.height * 0.45,
    );
    await page.mouse.down();
    await page.mouse.move(
      area.x + area.width * 0.7,
      area.y + area.height * 0.5,
      { steps: 15 },
    );
    await page.mouse.up();
    await page.waitForTimeout(500);
    await page.screenshot({ path: "/tmp/barber-clipper-3d.png" });
    await page
      .getByRole("button", { name: "Restaurar ângulo da máquina" })
      .click();
    await page
      .getByRole("heading", { name: "O INSTRUMENTO.", exact: true })
      .waitFor();
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.locator(".clipper-fallback").waitFor();
    assert.equal(
      await page.locator(".product-model canvas").count(),
      0,
      "Reduced motion must unload WebGL",
    );
    assert.deepEqual(errors, []);
    console.log(
      "PASS: procedural clipper WebGL, detail control, drag, reset, reduced-motion fallback and no runtime errors.",
    );
  } finally {
    await browser.close();
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
