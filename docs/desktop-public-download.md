# Public Mac + Windows downloads

Public installs ship from **GitHub Releases** on this repo:

- Latest: https://github.com/dennis8984/smithrakazo/releases/latest
- Typical assets after `release-desktop` succeeds:
  - `Smith-x.y.z-universal.dmg` / `.zip` (macOS, signed + notarized)
  - `Smith-Setup-x.y.z.exe` (Windows NSIS, Azure Trusted Signing)

Link those URLs from smith.ph (“Download for Mac / Windows”).

## One-time signing setup (required)

Without these, CI cannot publish Gatekeeper/SmartScreen-safe builds.

### Blockers (as of 2026-11-26)

- **Apple Developer Program membership expired** for team **BORA GLOBAL LIMITED** (`NSLK3RH46C`). Banner: Account Holder **Kendany Go** must renew (US$99; last renewal date shown Apr 21, 2024). Until renewed: no new Developer ID certs, no notarization, Certificates UI empty.
- Signed-in Admin (`dennisf@tuta.io` / solomon njilu) **cannot** request App Store Connect API access — only the Account Holder can (needed for `APPLE_API_*` notarization secrets).
- **Azure** Trusted Signing still needs a portal login in Cursor browser (Windows path).

### macOS (Apple Developer)

Repo secrets (Actions → Secrets):

| Secret | Value |
|--------|--------|
| `DESKTOP_MAC_CSC_LINK` | Base64 of Developer ID Application `.p12` |
| `DESKTOP_MAC_CSC_KEY_PASSWORD` | Password for that `.p12` |
| `APPLE_API_KEY_ID` | App Store Connect API key id |
| `APPLE_API_ISSUER` | Issuer UUID |
| `APPLE_API_KEY_P8` | Full `.p8` private key PEM text |
| `DESKTOP_MAC_PROVISIONING_PROFILE` | Optional base64 provisioning profile (passkeys) |

Create a **Developer ID Application** cert in Apple Developer → Certificates, export `.p12`, then:

```bash
base64 -i DeveloperID.p12 | pbcopy   # → DESKTOP_MAC_CSC_LINK
```

App Store Connect → Users and Access → Integrations → Team Keys → create key with **Developer** access; download `.p8` once.

### Windows (Azure Trusted Signing)

GitHub environment: `desktop-release` (OIDC; no long-lived Azure password).

Secrets:

| Secret | Value |
|--------|--------|
| `DESKTOP_WIN_AZURE_CLIENT_ID` | App registration client id |
| `DESKTOP_WIN_AZURE_TENANT_ID` | Azure AD tenant id |

Repo variables:

| Variable | Value |
|----------|--------|
| `DESKTOP_WIN_SIGNING_ENDPOINT` | Trusted Signing endpoint URI |
| `DESKTOP_WIN_SIGNING_ACCOUNT` | Account name |
| `DESKTOP_WIN_SIGNING_PROFILE` | Profile name |
| `DESKTOP_WIN_PUBLISHER` | Exact publisher string on the cert |

Federate the app registration to GitHub OIDC for `repo:dennis8984/smithrakazo:environment:desktop-release`.

## Ship a version

1. Land desktop fixes on `main` (or merge `smith/main`).
2. Follow `.agents/skills/release/SKILL.md` (CHANGELOG + bump `apps/desktop` version).
3. Tag `vX.Y.Z` on `main` and push the tag → `release-desktop` workflow.
4. Confirm assets on the Release page; smoke-install DMG + EXE.
5. Point smith.ph download buttons at `/releases/latest` (or per-asset deep links).

## Auto-update

`electron-builder` `publish` is set to `dennis8984/smithrakazo`. Installed apps pull updates from that repo’s releases once a signed build has shipped.
