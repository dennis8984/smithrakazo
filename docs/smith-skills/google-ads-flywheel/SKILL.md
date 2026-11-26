---
name: google-ads-flywheel
description: Paid-ads operator - researches competitor ads, builds offers, runs 5-day ROAS test cycles, pauses losers and compounds spend into winners.
user-invocable: true
---

# Marketing Flywheel

A paid-advertising operating system for Google Ads. Research what already works, build the
offer properly, test cheap, cut on evidence, compound budget into proven winners.

Direct-response practice in the tradition of Alex Hormozi (offer construction, value equation,
unit economics) and Russell Brunson (funnels, hook/story/offer, value ladders). Apply the
methods; do not write in their names or attribute quotes to them.

## Reference files - load these, don't improvise

| File | Load when |
|------|-----------|
| `{baseDir}/references/offer-frameworks.md` | Building or auditing any offer, writing any ad, any pricing or LTV/CAC question |
| `/home/node/.openclaw/workspace/BANNER-CREATIVE-SYSTEM.md` | Any static banner or Performance Max still. Five angles, ratios, and overlay copy |
| `{baseDir}/references/funnel-frameworks.md` | Mapping the funnel, choosing traffic temperature, structuring hook/story/offer |
| `{baseDir}/references/research-playbook.md` | Step 1 competitive research |
| `{baseDir}/references/ads-operations.md` | Any read from or write to the Google Ads account |
| `{baseDir}/references/swipe-file.md` | Template - competitor ad log |
| `{baseDir}/references/testing-log.md` | Template - cycle results and mutation log |

## Smith creative tools (use these, do not invent assets)

When this skill is installed on Smith, build copy and creatives through the org's existing dashboards and CRM actions:

- **Content Studio** (`/content-studio`) — headlines, RSA copy, landing copy via composer/scribe, `search_knowledge_base`, `create_task`
- **Ad Creator** (`/ad-creator`) — TopView UGC/video: `submit_topview_task`, `list_video_assets`
- **UGC Seedance** (`/ugc-seedance`) — `create_ugc_seedance_video`, `list_ugc_seedance_videos`
- **Studio** (`/studio`) — stills and brand kit: `studio_generate`, `studio_list_assets`, `studio_get_brand_kit`
- **Ads Manager** (`/ads-manager`) — `flywheel_list_accounts`, `flywheel_run_cycle`, `flywheel_list_queue`. Mutations stay in the human approval queue.

Call `flywheel_creative_brief` if you need the live action map.

## Tool check (do this first, once)

State plainly what is available, because it changes what this skill can promise:

- **Google Ads API/MCP present?** -> can read live metrics and pause/adjust ads, under the
  guardrails in `ads-operations.md`
- **Browser/scraping tool present?** -> can pull competitor ads directly
- **Neither?** -> the skill produces copy, decision tables and exact steps; the user executes
  them in the Google Ads UI. Say so rather than implying automation

## Activation

On **FLYWHEEL** or explicit invocation, ask and wait:

1. Product/service, and the geo it sells in?
2. Sector/niche, and the 3 closest competitors?
3. Current monthly ad spend, and the daily ceiling you don't want crossed?
4. Target ROAS - and your gross margin, so break-even can be computed?
5. Monthly revenue goal?
6. Average order value and how often a customer repeats?

Questions 4 and 6 are not optional. Without margin and repeat rate there is no LTV, no
break-even ROAS, and no honest basis for scaling. If the user doesn't know, help them
estimate before spending.

## Step 0 - Offer and funnel audit

Before any ad exists:

- Run the offer through the **Value Equation** and score all four terms
  (`offer-frameworks.md` §1). Fix the weakest before writing copy
- Build the **offer stack**, pick a **guarantee**, identify **real** scarcity (§2-4)
- Map the **value ladder** and choose which rung the ads point at - bait or frontend, almost
  never backend (`funnel-frameworks.md` §1)
- Confirm **follow-up exists** (§6). If nothing catches non-converters, say that scaling will
  multiply the leak, and fix it first
- Run the **economics gate** (§6 of offer-frameworks): LTV:CAC below 3:1 means don't scale yet
- Verify **conversion tracking** is live and has value data (`ads-operations.md`)

Report Step 0 findings before proceeding. A weak offer is worth more attention than any test
cycle - creative testing optimizes distribution, it does not fix a thing nobody wants.

## Step 1 - Competitive intelligence

Follow `research-playbook.md`. Google Ads Transparency Center for actual Google ads, live SERP
reads for search competitors, Facebook Ad Library for offer and hook intelligence.

Neither library reports spend or ROAS. Rank on **longevity** and **repetition** and say so -
never present an inference as a measurement.

Deliver: filled swipe file, 3 patterns to adapt, 1 unclaimed gap.

## Step 2 - Launch: 5 ads, $5/day, 5 days

Five angles, each stating its traffic temperature and which of hook/story/offer it leads on:

| # | Angle | Shape |
|---|-------|-------|
| 1 | Direct response | Strong headline, clear offer, urgent CTA |
| 2 | Story | Wall -> epiphany -> result -> CTA |
| 3 | Social proof | Specific numbers, testimonials, results |
| 4 | Value-first | Bait offer, no-commitment entry |
| 5 | Pattern interrupt | Bold specific claim, contrarian angle |

Naming convention: `FLYWHEEL | C1 | A3-social-proof` so GAQL filters and the log line up.

Track CTR, CPC, conversion rate, CPA, ROAS. Log to `testing-log.md`.

## Step 3-5 - The cycle

Every 5 days:

1. Pull performance (`ads-operations.md` GAQL)
2. **Check the data floor first** - >= 1,000 impressions and >= 30 clicks per ad, or 3-5
   conversions across the set. Under the floor, extend or raise budget; **do not cut on
   noise.** At $5/day this floor will often not be met in 5 days, and forcing a decision
   anyway is how winners get killed at random
3. Discount the final 3 days for conversion lag before ranking
4. Rank by ROAS. Cut the bottom 60-70%, keep the top performers
5. Spawn 5 variations per survivor - one each changing **headline**, **visual hook**, **CTA**,
   **offer framing**, **audience angle**. One variable per variation, always
6. Relaunch at $5/day for 5 days

Round 1: 5 ads -> keep 2 -> 10 new. Round 2: 10 -> keep 3 -> 15 new. Then repeat indefinitely.

No ad survives past 5 days without data justifying it. No ad dies without data either.

## Step 6 - Scale winners

Once an ad clears target ROAS and the data floor:

1. +50% budget, one step only
2. Hold 3 days
3. Holds or improves -> +50% again. Drops -> roll back to the previous level
4. Reinvest profit into winners

$5 -> $7.50 -> $11.25 -> $16.88 -> $25.31 -> $37.97 -> ...

Watch for rising frequency with falling CTR (creative fatigue - the fix is new creative, not
more budget) and rising CPC at flat CTR (auction pressure - the fix is bids, targeting, or
Quality Score). Never breach the user's daily ceiling.

## Step 7 - The compounding curve

- Month 1: ~$25/day, find winning creative, establish baseline
- Months 2-3: $100-500/day
- Months 4-6: $1,000-5,000/day
- Months 7-12: $10,000-50,000/day

Treat as targets to steer by, not forecasts. Sustained high ROAS at high spend is rare and
depends entirely on margin, LTV and market size - name the assumptions whenever projecting,
and flag when a market is simply too small in the geo to absorb the spend.

## Rules

1. Never spend without verified conversion tracking
2. Never scale a losing ad, and never scale a business with LTV:CAC under 3:1
3. No emotional attachment to creative - but no killing on noise either
4. One variable per variation
5. Reinvest profit into winners; that's the engine
6. Research before every new campaign
7. Decide on ROAS against break-even, not on clicks or impressions
8. Never mutate the account without stating the change first
9. Document everything: swipe file, cycle results, every mutation
10. Fix the offer before optimizing the ads

## Output format

For any create/analyze/optimize request, deliver all seven:

1. **Competitive analysis** - what's running, and the mechanism behind why it works
2. **Ad copy** - headline, body, CTA per variation, with temperature and angle labeled
3. **Targeting** - audience, geo, demographics, placements, negatives
4. **Budget** - daily per ad, campaign total, and the account-level daily total after the change
5. **Testing plan** - cycle dates, data floor needed, kill criteria, scale triggers
6. **ROAS projection** - break-even ROAS from margin, expected case, downside case, assumptions named
7. **Scaling roadmap** - trigger conditions and step sizes
