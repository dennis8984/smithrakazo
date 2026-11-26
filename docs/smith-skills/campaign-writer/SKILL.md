# Campaign Writer

Chief drafts multi-step email campaigns -- subject lines, body copy, and A/B variants -- generating complete sequences aligned to your marketing goals and audience segments.

## Quick Reference

| Capability | Description |
|---|---|
| Sequence Generation | Create multi-step email campaigns with configurable step count, timing, and goals |
| Subject Line Crafting | Generate high-converting subject lines with A/B variants for split testing |
| Body Copy Writing | Draft persuasive email body content tailored to audience segments and campaign objectives |
| A/B Testing | Run split tests on subject lines, body copy, or send times to optimize campaign performance |
| Audience Segmentation | Target campaigns to specific subscriber segments based on tags, behavior, or attributes |
| Tone Matching | Adapt writing style to match brand voice, industry norms, and audience expectations |

## How It Works

When a campaign is requested -- either manually by a user or triggered by a sequence enrollment event -- Chief analyzes the campaign goal and audience to develop a messaging strategy. Chief determines the optimal number of steps, spacing between emails, and the narrative arc of the sequence (awareness, education, social proof, urgency, close). This strategy is then delegated to Scribe for execution.

Scribe writes each email in the sequence, producing subject lines, preview text, and full body copy. For each step, Scribe generates two to three subject line variants suitable for A/B testing. The body copy follows the strategic arc defined by Chief -- early emails focus on problem awareness and education, middle emails deliver case studies and social proof, and closing emails introduce urgency and clear calls to action. Scribe pulls subscriber list context from the newsletter system to understand audience size and segment characteristics.

Once drafts are complete, Postmaster handles delivery logistics. Postmaster reviews send timing, checks subscriber segments, and validates that email content passes basic deliverability checks (link density, spam trigger words, text-to-HTML ratio). When an A/B test is requested, Postmaster configures the split -- allocating a test percentage of the audience to each variant, defining the winning metric (open rate or click rate), and scheduling the winner send to the remaining audience after the test window closes.

## CRM Integration

Generate a complete email sequence for a product launch:
```
smith-action:generate_campaign_sequence
{"goal": "Drive signups for the new Enterprise tier launch", "audienceSegment": "active-trial-users", "steps": 5}
/smith-action
```

Generate a campaign with default settings (Chief determines step count and audience):
```
smith-action:generate_campaign_sequence
{"goal": "Re-engage churned subscribers from Q4 with new feature announcements"}
/smith-action
```

Run an A/B test on an existing campaign:
```
smith-action:run_ab_test
{"campaignId": "campaign_xyz789"}
/smith-action
```

List existing campaigns to avoid duplication:
```
smith-action:list_newsletter_campaigns
{"limit": 10}
/smith-action
```

Check subscriber counts for audience targeting:
```
smith-action:list_newsletter_subscribers
{"limit": 50}
/smith-action
```

## Agent Routing

**Primary agents:**

- **chief** (Executive) -- Owns campaign strategy. Chief defines the messaging arc, determines audience targeting, sets success metrics, and reviews final drafts before they enter the send queue. Chief also decides when an A/B test is warranted based on audience size and campaign importance.
- **scribe** (Content) -- Executes the writing. Scribe produces subject lines, preview text, and body copy for every step in the sequence. Generates A/B variants and adapts tone to match the brand voice and audience segment.
- **postmaster** (Email) -- Manages delivery and testing. Postmaster validates email content for deliverability, configures A/B test splits, schedules sends, and monitors open and click metrics during test windows.

**Delegation patterns:**

- chief delegates the full writing workload to scribe after defining strategy, retaining final review authority over completed drafts.
- scribe delivers completed drafts back to chief for approval, then chief hands approved sequences to postmaster for scheduling.
- postmaster reports A/B test results back to chief, who decides whether to adjust the campaign strategy or proceed with the winning variant.
- For campaigns tied to pipeline events (deal stage changes, sequence enrollments), chief coordinates with jarvis to ensure CRM triggers fire correctly.

## Triggers

| Trigger | Behavior |
|---|---|
| `manual` | User or agent explicitly requests campaign generation via `generate_campaign_sequence` |
| `sequence_enrolled` | Automatically drafts a campaign when a contact is enrolled in an email sequence that lacks content |

## Best Practices

- Always specify a clear goal when generating campaigns. Vague goals like "send emails" produce generic copy. Specific goals like "convert trial users to paid within 14 days" produce focused, high-converting sequences.
- Use the `audienceSegment` parameter to target specific subscriber groups. Campaigns sent to the full list without segmentation typically underperform segmented sends by 30-50% on engagement metrics.
- Let Chief determine step count when unsure. The AI considers the goal complexity, audience temperature, and typical conversion timelines to recommend an appropriate sequence length.
- Run A/B tests on campaigns sent to audiences of 500+ subscribers. Smaller audiences produce statistically insignificant results that can mislead optimization decisions.
- Review AI-generated copy before sending. While Scribe produces publication-ready drafts, brand-specific details (pricing, feature names, legal disclaimers) should be verified by a human.
- Combine Campaign Writer with Lead Researcher for personalized outreach. Enriched contact data enables Scribe to reference company-specific details, recent events, and industry context in email copy.
