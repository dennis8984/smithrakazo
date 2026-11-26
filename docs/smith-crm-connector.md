# Register Smith CRM (Connectors)

Smith CRM is a remote MCP server on Contabo smith-api. Metering stays on smith.ph
(`checkActionGate` / Tool Hub). Other CRMs remain available via the normal catalog.

## Server

| Field | Value |
|-------|--------|
| Name | Smith CRM |
| Transport | Streamable HTTP / JSON-RPC POST |
| Endpoint | `https://api.openclaw.smith.ph/api/mcp/smith-crm` (or your Contabo API public URL + `/api/mcp/smith-crm`) |
| Auth | Bearer `SMITH_CRM_BRIDGE_TOKEN` |

Also accepts an org’s OpenClaw `gateway_token` for the same invoke path.

## Contabo env (smith-api)

```bash
SMITH_CRM_BRIDGE_TOKEN=<openssl rand -hex 32>
SMITH_RAKAZO_BRIDGE_ORG_ID=<organization uuid for the linked Smith org>
```

## In Smith.app / web

1. **Connect apps** → **+** → **MCP server**
2. Name: `Smith CRM`
3. Endpoint: the URL above
4. Auth: Bearer token = `SMITH_CRM_BRIDGE_TOKEN`
5. **Verify and add**, then **Use in this bot** as needed

## Tools (read-only v1)

- `search_contacts`
- `get_dashboard_summary`
- `search_deals`
- `search_tasks`
- `list_calendar_events`
- `search_tickets`

Gated tools return an error pointing at **Advanced → Tools/Skills** on smith.ph.

## smithrakazo runtime `.env` (optional mirror)

```bash
SMITH_CRM_BRIDGE_URL=https://api.openclaw.smith.ph/api/mcp/smith-crm
SMITH_CRM_BRIDGE_TOKEN=<same as Contabo>
SMITH_ORG_SLUG=hqo-495018
SMITH_DASHBOARD_ORIGIN=https://www.smith.ph
```
