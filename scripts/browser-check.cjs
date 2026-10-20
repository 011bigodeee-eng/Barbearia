const { chromium } = require("playwright-core");
const assert = require("node:assert/strict");
const base = process.env.TEST_BASE_URL || "http://localhost:3000";
(async () => {
  const browser = await chromium.launch({
    executablePath: "/usr/bin/chromium",
    headless: true,
    args: ["--no-sandbox"],
  });
  const errors = [];
  try {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 1000 },
    });
    const page = await context.newPage();
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto(base);
    await page.locator(".brand-intro").waitFor();
    assert.equal(
      await page.locator("#site-shell").evaluate((el) => el.inert),
      true,
      "Intro must isolate background focus",
    );
    await page.waitForFunction(
      () =>
        Number(
          getComputedStyle(document.querySelector(".intro-wordmark")).opacity,
        ) > 0.9,
    );
    await page.screenshot({ path: "/tmp/barber-intro.png" });
    await page
      .locator(".brand-intro")
      .waitFor({ state: "detached", timeout: 4500 });
    assert.equal(
      await page.locator("#site-shell").evaluate((el) => el.inert),
      false,
      "Intro must release content",
    );
    assert.notEqual(
      await page.evaluate(() => document.body.style.overflow),
      "hidden",
    );
    assert.equal(
      await page.evaluate(
        () => getComputedStyle(document.body).backgroundColor,
      ),
      "rgb(255, 255, 255)",
    );
    assert.match(await page.locator("h1").innerText(), /SEU ESTILO/);
    await page
      .getByRole("navigation", { name: "Principal", exact: true })
      .getByRole("link", { name: "Sobre", exact: true })
      .click();
    await page.waitForURL("**/sobre");
    await page.goBack();
    await page.waitForURL(base + "/");
    assert.equal(
      await page.locator(".brand-intro").count(),
      0,
      "Intro must not replay during navigation",
    );
    await page.reload();
    assert.equal(
      await page.locator(".brand-intro").count(),
      0,
      "Intro must not replay on reload",
    );
    for (const route of [
      "/sobre",
      "/servicos",
      "/profissionais",
      "/galeria",
      "/agendamento",
      "/contato",
      "/admin",
      "/admin/servicos",
    ]) {
      const response = await page.goto(base + route);
      assert.equal(response.status(), 200, route);
      console.log(route, 200);
    }
    await page.goto(base + "/agendamento?servico=combo");
    await page
      .getByText("PRÉVIA INTERATIVA / SEM RESERVAS REAIS", { exact: true })
      .waitFor();
    await page.waitForFunction(
      () =>
        document.querySelector('select[aria-label="Serviço"]')?.value ===
        "combo",
    );
    await page.getByRole("button", { name: "CONTINUAR" }).click();
    await page
      .getByLabel("Profissional demonstrativo")
      .selectOption("Profissional 02");
    await page.getByRole("button", { name: "CONTINUAR" }).click();
    await page.getByLabel("Data", { exact: true }).fill("2026-12-01");
    await page.getByRole("button", { name: "10:00", exact: true }).click();
    await page.getByRole("button", { name: "CONTINUAR" }).click();
    await page.getByRole("button", { name: "VOLTAR" }).click();
    assert.equal(
      await page.getByLabel("Data", { exact: true }).inputValue(),
      "2026-12-01",
      "Back must retain the selected date",
    );
    assert.equal(
      await page
        .getByRole("button", { name: "10:00", exact: true })
        .getAttribute("aria-pressed"),
      "true",
    );
    await page.getByRole("button", { name: "CONTINUAR" }).click();
    await page.getByRole("button", { name: "VISUALIZAR EXPERIÊNCIA" }).click();
    await page.getByText("Simulação concluída.", { exact: false }).waitFor();
    const refusal = await page.request.post(base + "/api/booking", {
      data: {},
    });
    assert.equal(refusal.status(), 403);
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(base);
    await page.getByRole("button", { name: "Abrir menu" }).click();
    await page
      .locator("#mobile-menu")
      .getByRole("link", { name: "Serviços", exact: false })
      .click();
    await page.waitForURL("**/servicos");
    assert.equal(await page.locator("#mobile-menu").count(), 0);
    await page.getByRole("button", { name: "Abrir menu" }).click();
    await page.keyboard.press("Escape");
    assert.equal(
      await page.locator("#mobile-menu").count(),
      0,
      "Escape closes mobile menu",
    );
    assert.notEqual(
      await page.evaluate(() => document.body.style.overflow),
      "hidden",
    );
    await page.goto(base + "/galeria");
    await page.getByRole("button", { name: "Cortes", exact: true }).click();
    assert.equal(await page.locator(".gallery-grid button").count(), 1);
    await page.locator(".gallery-grid button").click();
    await page.getByRole("dialog").waitFor();
    await page.keyboard.press("Escape");
    assert.equal(await page.getByRole("dialog").count(), 0);
    await page.goto(base + "/admin");
    await page.getByRole("button", { name: "Serviços", exact: true }).click();
    assert.equal(
      await page.locator(".service-row").count(),
      8,
      "Admin preview retains catalog",
    );
    for (const width of [320, 390, 768, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(base);
      assert.equal(
        await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth,
        ),
        false,
        `Home overflow at ${width}`,
      );
    }
    await context.close();
    const skipContext = await browser.newContext({
      viewport: { width: 390, height: 844 },
    });
    const skipPage = await skipContext.newPage();
    skipPage.on("pageerror", (e) => errors.push(e.message));
    await skipPage.goto(base);
    await skipPage.getByRole("button", { name: "Pular introdução" }).click();
    assert.equal(
      await skipPage.locator(".brand-intro").count(),
      0,
      "Skip removes intro immediately",
    );
    assert.equal(
      await skipPage.locator("#site-shell").evaluate((el) => el.inert),
      false,
    );
    await skipContext.close();
    const reducedContext = await browser.newContext({
      reducedMotion: "reduce",
      viewport: { width: 1440, height: 1000 },
    });
    const reducedPage = await reducedContext.newPage();
    reducedPage.on("pageerror", (e) => errors.push(e.message));
    await reducedPage.route("https://images.unsplash.com/**", (route) =>
      route.abort(),
    );
    await reducedPage.goto(base, { waitUntil: "networkidle" });
    assert.equal(
      await reducedPage.locator(".brand-intro").count(),
      0,
      "Reduced motion skips intro",
    );
    await reducedPage.locator(".hero-photo .photo-fallback").waitFor();
    assert.equal(
      await reducedPage
        .locator(".reveal")
        .evaluateAll((nodes) =>
          nodes.every((node) => getComputedStyle(node).opacity === "1"),
        ),
      true,
      "Reduced motion must expose all content without scrolling",
    );
    await reducedPage.screenshot({
      path: "/tmp/barber-white-desktop.png",
      fullPage: true,
    });
    await reducedPage.screenshot({ path: "/tmp/barber-white-hero.png" });
    await reducedPage.setViewportSize({ width: 390, height: 844 });
    await reducedPage.screenshot({
      path: "/tmp/barber-white-mobile.png",
      fullPage: true,
    });
    await reducedPage.screenshot({ path: "/tmp/barber-white-mobile-hero.png" });
    await reducedPage.goto(base + "/agendamento");
    await reducedPage.screenshot({
      path: "/tmp/barber-white-booking.png",
      fullPage: true,
    });
    await reducedContext.close();
    assert.deepEqual(errors, [], "No runtime errors");
    console.log(
      "PASS: cinematic intro, session, skip, reduced motion, focus isolation, white theme, routes, booking, admin, mobile, gallery and image fallback.",
    );
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
