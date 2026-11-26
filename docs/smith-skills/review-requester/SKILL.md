# Review Requester

Chief automatically sends review requests to happy customers after deal close -- timing outreach for maximum response rates and tracking review status across your customer base.

## Quick Reference

| Capability | Description |
|---|---|
| Timed Review Requests | Send personalized review requests at optimal intervals after deal close or onboarding completion |
| Status Tracking | Monitor which customers have been asked, who responded, and who needs a follow-up |
| Personalized Messaging | Draft review request emails tailored to the customer's experience, deal context, and product usage |
| Follow-Up Sequences | Automated gentle reminders for customers who haven't responded to the initial request |
| Sentiment Pre-Screening | Evaluate customer health signals before requesting a review to avoid asking unhappy customers |
| Multi-Platform Support | Direct customers to the review platform most relevant to your business (Google, G2, Capterra, etc.) |

## How It Works

The Review Requester activates when a deal moves to closed-won or when manually triggered for a specific contact. Chief first evaluates the customer's health signals -- recent support tickets, onboarding completion status, and interaction sentiment -- to determine whether the timing is appropriate for a review request. Customers with open support issues, incomplete onboarding, or negative recent interactions are deferred to a later date rather than risked with a poorly timed ask.

For customers who pass the health check, Chief delegates the outreach to Postmaster. Postmaster drafts a personalized review request that references the customer's specific experience -- the product they purchased, the problem it solved, and any positive interactions logged in the CRM. The message includes a direct link to the preferred review platform and is timed to arrive during the customer's optimal engagement window. If the initial request goes unanswered, Postmaster schedules one follow-up reminder at 7 days with a softer tone and an alternative call to action (such as a brief survey instead of a full review).

Chief maintains a review tracking task for each customer. When a review request is sent, an activity is logged and a follow-up task is created. When a review is confirmed (either via manual update or webhook), the task is marked complete and the contact record is updated. This gives the team clear visibility into review coverage -- how many customers have been asked, how many have responded, and where gaps remain. Over time, the pattern of successful review requests informs the timing and messaging strategy for future asks.

## CRM Integration

Send a review request to a recently closed customer:
```
smith-action:send_review_request
{"contactId": "contact_abc123"}
/smith-action
```

Check the review status for a customer:
```
smith-action:check_review_status
{"contactId": "contact_abc123"}
/smith-action
```

Search for customers eligible for review requests:
```
smith-action:search_contacts
{"query": "closed-won", "limit": 20}
/smith-action
```

Create a follow-up task for a pending review:
```
smith-action:create_task
{"title": "Follow up on review request - Acme Corp", "description": "Initial review request sent 7 days ago, no response. Send gentle reminder with alternative CTA (quick survey).", "dueDate": "2026-04-10", "priority": "medium", "contactId": "contact_abc123"}
/smith-action
```

Log review request activity:
```
smith-action:create_activity
{"contactId": "contact_abc123", "type": "review_request", "description": "Review request sent via email. Platform: Google Business. Customer health check passed -- no open tickets, onboarding complete, positive sentiment in last 3 interactions."}
/smith-action
```

## Agent Routing

**Primary agents:**

- **chief** (Executive) -- Owns the review strategy. Chief decides when and whether to request a review based on customer health signals, approves outreach messaging, and tracks review coverage metrics across the customer base. Chief determines the review platform priority and manages the overall cadence.
- **postmaster** (Email) -- Handles delivery and follow-up. Postmaster drafts personalized review request emails, schedules sends at optimal times, manages follow-up reminders for non-responders, and reports delivery metrics back to Chief.

**Delegation patterns:**

- chief delegates outreach execution to postmaster after approving the customer health check and timing.
- postmaster reports delivery and response status back to chief, who decides whether to schedule follow-ups or close the review request cycle.
- When a review request requires a personalized draft beyond the standard template, chief delegates writing to scribe before handing to postmaster for delivery.
- For customers flagged as unhappy during the health check, chief may delegate a resolution task to jarvis before revisiting the review request at a later date.

## Triggers

| Trigger | Behavior |
|---|---|
| `deal_won` | Automatically initiates a review request workflow when a deal moves to closed-won (with a configurable delay) |
| `manual` | User or agent explicitly sends a review request via `send_review_request` or checks status via `check_review_status` |

## Best Practices

- Wait at least 7-14 days after deal close before sending the first review request. Customers need time to experience the product before they can write a meaningful review. Premature asks produce low-quality reviews or go ignored.
- Never request reviews from customers with open support tickets or unresolved complaints. The sentiment pre-screening exists for a reason -- a negative review prompted by a poorly timed ask is worse than no review at all.
- Limit follow-up reminders to one per customer. A single gentle reminder at 7 days is effective; multiple follow-ups feel pushy and damage the customer relationship.
- Personalize the review request with specific details from the deal. Generic "please leave a review" messages convert at a fraction of the rate compared to messages that reference the customer's specific purchase, use case, or success milestone.
- Track review completion rates over time. If response rates drop below 10%, review the timing, messaging, and platform selection -- one of these factors is likely misaligned with your customer base.
- Combine Review Requester with Onboarding Playbook. Customers who complete onboarding successfully are the ideal review candidates -- they have used the product enough to provide substantive feedback and their positive momentum increases response likelihood.
