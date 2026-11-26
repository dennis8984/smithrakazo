import { describe, expect, it } from "vitest";
import {
  advancedDashboardUrl,
  DEFAULT_SMITH_DASHBOARD_ORIGIN,
  normalizeOrgSlug,
  normalizeSmithOrigin,
  parseAdvancedPath,
  parseSmithOrg,
} from "./smith-org.js";

describe("smith-org", () => {
  it("accepts the production dashboard origin", () => {
    expect(normalizeSmithOrigin("https://www.smith.ph")).toBe("https://www.smith.ph");
    expect(normalizeSmithOrigin("https://smith.ph/dashboard/x")).toBe("https://smith.ph");
    expect(normalizeSmithOrigin(undefined)).toBe(DEFAULT_SMITH_DASHBOARD_ORIGIN);
  });

  it("rejects cleartext and foreign hosts", () => {
    expect(normalizeSmithOrigin("http://www.smith.ph")).toBeNull();
    expect(normalizeSmithOrigin("https://evil.example")).toBeNull();
    expect(normalizeSmithOrigin("https://user:pass@www.smith.ph")).toBeNull();
  });

  it("normalizes org slugs", () => {
    expect(normalizeOrgSlug("HQO-495018")).toBe("hqo-495018");
    expect(normalizeOrgSlug("bad slug")).toBeNull();
    expect(normalizeOrgSlug("")).toBeNull();
  });

  it("builds Advanced paths", () => {
    const config = { origin: "https://www.smith.ph", orgSlug: "hqo-495018" };
    expect(advancedDashboardUrl(config)).toBe("https://www.smith.ph/dashboard/hqo-495018");
    expect(advancedDashboardUrl(config, "tools")).toBe(
      "https://www.smith.ph/dashboard/hqo-495018/tools",
    );
    expect(advancedDashboardUrl(config, "skills")).toBe(
      "https://www.smith.ph/dashboard/hqo-495018/skills",
    );
  });

  it("parses stored JSON", () => {
    expect(
      parseSmithOrg(JSON.stringify({ origin: "https://www.smith.ph", orgSlug: "hqo-495018" })),
    ).toEqual({ origin: "https://www.smith.ph", orgSlug: "hqo-495018" });
    expect(parseSmithOrg("{")).toBeNull();
  });

  it("parses Advanced path args", () => {
    expect(parseAdvancedPath("tools")).toBe("tools");
    expect(parseAdvancedPath("nope")).toBe("hq");
  });
});
