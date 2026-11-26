# Lead Researcher

Chief autonomously researches new leads -- enriching contacts with company data, social profiles, and buying signals using web search and scraping tools.

## Quick Reference

| Capability | Description |
|---|---|
| Company Enrichment | Scrape company websites and directories for firmographic data (size, industry, funding) |
| Social Profile Discovery | Locate LinkedIn, Twitter, and other professional profiles for lead contacts |
| Buying Signal Detection | Identify hiring patterns, tech stack changes, and funding events that indicate purchase intent |
| Contact Data Enrichment | Fill in missing fields like job title, phone, company, and location from public sources |
| Competitive Intelligence | Surface competitor mentions and technology usage to inform outreach strategy |
| Research Summaries | Generate concise research briefs attached as activity notes to the contact record |

## How It Works

When a new lead enters the system -- whether from a form submission, chat widget capture, or manual creation -- the Lead Researcher skill triggers automatically. Chief evaluates the contact record, identifies missing data fields, and delegates research tasks to Atlas. Atlas uses FireCrawl to scrape the lead's company website, extracting firmographic data such as employee count, industry vertical, tech stack, and recent press releases. Tavily search supplements this with broader web intelligence including funding rounds, executive changes, and hiring trends that signal buying intent.

Scout monitors ongoing signals for researched leads. When a previously researched company appears in relevant news -- a new funding round, a leadership change, or a technology migration -- Scout flags the event and Chief decides whether to update the contact record or create a follow-up task. This keeps lead data fresh without requiring manual re-research.

The research output is structured and written back to the CRM. Contact fields (company, title, location) are updated directly. Richer findings -- competitive landscape, tech stack details, buying signals -- are logged as activity notes with a "research" type so sales agents can review the full brief. If the research reveals high-intent signals, Chief may escalate the lead's temperature or recommend immediate outreach.

## CRM Integration

Run a full research cycle on a newly created lead:
```
smith-action:run_lead_research
{"contactId": "contact_abc123"}
/smith-action
```

Search for contacts that need enrichment:
```
smith-action:search_contacts
{"query": "", "limit": 20}
/smith-action
```

Update a contact with enriched data after research:
```
smith-action:update_contact
{"contactId": "contact_abc123", "company": "Acme Corp", "title": "VP of Engineering", "temperature": "hot", "customFields": {"techStack": "React, AWS, Kubernetes", "fundingStage": "Series B", "employeeCount": "150-200"}}
/smith-action
```

Log research findings as an activity note:
```
smith-action:create_activity
{"contactId": "contact_abc123", "type": "research", "description": "Company Enrichment: Acme Corp raised $25M Series B (Jan 2026). Migrating from legacy CRM to modern stack. Key decision-maker confirmed as VP Engineering. High buying intent signals detected."}
/smith-action
```

## Agent Routing

**Primary agents:**

- **chief** (Executive) -- Owns the research strategy. Chief decides which leads warrant deep research, prioritizes the research queue based on deal potential, and synthesizes findings into actionable recommendations.
- **atlas** (Research) -- Executes the core research workflow. Atlas performs web searches, scrapes company pages, cross-references data sources, and compiles structured research briefs. Handles both initial enrichment and periodic refresh cycles.
- **scout** (Monitoring) -- Monitors ongoing signals for previously researched leads. Scout watches for news events, funding announcements, and hiring patterns that indicate changes in buying intent, and alerts Chief when action is needed.

**Delegation patterns:**

- chief delegates initial research execution to atlas when a new lead is created or when a manual research request is triggered.
- atlas delegates signal monitoring setup to scout after completing the initial research pass.
- scout escalates high-priority signals back to chief for strategic decisions (temperature changes, outreach triggers).
- When research reveals a strong opportunity, chief may delegate deal creation to jarvis or outreach drafting to scribe.

## Triggers

| Trigger | Behavior |
|---|---|
| `lead_created` | Automatically runs research on any newly created lead contact |
| `manual` | User or agent explicitly requests research via the `run_lead_research` action |

## Best Practices

- Ensure FireCrawl and Tavily API keys are configured in the proxy settings before activating this skill. Without search and scraping access, research results will be limited to data already in the CRM.
- Set a reasonable research cadence -- running full enrichment on every contact update creates noise. The skill is designed to trigger on new lead creation and manual requests, not on every field change.
- Review research summaries in the activity feed before acting on them. AI-gathered data should be treated as directional, not authoritative -- verify critical details like funding amounts or executive titles before using them in outreach.
- Use the temperature field to reflect research outcomes. If buying signals are strong, update the lead to "hot" so pipeline prioritization reflects the enrichment data.
- Combine Lead Researcher with Pipeline Pro for maximum impact. Enriched contacts flow into scored deals, and research summaries inform the next-best-action recommendations.
- Keep custom field names consistent across contacts. Use standardized keys like `techStack`, `fundingStage`, and `employeeCount` so reporting and filtering work reliably.
