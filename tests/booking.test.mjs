import { test } from "node:test";
import assert from "node:assert/strict";
import { bookingSchema } from "../lib/validation.ts";
const valid = {
  service: "corte",
  professional: "d031cc52-b741-4e93-8501-53ca614d8a52",
  date: "2026-12-01",
  slot: "2026-12-01T14:00:00-03:00",
  name: "Cliente Teste",
  email: "cliente@example.com",
  phone: "11999999999",
  website: "",
};
test("aceita dados de reserva válidos", () =>
  assert.equal(bookingSchema.safeParse(valid).success, true));
test("rejeita telefone, email e profissional inválidos", () => {
  for (const field of ["phone", "email", "professional"])
    assert.equal(
      bookingSchema.safeParse({ ...valid, [field]: "invalido" }).success,
      false,
    );
});
test("rejeita preenchimento do campo antispam", () =>
  assert.equal(
    bookingSchema.safeParse({ ...valid, website: "spam" }).success,
    false,
  ));
test("rejeita nome vazio e data inválida", () => {
  assert.equal(bookingSchema.safeParse({ ...valid, name: " " }).success, false);
  assert.equal(
    bookingSchema.safeParse({ ...valid, date: "ontem" }).success,
    false,
  );
});
