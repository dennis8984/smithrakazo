# Smith Hub (fork)

Maps Smith Tool Hub and Skills onto Rakazo Connectors and Skills, with org HQ in **Advanced**.

## Config

| Source | Keys |
|--------|------|
| Compose `.env` | `SMITH_DASHBOARD_ORIGIN`, `SMITH_ORG_SLUG`, `SMITH_CRM_BRIDGE_URL`, `SMITH_CRM_BRIDGE_TOKEN` |
| Desktop userData | `smith-org.json` → `{ "origin", "orgSlug" }` |

Defaults: origin `https://www.smith.ph`. Org slug is required for Advanced.

## Advanced

Desktop-only account menu **Advanced** (plus **Tool Hub** / **Skills Hub**) opens an Electron
window (session partition `smith-advanced`) at:

| Menu | URL |
|------|-----|
| Advanced | `{origin}/dashboard/{orgSlug}` |
| Tool Hub | `{origin}/dashboard/{orgSlug}/tools` |
| Skills Hub | `{origin}/dashboard/{orgSlug}/skills` |

If slug is missing, the UI prompts once and writes `smith-org.json`.

Deep links: `?advanced=1`, `?advanced=tools`, `?advanced=skills`.

## Connectors (Smith CRM)

Register **Smith CRM** as a remote MCP server pointing at the Smith MCP facade
(`…/api/mcp/smith-crm`) with Bearer `SMITH_CRM_BRIDGE_TOKEN`. Tools call
`POST /api/openclaw/crm-bridge/invoke` with `agentId: rakazo`. Gated actions return
403 `requiredSkill` — open Advanced → Tools/Skills to subscribe.

## Skills

Install packs from `docs/smith-skills/` (or the published Git tree of the same folder)
via Skills → From GitHub / folder import. Required connectors are noted in each SKILL.md.
