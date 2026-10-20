const { chromium } = require("playwright-core");
const base = process.env.TEST_BASE_URL || "http://localhost:3000";
(async () => {
  const browser = await chromium.launch({
    executablePath: "/usr/bin/chromium",
    headless: true,
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
  });
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(base, { waitUntil: "networkidle" });
  await page.screenshot({ path: "/tmp/barber-desktop.png", fullPage: true });
  console.log("Home:", await page.title());
  console.log(
    "Photos:",
    await page
      .locator("img")
      .evaluateAll((imgs) =>
        imgs.map((i) => ({
          loaded: i.complete && i.naturalWidth > 0,
          src: i.src,
        })),
      ),
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
    const r = await page.goto(base + route);
    if (r.status() !== 200) throw Error(route + " " + r.status());
    console.log(route, r.status());
  }
  await page.goto(base + "/agendamento");
  await page
    .getByText("PRÉVIA INTERATIVA / SEM RESERVAS REAIS", { exact: true })
    .waitFor();
  await page.getByLabel("Data", { exact: true }).fill("2026-12-01");
  await page.getByLabel("Horário ilustrativo").selectOption("10:00");
  await page.getByRole("button", { name: "VISUALIZAR EXPERIÊNCIA" }).click();
  await page.getByText("Simulação concluída.", { exact: false }).waitFor();
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(base);
  await page.getByRole("button", { name: "Abrir menu" }).click();
  await page
    .locator("#mobile-menu")
    .getByRole("link", { name: "Serviços" })
    .click();
  await page.waitForURL("**/servicos");
  await page.goto(base);
  await page.screenshot({ path: "/tmp/barber-mobile.png", fullPage: true });
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > innerWidth,
  );
  if (overflow) throw Error("Mobile overflow");
  await page.goto(base + "/galeria");
  await page.getByRole("button", { name: "Cortes", exact: true }).click();
  if ((await page.locator(".gallery-grid button").count()) !== 1)
    throw Error("Filter failed");
  await page.locator(".gallery-grid button").click();
  await page.getByRole("dialog").waitFor();
  await page.keyboard.press("Escape");
  if (await page.getByRole("dialog").count())
    throw Error("Lightbox failed to close");
  const refusal = await page.request.post(base + "/api/booking", { data: {} });
  if (refusal.status() !== 403)
    throw Error("Preview must refuse real bookings");
  console.log("Browser checks passed. Runtime errors:", errors);
  if (errors.length) throw Error(errors.join("\n"));
  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
