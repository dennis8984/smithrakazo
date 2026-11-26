import type { SmithAdvancedPath } from "@rakazo/contracts";
import { desktopBridge } from "./desktop";

/** True when this build can open the Smith.org Advanced window. */
export function canOpenAdvanced(): boolean {
  return typeof desktopBridge()?.advanced?.open === "function";
}

/**
 * Open Advanced (HQ / tools / skills).
 * Org slug prompting happens in the desktop main process — Electron disables
 * `window.prompt` in the renderer, so we must not prompt here.
 */
export async function openAdvanced(path: SmithAdvancedPath = "hq"): Promise<void> {
  const advanced = desktopBridge()?.advanced;
  if (!advanced) return;
  await advanced.open(path);
}
