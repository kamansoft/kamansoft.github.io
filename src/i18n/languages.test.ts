import { describe, expect, test } from "bun:test";
import { detectLanguage, resolveLoader } from "./languages";

describe("language detection", () => {
  test("Latin American Spanish browser loads Spanish", () => expect(detectLanguage(["es-CO", "en"])).toBe("es"));
  test("unsupported browser language falls back to English", () => expect(detectLanguage(["fr-FR", "de"])).toBe("en"));
  test("saved choice beats browser language", () => expect(detectLanguage(["es-MX"], "en")).toBe("en"));
});

test("missing translation falls back to the English file", () => {
  const reg = { "../data/en/hero.json": "en-hero", "../data/es/team.json": "es-team" };
  expect(resolveLoader(reg, "hero", "es")).toBe("en-hero");
  expect(resolveLoader(reg, "team", "es")).toBe("es-team");
});
