# Pipeline Optimizer

Chief analyzes your pipeline health daily -- flagging stale deals, suggesting stage changes, and generating revenue forecasts that keep your sales team focused on the highest-impact opportunities.

## Quick Reference

| Capability | Description |
|---|---|
| Daily Pipeline Analysis | Automated daily review of all active deals, identifying risks and opportunities |
| Stale Deal Detection | Flag deals that exceed expected stage duration with recommended next actions |
| Stage Change Suggestions | AI-driven recommendations to advance or regress deals based on activity patterns |
| Revenue Forecasting | Probability-weighted pipeline projections by stage, time period, and deal segment |
| Pipeline Health Scoring | Aggregate health metrics covering velocity, conversion rates, and bottleneck detection |
| Trend Reporting | Period-over-period comparison reports showing pipeline trajectory and performance shifts |

## How It Works

The Pipeline Optimizer runs a comprehensive analysis of your deal pipeline on a daily cron schedule. Chief pulls the full pipeline summary -- total deals by stage, weighted revenue, average time-in-stage -- and cross-references it against historical performance benchmarks. Deals that have exceeded their expected stage duration are flagged as stale, and Chief generates specific recommendations for each: re-engage the contact, schedule a discovery call, request executive sponsorship, or mark as lost if signals indicate the opportunity has gone cold.

Atlas handles the data-intensive analysis work. Atlas queries deal records, calculates velocity metrics (average days per stage, stage-to-stage conversion rates), and identifies statistical outliers -- deals moving unusually fast or slow compared to their cohort. Atlas also produces the revenue forecast by applying probability weights to each stage (leads at 10%, qualified at 25%, proposal at 50%, negotiation at 75%) and adjusting for deal-specific factors like engagement recency, deal size relative to average, and contact responsiveness.

Hunter translates analysis into action. When the pipeline review surfaces opportunities -- a cluster of deals ready for proposal, a segment with declining velocity, a high-value deal approaching its expected close date without recent activity -- Hunter generates prioritized recommendations. These range from simple nudges ("Deal X has been in negotiation for 18 days, 3x your average -- schedule a decision-maker call") to strategic shifts ("Enterprise segment velocity dropped 40% this month -- consider revising the qualification criteria"). Chief reviews Hunter's recommendations, approves the highest-impact actions, and delegates execution to the appropriate agents.

## CRM Integration

> **Note:** `run_pipeline_analysis` and `generate_pipeline_report` are available to all orgs — no subscription required. The Pipeline Optimizer skill adds autonomous daily cron analysis, multi-agent delegation, and proactive recommendations.

Run a full pipeline analysis (typically triggered by daily cron):
```
smith-action:run_pipeline_analysis
{}
/smith-action
```

Generate a pipeline report for a specific period:
```
smith-action:generate_pipeline_report
{"period": "weekly"}
/smith-action
```

Generate a default report (current pipeline snapshot):
```
smith-action:generate_pipeline_report
{}
/smith-action
```

Pull the current pipeline summary for context:
```
smith-action:get_pipeline_summary
{}
/smith-action
```

Identify stale deals that need attention:
```
smith-action:get_stale_deals
{}
/smith-action
```

Search for specific deals in the pipeline:
```
smith-action:search_deals
{"query": "enterprise", "stage": "negotiation", "limit": 10}
/smith-action
```

## Agent Routing

**Primary agents:**

- **chief** (Executive) -- Owns pipeline strategy and the daily review cadence. Chief interprets analysis results, approves recommendations, decides which actions to prioritize, and communicates pipeline health to stakeholders. Chief is the final authority on strategic pipeline decisions like adjusting stage criteria or reallocating team focus.
- **atlas** (Research) -- Executes data analysis. Atlas queries the pipeline, calculates velocity and conversion metrics, runs forecast models, and produces the raw analytical output that Chief and Hunter use for decision-making. Atlas handles the statistical work -- outlier detection, trend analysis, cohort comparison.
- **hunter** (Growth) -- Generates actionable recommendations. Hunter reviews the analytical output from Atlas, maps findings to specific deals, and proposes concrete next steps. Hunter focuses on revenue impact -- which actions will move the most pipeline value forward with the least effort.

**Delegation patterns:**

- chief triggers the daily analysis cycle and delegates data gathering to atlas, receiving structured metrics in return.
- atlas delivers analysis to chief, who then delegates recommendation generation to hunter.
- hunter proposes actions back to chief, who approves, modifies, or rejects each recommendation before delegating execution.
- For approved actions, chief delegates deal updates to jarvis, outreach drafting to scribe, and meeting scheduling to dispatch.
- Stale deal follow-ups may be delegated to postmaster for automated email nudges if the contact has been unresponsive.

## Triggers

| Trigger | Behavior |
|---|---|
| `cron_daily` | Runs a full pipeline analysis and generates recommendations every morning |
| `manual` | User or agent explicitly requests analysis via `run_pipeline_analysis` or a report via `generate_pipeline_report` |

## Best Practices

- Let the daily cron run consistently before adjusting thresholds. The optimizer needs at least two weeks of data to establish meaningful velocity benchmarks and identify true outliers versus normal variation.
- Review the daily analysis output in the activity feed rather than waiting for stale deal alerts. Proactive pipeline hygiene -- updating descriptions, adjusting close dates, logging recent interactions -- improves forecast accuracy significantly.
- Use the `period` parameter in report generation to match your review cadence. Weekly reports work well for active sales teams; monthly reports suit longer sales cycles or strategic planning sessions.
- Act on stale deal recommendations promptly. Deals flagged as stale for more than 7 consecutive days without action should be seriously evaluated for pipeline removal -- bloated pipelines produce misleading forecasts.
- Combine Pipeline Optimizer with Lead Researcher for maximum intelligence. Enriched contact data improves the quality of recommendations -- Hunter can reference company events and buying signals when suggesting next actions.
- Keep deal values and expected close dates current. The forecasting model weights these fields heavily -- stale values cascade into inaccurate projections across the entire pipeline.
