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
