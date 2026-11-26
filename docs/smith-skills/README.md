# Smith Skills pack (for Rakazo Skills)

These `SKILL.md` files are the Smith Skills Hub playbooks, published for install into
Rakazo’s Skills library. **Activation and metering stay on smith.ph** (Advanced → Skills).
Rakazo only stores the know-how; gated CRM/tool actions still hit Smith via the
[Smith CRM connector](../smith-crm-connector.md).

## Install in Smith.app

1. Open **Skills** (account menu).
2. Prefer **From GitHub** pointing at this folder in the `dennis8984/smithrakazo` fork
   (`docs/smith-skills/<slug>`), or paste a single skill folder URL.
3. Ensure **Smith CRM** (and any skill-required tools) are connected under **Connect apps**.
4. If a bot hits a gated action, open **Advanced** → Skills/Tools and activate the subscription.

## Packs

| Slug | Folder |
|------|--------|
| campaign-writer | `campaign-writer/` |
| company-forge-skill | `company-forge-skill/` |
| design-studio | `design-studio/` |
| google-ads-flywheel | `google-ads-flywheel/` |
| lead-researcher | `lead-researcher/` |
| meta-ads-flywheel | `meta-ads-flywheel/` |
| onboarding-playbook | `onboarding-playbook/` |
| pipeline-optimizer | `pipeline-optimizer/` |
| review-requester | `review-requester/` |
| tiktok-marketing | `tiktok-marketing/` |

## Required connector

Most packs expect **Smith CRM** MCP tools (`search_contacts`, deals, tasks, …).
Ads / studio skills may require additional Tool Hub activations on smith.ph.
