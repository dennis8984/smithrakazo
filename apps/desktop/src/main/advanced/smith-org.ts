import path from "node:path";
import { readPrivateFile, writePrivateFile } from "../setup/setup-store.js";
import { mkdir } from "node:fs/promises";

export const SMITH_ORG_FILE = "smith-org.json";
export const DEFAULT_SMITH_DASHBOARD_ORIGIN = "https://www.smith.ph";

const MAX_BYTES = 8 * 1024;
const SLUG = /^[a-z0-9][a-z0-9-]{0,63}$/i;
const ALLOWED_HOSTS = new Set(["www.smith.ph", "smith.ph"]);

export type SmithOrgConfig = {
  origin: string;
  orgSlug: string;
};

export type AdvancedPath = "hq" | "tools" | "skills";

export function smithOrgFilePath(userDataDir: string): string {
  return path.join(userDataDir, SMITH_ORG_FILE);
}

/** Normalize and validate an Advanced dashboard origin (HTTPS only). */
export function normalizeSmithOrigin(input: string | undefined | null): string | null {
  const raw = (input ?? DEFAULT_SMITH_DASHBOARD_ORIGIN).trim();
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    return null;
  }
  if (url.protocol !== "https:") return null;
  if (url.username || url.password) return null;
  if (!ALLOWED_HOSTS.has(url.hostname)) return null;
  return url.origin;
}

export function normalizeOrgSlug(input: string | undefined | null): string | null {
  const slug = (input ?? "").trim();
  if (!SLUG.test(slug)) return null;
  return slug.toLowerCase();
}

export function parseSmithOrg(raw: string): SmithOrgConfig | null {
  try {
    const value = JSON.parse(raw) as Record<string, unknown>;
    const origin = normalizeSmithOrigin(
      typeof value.origin === "string" ? value.origin : DEFAULT_SMITH_DASHBOARD_ORIGIN,
    );
    const orgSlug = normalizeOrgSlug(typeof value.orgSlug === "string" ? value.orgSlug : null);
    if (!origin || !orgSlug) return null;
    return { origin, orgSlug };
  } catch {
    return null;
  }
}

export async function readSmithOrg(userDataDir: string): Promise<SmithOrgConfig | null> {
  const fromEnv = configFromEnv();
  if (fromEnv) return fromEnv;
  const raw = await readPrivateFile(smithOrgFilePath(userDataDir), MAX_BYTES);
  if (raw === null) return null;
  return parseSmithOrg(raw);
}

export async function writeSmithOrg(userDataDir: string, config: SmithOrgConfig): Promise<void> {
  const origin = normalizeSmithOrigin(config.origin);
  const orgSlug = normalizeOrgSlug(config.orgSlug);
  if (!origin || !orgSlug) throw new Error("Invalid Smith org configuration.");
  await mkdir(userDataDir, { recursive: true });
  await writePrivateFile(
    smithOrgFilePath(userDataDir),
    `${JSON.stringify({ origin, orgSlug }, null, 2)}\n`,
  );
}

function configFromEnv(): SmithOrgConfig | null {
  const origin = normalizeSmithOrigin(process.env.SMITH_DASHBOARD_ORIGIN);
  const orgSlug = normalizeOrgSlug(process.env.SMITH_ORG_SLUG);
  if (!origin || !orgSlug) return null;
  return { origin, orgSlug };
}

/** Build the dashboard URL for an Advanced path. */
export function advancedDashboardUrl(config: SmithOrgConfig, pathKind: AdvancedPath = "hq"): string {
  const base = `${config.origin}/dashboard/${config.orgSlug}`;
  if (pathKind === "tools") return `${base}/tools`;
  if (pathKind === "skills") return `${base}/skills`;
  return base;
}

export function parseAdvancedPath(value: unknown): AdvancedPath {
  if (value === "tools" || value === "skills" || value === "hq") return value;
  return "hq";
}
