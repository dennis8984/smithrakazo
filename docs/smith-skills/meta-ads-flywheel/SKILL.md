---
name: meta-ads-flywheel
description: Paid-ads operator for Facebook and Instagram. Use this whenever the user mentions Meta ads, Facebook ads, Instagram ads, Reels ads, the Ad Library, UGC ads, ad creative testing, ROAS, or asks to research competitors' ads, build ads that convert, A/B test creative, or scale a winning ad - even if they don't say "flywheel". Researches the Meta Ad Library for the strongest competitor ads, extracts their structural DNA, produces original creative with Smith's UGC/studio tools, runs test cycles, pauses losers on evidence, and compounds budget into winners.
user-invocable: true
---

# Meta Ads Flywheel

A paid-advertising operating system for Facebook and Instagram. Research what has kept
running, capture its structure, rebuild it originally with the org's own product and Smith's
own creative tools, test cheap, cut on evidence, compound budget into proven winners.

Direct-response practice in the tradition of Alex Hormozi (offer construction, value
equation, unit economics) and Russell Brunson (funnels, hook/story/offer, value ladders).
Apply the methods; do not write in their names or attribute quotes to them.

## The validator is the authority, not this file

Every proposal is re-checked server-side before anything reaches Meta. The validator will
refuse a proposal that breaks the rules below even if you are certain. Proposing something
it rejects costs the org a cycle, so read the thresholds carefully — several of them differ
from what general paid-ads advice will tell you.

## Reference files - load these, don't improvise

| File                                          | Load when                                                                               |
| --------------------------------------------- | --------------------------------------------------------------------------------------- |
| `{baseDir}/references/offer-frameworks.md`    | Building or auditing any offer, writing any ad, any pricing or LTV/CAC question         |
| `{baseDir}/references/funnel-frameworks.md`   | Mapping the funnel, choosing traffic temperature, structuring hook/story/offer          |
| `{baseDir}/references/creative-dna.md`        | Research, DNA capture, recomposition rules, ad formats, creative briefs, policy lint    |
| `/home/node/.openclaw/workspace/BANNER-CREATIVE-SYSTEM.md` | Any static banner or paid-media still. Five angles, ratios, and overlay copy. Image Designer renders it |
| `{baseDir}/references/meta-ads-operations.md` | Any read from or write to a Meta ad account, metrics, learning phase, scaling mechanics |
| `{baseDir}/references/swipe-file.md`          | Template - competitor ad log                                                            |
| `{baseDir}/references/meta-testing-log.md`    | Template - cycle results, creative diagnostics, mutation log                            |

## Tool check (do this first, once)

State plainly what is available, because it changes what this skill can promise:

- **Meta Flywheel tool active?** -> `meta_flywheel_*` actions exist: live metrics, proposals
  into the queue, creative registration. Check `meta_flywheel_list_accounts` for the
  account's **autonomy level** - in `supervised` every proposal waits for a click; in
  `autopilot` validator-passed pauses, budget steps, variation launches and duplications
  execute without one. Say which mode the account is in before proposing anything
- **Research provider configured?** -> `meta_flywheel_research` pulls the Ad Library through
  a paid extraction provider. Smith does **not** crawl the Ad Library directly. If the
  provider is down, research degrades to longevity-only ranking and the cycle says so
- **Creative tools live?** -> call `meta_flywheel_creative_brief`, then
  `check_available_services` for BYOK keys. TopView needs the org's key; Seedance and Studio
  run on Smith credits. If none are live, this skill produces briefs and copy only, and says so
- **Neither tool nor provider?** -> decision tables, briefs and exact steps; the user executes
  in Ads Manager. Say so rather than implying automation

## Activation

On **META_FLYWHEEL** or explicit invocation, ask and wait:

1. Product/service, and the geo it sells in?
2. Sector/niche, and the 3 closest competitors (names or Page URLs)?
3. Which Facebook Page and Instagram account will the ads run as?
4. Current monthly ad spend, and the daily ceiling you don't want crossed?
5. Target ROAS - and your gross margin, so break-even can be computed?
6. Average order value and how often a customer repeats?
7. Is the pixel / Conversions API firing a purchase or lead event **with value**?
8. Any existing retargeting or warm-audience ad sets that must not be touched?
9. Is this account selling **e-commerce** or **lead-gen**? It changes the cycle length.

Questions 5 and 6 are not optional. Without margin and repeat rate there is no LTV, no
break-even ROAS, and no honest basis for scaling. Question 7 decides whether ROAS exists at
all - without value data every decision degrades to cost-per-result, and the report must say
so on every cycle rather than showing a fabricated ROAS.

## Step 0 - Offer and funnel audit

Before any ad exists:

- Run the offer through the **Value Equation** and score all four terms
  (`offer-frameworks.md` §1). Fix the weakest before writing copy
- Build the **offer stack**, pick a **guarantee**, identify **real** scarcity (§2-4)
- Map the **value ladder** and choose which rung the ads point at - bait or frontend, almost
  never backend (`funnel-frameworks.md` §1)
- Confirm **follow-up exists** (§6). Meta clicks are cheap and cold; without an email/SMS
  sequence and a retargeting audience, scaling multiplies the leak. Fix it first
- Run the **economics gate** (`offer-frameworks.md` §6): LTV:CAC below 3:1 means don't scale
- Verify **conversion tracking** has value data and the landing page matches the offer

Report Step 0 findings before proceeding. A weak offer is worth more attention than any test
cycle - creative testing optimizes distribution, it does not fix a thing nobody wants.

## Step 1 - Competitive intelligence and DNA capture

Follow `creative-dna.md`. Research runs through `meta_flywheel_research`, which calls a paid
extraction provider - never a direct crawl, and never the political/issue dataset.

Rank each competitor ad on the composite the tool computes for you:

| Signal                                                  | Weight |
| ------------------------------------------------------- | ------ |
| Impression rank within the impressions-sorted set       | 3      |
| Longevity (days running; for inactive ads, end - start) | 3      |
| Cluster size ("N ads use this creative and text")       | 2      |
| Repetition across monthly pulls                         | 2      |
| Offer clarity (your 1-5 read)                           | 1      |

Excluded before scoring: ads carrying Meta's **Low Impression Count** badge, and inactive ads
that ran under 7 days (killed tests).

**Sorting by impressions is valid.** That changed in early 2026 and applies to all ads, not
just political ones. The number itself is usually not displayed for commercial ads, so the
sort _position_ is the signal, not a figure you can quote.

Never present any of this as measured performance. Say "ranks top-3 by impressions and has
run 94 days, which implies it pays for itself." Never "performs well."

For the top 5, extract a **DNA record** (schema in `creative-dna.md` §3).

Deliver: filled swipe file, 5 DNA records, 3 patterns to adapt, 1 unclaimed gap, and the
offer-strength read on the market (selling on price, speed, trust, or status?).

## Step 2 - Recompose and launch: 5 ads, 5 ad sets, $5/day

Five angles. Each states its traffic temperature, which of hook/story/offer it leads on, the
DNA record it follows, and the **format** (`creative-dna.md` §5):

| #   | Angle             | Default format                                  | Shape                                |
| --- | ----------------- | ----------------------------------------------- | ------------------------------------ |
| 1   | Direct response   | Static or 15s product demo                      | Offer in the first frame, one CTA    |
| 2   | Story             | UGC talking-head 9:16, 30-45s                   | Wall -> epiphany -> result -> CTA    |
| 3   | Social proof      | Testimonial / review-screenshot carousel or UGC | Specific numbers, named results      |
| 4   | Value-first       | UGC "3 things nobody tells you"                 | Bait offer, no-commitment entry      |
| 5   | Pattern interrupt | Text-heavy "ugly" static or contrarian UGC      | Bold specific claim, stops the thumb |

Every ad is **original**: the org's product, Smith-generated footage/avatars/statics, copy
written from the org's knowledge base and offer stack. The DNA gives the skeleton; nothing
from the competitor's ad is reused (`creative-dna.md` §4). Each creative is registered with
`meta_flywheel_register_creative` before it can be proposed for launch; the validator refuses
anything without provenance or with a failing policy lint.

Structure: **one ad per ad set, equal budgets** - never several test ads in one ad set, or
Meta's delivery optimizer decides the test for you. Placements: Facebook + Instagram feed,
Stories, Reels; render 9:16 and 4:5 (or 1:1) for every video. Advantage+ creative
enhancements off during tests.

Naming: `FLYWHEEL | META | C1 | A3-social-proof | V0` so insights filters and the log line up.

## Step 3-5 - The cycle

**Cycle length is per-account, not fixed.** E-commerce reads over 5 days and discounts the
last 3 for conversion lag. Lead-gen reads over 7 and discounts 5, because pipeline closes
slower. `meta_flywheel_list_accounts` reports the account's setting - use it, don't assume.

Each cycle:

1. Pull performance. The test clock for each ad starts at first impression, not at creation -
   review days are not test days
2. **Check for a tracking outage first.** Account-wide conversions at zero while spend and
   clicks continue is a pixel/CAPI problem, not five dead ads. Propose no pauses; say so
3. **Check the data floor, which depends on what the verdict rests on:**

   | Verdict rests on                                            | Floor                                                |
   | ----------------------------------------------------------- | ---------------------------------------------------- |
   | Hook rate, hold rate, CTR, CPC (`pauseBasis: upper_funnel`) | >= 1,000 impressions **and** >= 30 link clicks       |
   | CPA or ROAS (`pauseBasis: conversion`)                      | >= the account's conversion floor, **30 by default** |
   | A hook or hold verdict specifically                         | additionally >= 500 three-second plays               |

   **Three conversions is not enough to kill an ad on ROAS.** General advice will tell you
   otherwise; the validator will refuse it. Under the floor, extend the window or raise
   budget within the step cap - do not cut on noise

4. Run the **diagnostic ladder** on every ad (`meta-ads-operations.md` §4): hook rate -> hold
   rate -> CTR -> CPC -> CPM -> CVR -> CPA -> ROAS. The ladder tells you _which part_ of the
   ad failed, and therefore which variable to change next. Declare the broken rung on every
   pause - a kill with no diagnosis teaches nothing
5. Rank by ROAS, or by CPA when the account has no value data. Cut the clear losers, keep the
   top performers
6. Spawn variations per survivor - one each changing **hook (first 3 seconds)**,
   **visual/format**, **CTA**, **offer framing**, **audience/placement**. One variable per
   variation, always, and the variable is chosen by the diagnosis, not at random. Variations
   that change only text reuse the parent render; only hook and format changes need a new one
7. Relaunch at $5/day, new ad sets, same naming with `V1`, `V2`...

No ad survives past a cycle without data justifying it. No ad dies without data either.

## Step 6 - Scale winners

Once an ad clears target ROAS and the data floor:

1. **Vertical:** +20% ad set budget, one step, then hold 48 hours. Holds or improves -> +20%
   again. Drops -> roll back. Steps over 20% reset the learning phase and throw away the data
   you paid for - that is why this is not Google's +50%
2. **Horizontal:** when a winner needs to grow faster than +20%/48h, propose
   `DUPLICATE_ADSET` - a copy at the next budget level, or into a new audience / placement.
   The original keeps running untouched
3. Reinvest profit into winners

Watch for **rising frequency with falling CTR** (creative fatigue - the fix is a new
variation, not more budget; on Meta this arrives within 2-3 weeks at frequency > 3) and
**rising CPM at flat CTR** (auction pressure - the fix is audience, placement, or a broader
targeting test). Never breach the user's daily ceiling; in autopilot, never propose a step
that takes the account past 70% of it - the rest is the human's to approve.

## Step 7 - The compounding curve

Growth is governed by break-even ROAS, LTV:CAC and the ceiling, never by a revenue goal.
Sustained high ROAS at high spend depends entirely on margin, LTV, creative refresh rate and
market size - name the assumptions whenever projecting, and flag when a market is simply too
small in the geo to absorb the spend.

Realistic blended expectations, to steer by rather than promise: roughly 4-6x at $1k/day for
a strong offer, 3-4x at $10k/day, 2-3x at $100k/day as marginal ROAS compresses. Do not
promise a per-dollar return; compounding many accounts at a healthy multiple is the model.

## Rules

1. Never spend without verified conversion tracking - and never show ROAS without value data
2. Never scale a losing ad, and never scale a business with LTV:CAC under 3:1
3. No emotional attachment to creative - but no killing on noise either
4. One variable per variation, chosen by diagnosis
5. Reinvest profit into winners; that's the engine
6. Research before every new campaign; DNA, never copies
7. Decide on ROAS against break-even, not on clicks, likes, or impressions
8. Never mutate the account without stating the change first; in autopilot, state it as it
   executes
9. Document everything: swipe file, DNA records, cycle results, every mutation
10. Fix the offer before optimizing the ads
11. One ad per ad set in tests; equal budgets; enhancements off
12. Never touch protected (retargeting / warm) ad sets or special-ad-category accounts without
    approval
13. Budgets are in **minor units** (cents). Never micros - that is the Google module

## Output format

For any create/analyze/optimize request, deliver all eight:

1. **Competitive analysis** - what's running, how it ranks, and the mechanism behind why it works
2. **DNA sheet** - the records adapted, and what is changed from each so the ad is original
3. **Ad copy and creative briefs** - primary text, headline, CTA, format, ratio, hook (first
   3 seconds), per variation, with temperature and angle labeled, and which Smith tool renders it
4. **Targeting** - audience, geo, placements, protected exclusions, special-category check
5. **Budget** - daily per ad set, campaign total, and the account-level daily total after the change
6. **Testing plan** - cycle dates, data floor needed **and which basis it rests on**, kill
   criteria, diagnostic ladder, scale triggers
7. **ROAS projection** - break-even from margin, expected case, downside case, assumptions named
8. **Scaling roadmap** - vertical and horizontal trigger conditions, step sizes, fatigue refresh cadence
