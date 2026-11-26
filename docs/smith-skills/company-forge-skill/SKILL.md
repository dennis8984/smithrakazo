# Company Forge — Autonomous LLC Formation Workflow

## Quick Reference

| Step | Name | Agent | Est. | Input? |
|------|------|-------|------|--------|
| 1 | Business Model Selection | chief | 5m | No |
| 2 | Company Name & Branding | scribe | 15m | No |
| 3 | Business Plan | scribe | 20m | No |
| 4 | Domain & Email Setup | clawed | 10m | No |
| 5 | Phone Number | dispatch | 5m | No |
| 6 | Website Deployment | clawed | 15m | No |
| 7 | Registered Address | ryder | 30m | Yes |
| 8 | Google Business Profile | clipper | 15m | No |
| 9 | LLC Filing | chief | 60m | Yes |
| 10 | EIN Application | chief | 30m | No |
| 11 | Mercury Bank Account | chief | 60m | No |
| 12 | Lili Bank Account | ryder | 45m | No |
| 13 | Stripe Account | chief | 30m | No |
| 14 | Additional Payment Processors | ryder | 60m | No |
| 15 | Final Review & Handoff | chief | 15m | No |

## Fee

**$5,000 one-time** per formation session. Payment collected via Stripe PaymentIntent before execution begins.

## Execution Flow

1. User creates session from dashboard with principal name, LLC state, and business category
2. User pays $5,000 via Stripe
3. Webhook confirms payment → session status moves to "paid"
4. User clicks "Start" → status moves to "in_progress", Step 1 begins
5. Each step is executed by its assigned agent via CRM bridge actions
6. Steps 7 and 9 pause with "awaiting_input" status until user provides data
7. On step completion, session output fields are populated (companyName, domainName, etc.)
8. Step 15 compiles all credentials into a handoff document
9. Session marked "completed"

## CRM Bridge Actions

All actions require the `company-forge-skill` subscription to be active.

### forge_create_session
Creates a new formation session.
```smith-action
forge_create_session
organizationId: {{org_id}}
principalName: John Smith
llcState: DE
businessCategory: Technology Consulting
```

### forge_execute_step
Marks a step as in_progress and begins execution.
```smith-action
forge_execute_step
sessionId: {{session_id}}
stepNumber: 1
organizationId: {{org_id}}
```

### forge_get_session
Retrieves session details with all steps.
```smith-action
forge_get_session
sessionId: {{session_id}}
organizationId: {{org_id}}
```

### forge_update_step
Completes or fails a step with output data.
```smith-action
forge_update_step
sessionId: {{session_id}}
stepNumber: 2
status: completed
output: {"companyName": "Smith Consulting LLC", "tagline": "Expert guidance for growing businesses"}
organizationId: {{org_id}}
```

### forge_log
Adds a log entry for a step.
```smith-action
forge_log
stepId: {{step_id}}
sessionId: {{session_id}}
message: Domain smithconsulting.com registered successfully
level: success
```

## Agent Routing

| Agent | Steps | Specialty |
|-------|-------|-----------|
| chief | 1, 9, 10, 11, 13, 15 | Strategy, legal, financial |
| scribe | 2, 3 | Branding, content, business plans |
| clawed | 4, 6 | Technical: domains, websites |
| dispatch | 5 | Communications: phone setup |
| ryder | 7, 12, 14 | Operations: addresses, banking |
| clipper | 8 | Marketing: Google Business |

## Security Notes

- SSN and sensitive data are NEVER stored in step output. Step 9 only records confirmation that SSN was provided.
- Bank account credentials are stored as account IDs only, not passwords or tokens.
- The handoff document is generated with secure credential references, not raw secrets.
