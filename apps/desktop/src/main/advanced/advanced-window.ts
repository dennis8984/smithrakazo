import { BrowserWindow, dialog, session, shell } from "electron";
import type { AdvancedPath, SmithOrgConfig } from "./smith-org.js";
import { advancedDashboardUrl } from "./smith-org.js";

const PARTITION = "persist:smith-advanced";
/** Smith HQ hosts plus common OAuth IdPs used on smith.ph sign-in. */
const ALLOWED_HOSTS = new Set([
  "www.smith.ph",
  "smith.ph",
  "accounts.google.com",
  "appleid.apple.com",
  "login.microsoftonline.com",
  "github.com",
]);

let advancedWindow: BrowserWindow | null = null;

function isAllowedNavigation(url: string): boolean {
  try {
    const target = new URL(url);
    if (target.protocol !== "https:") return false;
    if (target.username || target.password) return false;
    return ALLOWED_HOSTS.has(target.hostname);
  } catch {
    return false;
  }
}

/** Open or focus the Advanced window on the org dashboard (or tools/skills). */
export function openAdvancedWindow(config: SmithOrgConfig, pathKind: AdvancedPath = "hq"): void {
  const url = advancedDashboardUrl(config, pathKind);
  if (!isAllowedNavigation(url)) {
    throw new Error("Advanced only opens the Smith dashboard.");
  }

  if (advancedWindow && !advancedWindow.isDestroyed()) {
    void advancedWindow.loadURL(url);
    if (advancedWindow.isMinimized()) advancedWindow.restore();
    advancedWindow.focus();
    return;
  }

  const win = new BrowserWindow({
    width: 1280,
    height: 860,
    minWidth: 720,
    minHeight: 480,
    title: "Smith Advanced",
    show: false,
    webPreferences: {
      partition: PARTITION,
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
      preload: "",
    },
  });
  advancedWindow = win;

  win.webContents.setWindowOpenHandler(({ url: target }) => {
    if (isAllowedNavigation(target)) {
      void win.loadURL(target);
    }
    return { action: "deny" };
  });

  win.webContents.on("will-navigate", (event, target) => {
    if (!isAllowedNavigation(target)) event.preventDefault();
  });

  win.once("ready-to-show", () => {
    if (!win.isDestroyed()) win.show();
  });
  win.webContents.on("did-fail-load", (_event, code, desc, failedUrl, isMainFrame) => {
    if (!isMainFrame || win.isDestroyed()) return;
    // Ignore aborted navigations (user clicked another Advanced path quickly).
    if (code === -3) return;
    void dialog.showMessageBox(win, {
      type: "error",
      message: "Smith Advanced failed to load",
      detail: `${desc} (${code})\n${failedUrl}`,
    });
  });
  win.on("closed", () => {
    if (advancedWindow === win) advancedWindow = null;
  });

  void win.loadURL(url).catch((error: unknown) => {
    const message = error instanceof Error ? error.message : String(error);
    void dialog.showMessageBox({
      type: "error",
      message: "Smith Advanced failed to open",
      detail: message,
    });
  });
}

export function closeAdvancedWindow(): void {
  if (advancedWindow && !advancedWindow.isDestroyed()) {
    advancedWindow.close();
  }
  advancedWindow = null;
}

/** Clears Advanced cookies when needed (tests / sign-out of Smith HQ). */
export async function clearAdvancedSession(): Promise<void> {
  const browser = session.fromPartition(PARTITION);
  await Promise.all([
    browser.clearStorageData(),
    browser.clearCache(),
    browser.clearAuthCache(),
    browser.clearCodeCaches({}),
  ]);
}
