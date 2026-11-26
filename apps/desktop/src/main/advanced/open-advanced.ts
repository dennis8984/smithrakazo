import { BrowserWindow, dialog, shell } from "electron";
import { openAdvancedWindow } from "./advanced-window.js";
import type { AdvancedPath } from "./smith-org.js";
import {
  advancedDashboardUrl,
  DEFAULT_SMITH_DASHBOARD_ORIGIN,
  normalizeOrgSlug,
  normalizeSmithOrigin,
  readSmithOrg,
  writeSmithOrg,
} from "./smith-org.js";

/** Contabo / HQO default used when Advanced is opened before smith-org.json exists. */
export const DEFAULT_SMITH_ORG_SLUG = "hqo-495018";

async function promptOrgSlug(): Promise<string | null> {
  const choice = await dialog.showMessageBox({
    type: "question",
    buttons: ["Open HQO", "Enter a different slug…", "Cancel"],
    defaultId: 0,
    cancelId: 2,
    message: "Open Smith Advanced",
    detail: `Connect to organization “${DEFAULT_SMITH_ORG_SLUG}” on smith.ph (Tool Hub / Skills Hub), or enter another org slug.`,
  });
  if (choice.response === 2) return null;
  if (choice.response === 0) return DEFAULT_SMITH_ORG_SLUG;

  const win = new BrowserWindow({
    width: 460,
    height: 220,
    title: "Smith Advanced",
    resizable: false,
    minimizable: false,
    maximizable: false,
    alwaysOnTop: true,
    show: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
    },
  });
  const html = `<!doctype html><html><body style="font:14px system-ui;padding:20px;margin:0;background:#111;color:#eee">
<label for="slug">Smith organization slug</label>
<input id="slug" style="display:block;width:100%;margin:8px 0 16px;padding:8px;box-sizing:border-box" value="${DEFAULT_SMITH_ORG_SLUG}" autofocus />
<div style="display:flex;gap:8px;justify-content:flex-end">
<button id="cancel">Cancel</button>
<button id="save">Save</button>
</div>
<script>
  const slug = document.getElementById("slug");
  const finish = (value) => {
    document.title = "smith-org:" + encodeURIComponent(value == null ? "" : String(value));
  };
  document.getElementById("save").onclick = () => finish(slug.value);
  document.getElementById("cancel").onclick = () => finish(null);
  slug.onkeydown = (e) => { if (e.key === "Enter") finish(slug.value); };
</script>
</body></html>`;
  try {
    await win.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(html)}`);
    win.focus();
    const value = await new Promise<string | null>((resolve) => {
      const onTitle = () => {
        const title = win.getTitle();
        if (!title.startsWith("smith-org:")) return;
        win.removeListener("page-title-updated", onTitle);
        const raw = decodeURIComponent(title.slice("smith-org:".length));
        resolve(raw === "" ? null : raw);
      };
      win.on("page-title-updated", onTitle);
      win.on("closed", () => resolve(null));
    });
    return value;
  } finally {
    if (!win.isDestroyed()) win.close();
  }
}

/** Menu / IPC entry: ensure org config, then open Advanced. */
export async function openAdvancedFromMenu(
  userDataDir: string,
  pathKind: AdvancedPath = "hq",
): Promise<void> {
  try {
    let config = await readSmithOrg(userDataDir);
    if (!config) {
      const entered = await promptOrgSlug();
      const slug = normalizeOrgSlug(entered);
      if (!slug) {
        await dialog.showMessageBox({
          type: "warning",
          message: "Enter a valid Smith organization slug (for example hqo-495018).",
        });
        return;
      }
      const origin =
        normalizeSmithOrigin(process.env.SMITH_DASHBOARD_ORIGIN) ?? DEFAULT_SMITH_DASHBOARD_ORIGIN;
      config = { origin, orgSlug: slug };
      await writeSmithOrg(userDataDir, config);
    }
    try {
      openAdvancedWindow(config, pathKind);
    } catch (windowError) {
      // Fall back to the system browser so Tool Hub / Skills Hub still open.
      const url = advancedDashboardUrl(config, pathKind);
      await shell.openExternal(url);
      const detail = windowError instanceof Error ? windowError.message : String(windowError);
      await dialog.showMessageBox({
        type: "warning",
        message: "Opened Smith Advanced in your browser",
        detail: `The in-app Advanced window failed (${detail}). Signed-in smith.ph session in the browser applies.`,
      });
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    await dialog.showMessageBox({
      type: "error",
      message: "Could not open Smith Advanced",
      detail: message,
    });
  }
}
