# Smith brand (fork overlay)

This `smith/main` line displays the product as **Smith**.

## What changed

- User-facing copy: `Rakazo` → `Smith` (UI, i18n `msgstr`/`msgid` brand phrases, desktop `productName`, PWA name, auth `appName` / passkey `rpName`).
- Desktop protocol scheme label uses `smith` (appId remains `dev.rakazo.desktop` for update continuity until a signed Smith desktop build ships).

## What did **not** change (on purpose)

- npm scopes `@rakazo/*`
- Env vars `RAKAZO_*`
- Upstream URLs `rakazo.com`, `ghcr.io/elie222/rakazo`, `elie222/rakazo`
- Bundle / icon asset filenames such as `Rakazo.icon`
- Reserved ids like `rakazo-shared`

Keeping those stable makes upstream merges and published-image pulls workable.

## Runtime note

Published GHCR images still ship upstream assets until you rebuild. For the local Compose stack, display strings were also patched live in the `web` / `api` / `worker` containers (lost on image recreate). Re-apply after `install-images.sh` / recreate, or build images from this branch.

## Desktop app name

`apps/desktop/package.json` → `productName: "Smith"`. Rebuild the Electron app from this checkout to get a **Smith.app**; the App Store / rakazo.com download remains branded Rakazo until you ship a fork build.

## Tool Hub / Skills / Advanced

- **Connectors** — Smith Tool Hub items (CRM, SmithSend, …) as MCP/OpenAPI integrations; other apps remain client-chosen.
- **Skills** — Smith Skills Hub packs install into Rakazo Skills; metering stays on smith.ph.
- **Advanced** — dedicated Electron window to `SMITH_DASHBOARD_ORIGIN/dashboard/SMITH_ORG_SLUG` (default `https://www.smith.ph/dashboard/{slug}`). Not an iframe (smith.ph `frame-ancestors 'none'`). Config: runtime `SMITH_*` env + desktop `smith-org.json`.

See `docs/smith-hub.md` and Smith.ai `specs/smithrakazo.md`.
