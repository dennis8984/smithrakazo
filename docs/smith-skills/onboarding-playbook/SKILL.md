# Onboarding Playbook

Chief runs a structured onboarding sequence for new customers -- guiding them through setup milestones, scheduling check-ins, and ensuring successful activation within the first 30 days.

## Quick Reference

| Capability | Description |
|---|---|
| Welcome Sequence | Automated welcome tasks and introductory materials delivered on day one |
| Milestone Tracking | Monitor progress through onboarding checkpoints (setup, first use, integration, adoption) |
| Check-in Scheduling | Create timed follow-up tasks and calendar events at key intervals during onboarding |
| Risk Detection | Identify stalled onboarding journeys and escalate contacts who miss milestones |
| Activity Logging | Record every onboarding interaction and milestone completion as contact activities |
| Playbook Customization | Adapt the onboarding sequence based on deal size, product tier, and customer profile |

## How It Works

When a deal is marked as closed-won -- or when manually triggered for a specific contact -- Chief initiates the onboarding playbook. Chief evaluates the customer profile, deal context, and product tier to determine the appropriate onboarding track. A standard playbook includes welcome communication, account setup verification, product walkthrough scheduling, integration check-in, adoption review, and a 30-day health check. Chief creates the full task sequence upfront so the team has visibility into the entire onboarding timeline.

Jarvis executes the day-to-day onboarding operations. Each playbook step generates a CRM task with a due date, assigned owner, and clear completion criteria. Jarvis monitors task completion, logs activity against the contact record, and triggers the next step when a milestone is reached. If a task goes overdue -- a customer misses their setup session or fails to complete integration within the expected window -- Jarvis flags the risk and Chief decides whether to escalate, reassign, or adjust the timeline.

Dispatch handles the scheduling dimension. Check-in calls, training sessions, and review meetings are created as calendar events linked to the contact. Dispatch considers timezone, availability patterns, and the optimal spacing between touchpoints to avoid overwhelming new customers while maintaining momentum. The combination of task management (Jarvis), scheduling (Dispatch), and strategic oversight (Chief) ensures that onboarding runs predictably without requiring constant manual attention.

## CRM Integration

Execute the onboarding playbook for a newly closed customer:
```
smith-action:execute_onboarding_playbook
{"contactId": "contact_abc123"}
/smith-action
```

Create a specific onboarding task manually:
```
smith-action:create_task
{"title": "Schedule product walkthrough with Acme Corp", "description": "30-minute walkthrough of core features. Focus on pipeline management and reporting based on deal notes.", "dueDate": "2026-04-03", "priority": "high", "contactId": "contact_abc123"}
/smith-action
```

Log an onboarding milestone as an activity:
```
smith-action:create_activity
{"contactId": "contact_abc123", "type": "onboarding", "description": "Milestone: Account setup completed. Customer configured team members, connected email integration, and imported initial contact list (347 records)."}
/smith-action
```

Search for contacts currently in onboarding:
```
smith-action:search_contacts
{"query": "onboarding", "limit": 20}
/smith-action
```

## Agent Routing

**Primary agents:**

- **chief** (Executive) -- Owns the onboarding strategy. Chief selects the appropriate playbook track based on customer profile and deal context, monitors overall onboarding health across all active customers, and makes escalation decisions when milestones are missed.
- **jarvis** (Operations) -- Executes playbook steps. Jarvis creates tasks, tracks completion, logs activities, and manages the operational flow of each onboarding journey. Handles task reassignment and timeline adjustments when Chief approves changes.
- **dispatch** (Scheduling) -- Manages the calendar dimension. Dispatch schedules check-in calls, training sessions, and review meetings at optimal intervals, coordinating across timezones and availability.

**Delegation patterns:**

- chief delegates the full task creation sequence to jarvis at playbook initiation, retaining oversight of milestone completion and risk detection.
- jarvis delegates scheduling of meetings and calls to dispatch whenever a playbook step requires a calendar event.
- dispatch reports scheduling conflicts or unavailability back to jarvis, who adjusts the timeline and notifies chief if the change affects the overall onboarding trajectory.
- When a customer is at risk (missed milestones, unresponsive), chief may delegate outreach drafting to scribe or escalation communication to postmaster.

## Triggers

| Trigger | Behavior |
|---|---|
| `deal_won` | Automatically initiates the onboarding playbook when a deal moves to closed-won |
| `manual` | User or agent explicitly starts onboarding for a contact via `execute_onboarding_playbook` |

## Best Practices

- Link onboarding tasks to the contact record using `contactId` so the full onboarding journey is visible in the contact's activity timeline. Tasks without contact associations become orphaned and invisible to the playbook tracker.
- Set realistic due dates that account for customer response times. A 48-hour window for setup tasks and 1-week intervals between major milestones works well for most B2B onboarding flows.
- Log every meaningful interaction as an activity -- not just milestone completions but also customer questions, support requests, and feedback. This history informs future onboarding improvements and gives any agent reviewing the contact full context.
- Use task priority to signal urgency. Reserve "high" for time-sensitive milestones (integration deadlines, trial-to-paid conversion windows) and "medium" for standard checkpoints.
- Monitor the onboarding pipeline regularly. Contacts stuck at early milestones for more than 7 days should be flagged for direct outreach -- early engagement is the strongest predictor of long-term retention.
- This is a free skill included with all plans. Activate it early to establish onboarding discipline before scaling your customer base.
