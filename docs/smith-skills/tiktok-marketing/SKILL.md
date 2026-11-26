# Social Slideshow Marketing

Automate your entire slideshow marketing pipeline across TikTok, X/Twitter, Instagram Reels, YouTube Shorts, and 28+ platforms: research competitors → generate AI images → add text overlays → post via Postiz → track analytics → iterate based on data.

**Proven results:** 7 million views on viral content, 1M+ TikTok views, $670/month MRR — all from an AI agent running automated slideshow campaigns. Same content, every platform, one pipeline.

## Prerequisites

This skill does NOT bundle dependencies. Chief will research and install the following based on your setup.

### Required

* **Node.js** (v18+) — all scripts run on Node.
* **node-canvas** (`npm install canvas`) — used for adding text overlays to slide images. Native module that may need build tools (Python, make, C++ compiler).
* **Postiz** — backbone of the posting and analytics system. Handles posting to TikTok (and 28+ other platforms) and provides the analytics API that powers the daily feedback loop. Without Postiz, the agent can post but can't track what's working. Sign up at [postiz.com](https://postiz.com).

### Image Generation (pick one)

* **Smith Studio** (`studio`, default) — built into Smith. No API key: images render through Smith and bill the org's credits (~23 credits per image, so ~140 per 6-slide post). Portrait 9:16. Recommended.
* **Stability AI** — Stable Diffusion XL and newer. Needs a Stability AI API key. Good for stylized/artistic images.
* **Replicate** — run any open-source model (Flux, SDXL, etc.). Needs a Replicate API token. Most flexible.
* **Local** — bring your own images. No API needed. Place images in the output directory and the script skips generation.

### Conversion Tracking (optional but recommended)

For mobile apps, connect your subscription/payment analytics (RevenueCat, Stripe, etc.) to close the full feedback loop — know which posts drive paying users, not just views.

### Cross-Posting (optional, recommended)

Postiz supports cross-posting to Instagram Reels, YouTube Shorts, Threads, Facebook, LinkedIn, and 20+ more platforms simultaneously.

---

## CRM Integration

This skill integrates with Smith's CRM pipeline. Every TikTok campaign is tracked as marketing activity:

- New leads from TikTok bio links auto-create contacts + deals via existing form/chat capture
- Campaign performance is logged as contact activities
- Chief reports TikTok metrics alongside pipeline data: "Your TikTok campaign drove 340 profile visits → 47 form submissions → 12 qualified leads → 3 deals won"

### Chief Tools (CRM Bridge)

```
smith-action:create_tiktok_campaign
{"appName": "MyApp", "niche": "home-design", "postingSchedule": ["07:30", "16:30", "21:00"]}
/smith-action
```

```
smith-action:generate_tiktok_slideshow
{"campaignId": "camp_123", "hook": "My landlord said I can't change anything", "slideCount": 6}
/smith-action
```

```
smith-action:get_tiktok_analytics
{"days": 7}
/smith-action
```

```
smith-action:run_tiktok_daily_report
{"days": 3}
/smith-action
```

```
smith-action:run_competitor_research
{"niche": "interior design app", "platform": "tiktok"}
/smith-action
```

---

## First Run — Onboarding

When this skill is first loaded, start a conversation with the user. Don't dump a checklist — talk to them like a marketing partner. Ask one or two things at a time. React to their answers.

**Use `scripts/onboarding.js --validate` at the end to confirm the config is complete.**

### Phase 0: TikTok Account Warmup (CRITICAL)

Check if the user already has a TikTok account with posting history. If creating a fresh account, they MUST warm it up first.

> "Quick question — do you already have a TikTok account you've been using, or are we starting fresh? If it's new, we need to warm it up first. TikTok's algorithm watches how new accounts behave, and if you go straight to posting AI slideshows, it flags you as a bot and kills your reach."

**If the account is new or barely used, walk them through 7-14 days of warmup:**

* Scroll the For You page naturally — 30-60 minutes a day
* Like sparingly (1 in 10 videos). Don't like everything — that's bot behaviour
* Follow accounts in their niche
* Watch niche content intentionally to train the algorithm
* Leave a few genuine comments
* Maybe post 1-2 casual, non-promotional videos

**The signal:** When almost every video on their For You page is in their niche, the account is warmed up.

**If account is already active and established,** skip to Phase 1.

### Phase 1: Get to Know Their App/Product

Start casual:

> "Hey! Let's get your TikTok marketing set up. First — tell me about your app/product. What's it called, what does it do?"

Then follow up naturally based on their answers:
* What it does → who it's for → what problem it solves → what makes it different
* Get the App Store / website link
* Determine category (home/beauty/fitness/productivity/food/other)
* Ask about monetization model (subscriptions, one-time purchase, service, physical product)

Store everything in `tiktok-marketing/app-profile.json`.

### Phase 2: Competitor Research (Requires Browser Permission)

> "Before we start creating content, I want to research what your competitors are doing on TikTok — what's getting views, what hooks they're using. Can I use the browser to look around?"

**Wait for permission.** Then:

1. Search TikTok for the app's niche
2. Find 3-5 competitor accounts
3. Analyze top-performing content: hooks, slide format, views, posting frequency, CTAs, trending sounds
4. Check App Store for competitor apps
5. Compile findings into `tiktok-marketing/competitor-research.json`
6. Share findings conversationally with the user

### Phase 3: Content Format & Image Generation

> "Do you want slideshows or video? Slideshows are what this skill is built around — TikTok data shows they get 2.9x more comments and 2.6x more shares than video."

**For slideshows (recommended), set up image generation:**

> "I'd use Smith Studio — it's built in, needs no API key, and bills your Smith credits (about 23 credits per image). Stability AI or Replicate work too if you already have a key."

**Then work through image style with the user:**
* What's the subject? Rooms? Faces? Products? Before/after?
* What vibe? Cozy? Clean? Luxurious?
* Consistency — should all 6 slides look like the same place/person?
* Must-have elements?

Build the base prompt WITH them. A good base prompt:

```
iPhone photo of a [specific room/scene], [specific style], [specific details].
Realistic lighting, natural colors, taken on iPhone 15 Pro.
No text, no watermarks, no logos.
[Consistency anchors: "same window on left wall", "same grey sofa"]
```

**Key prompt rules:**
* "iPhone photo" + "realistic lighting" = looks real, not AI-generated
* Lock architecture/layout in EVERY slide prompt
* Include everyday objects (mugs, remotes) for lived-in feel
* Portrait orientation (1024x1536) always — this is TikTok
* Extremely specific > vague

**NEVER use generic prompts** like "a nice living room" — they produce generic images that get scrolled past.

### Phase 4: Postiz Setup

> "We need Postiz to handle posting and analytics. It's what lets me track every post's performance and tell you exactly which hooks are driving views."

Walk through:
1. Sign up at [postiz.com](https://postiz.com)
2. Connect TikTok — Integrations → Add TikTok → Authorize
3. Note the TikTok integration ID
4. Get the API key — Settings → API → copy
5. (Optional) Connect Instagram, YouTube Shorts, Threads

Explain the draft workflow:

> "Posts go to your TikTok inbox as drafts. Before publishing, add a trending sound from TikTok's library. Music is the single biggest factor in reach — silent slideshows get buried."

**Don't move on until Postiz is connected and the API key works.**

### Phase 5: Conversion Tracking (Optional)

If they have a mobile app with subscription tracking (RevenueCat, Stripe, etc.):

> "With Postiz, I can track which posts get views. But views alone don't pay the bills — we need to know which posts drive paying subscribers. If you connect your subscription analytics, I can distinguish between a viral post that makes no money and a modest post that actually converts."

This completes the intelligence loop:
* **High views + High conversions** → Scale it
* **High views + Low conversions** → Hook works, CTA broken
* **Low views + High conversions** → Content converts, fix the hook
* **Low views + Low conversions** → Full reset

### Phase 6: Content Strategy

Using competitor research + app profile, present:
1. 3-5 hook ideas tailored to their niche
2. Posting schedule (default: 7:30am, 4:30pm, 9pm)
3. Which hook categories to test first
4. Cross-posting plan

Save to `tiktok-marketing/strategy.json`.

### Phase 7: Daily Analytics Cron

Set up daily cron:

```
Schedule: daily at 07:00 (user's timezone)
Task: Run scripts/daily-report.js --config tiktok-marketing/config.json --days 3
Output: tiktok-marketing/reports/YYYY-MM-DD.md + message to user
```

### Phase 8: Save Config & First Post

Store everything in `tiktok-marketing/config.json`:

```json
{
  "app": {
    "name": "AppName",
    "description": "Detailed description",
    "audience": "Target demographic",
    "problem": "Pain point it solves",
    "differentiator": "What makes it unique",
    "appStoreUrl": "https://...",
    "category": "home|beauty|fitness|productivity|food|other",
    "isMobileApp": true
  },
  "imageGen": {
    "provider": "studio",
    "basePrompt": "iPhone photo of a ..."
  },
  "postiz": {
    "apiKey": "your-postiz-key",
    "integrationIds": {
      "tiktok": "id-here",
      "instagram": "id-here-optional",
      "youtube": "id-here-optional"
    }
  },
  "conversionTracking": {
    "enabled": false,
    "provider": "revenuecat|stripe|custom",
    "apiKey": "",
    "projectId": ""
  },
  "posting": {
    "privacyLevel": "SELF_ONLY",
    "schedule": ["07:30", "16:30", "21:00"],
    "crossPost": ["instagram", "youtube"]
  },
  "competitors": "tiktok-marketing/competitor-research.json",
  "strategy": "tiktok-marketing/strategy.json"
}
```

Generate the **first test slideshow** — set expectations:

> "Let's create our first slideshow. This is a TEST — we're dialing in the image style, not posting yet."

The refinement process takes 2-5 rounds. Only start posting once images consistently look good.

---

## Core Workflow

### 1. Generate Slideshow Images

```bash
node scripts/generate-slides.js --config tiktok-marketing/config.json --output tiktok-marketing/posts/YYYY-MM-DD-HHmm/ --prompts prompts.json
```

Auto-routes to correct provider based on config. Supports Smith Studio (default), Stability AI, Replicate, or local images. Older configs with `"provider": "openai"` also render through Studio: containers never call a model provider directly.

**⚠️ Timeout warning:** 6 images takes 3-9 minutes. Set exec timeout to at least 600 seconds. The script supports resume — re-run and completed slides are skipped.

**Critical image rules:**
* ALWAYS portrait (9:16; 1024x1536 on Stability/Replicate) — fills TikTok screen
* Include "iPhone photo" and "realistic lighting" in prompts
* ALL 6 slides share the EXACT same base description
* Lock key elements across all slides
* See `references/slide-structure.md` for the 6-slide formula

### 2. Add Text Overlays

Uses `node-canvas` to render text directly onto slide images.

```bash
node scripts/add-text-overlay.js --dir tiktok-marketing/posts/YYYY-MM-DD-HHmm/ --texts texts.json
```

**Text overlay rules:**
* Dynamic font sizing: short text (≤5 words) = 7.5% width, medium (≤12) = 6.5%, long = 5%
* Thick black outline (15% of font size) for readability on any background
* Centered at ~28% from top — safe zone
* White fill, bold Arial
* Auto word-wrap at 75% width, manual `\n` breaks preferred

**Writing overlay text:**
* 4-6 words per line MAX
* Use `\n` to break lines for rhythm control
* 3-4 lines per slide ideal
* REACTIONS not labels — "Wait... this is nice??" not "Modern style"
* No emoji — canvas can't render them reliably
* Safe zones: no text in bottom 20% (TikTok controls) or top 10% (status bar)

**Good example (manual breaks):**
```json
[
  "I showed my landlord\nwhat AI thinks our\nkitchen should look like",
  "She said you can't\nchange anything\nchallenge accepted",
  "So I downloaded\nthis app and\ntook one photo",
  "Wait... is this\nactually the same\nkitchen??",
  "Okay I'm literally\nobsessed with\nthis one",
  "App name showed me\nwhat's possible\nlink in bio"
]
```

### 3. Post to TikTok

```bash
node scripts/post-to-tiktok.js --config tiktok-marketing/config.json --dir tiktok-marketing/posts/YYYY-MM-DD-HHmm/ --caption "caption" --title "title"
```

Posts go as **drafts (SELF_ONLY)**. User adds trending sound manually, then publishes. Cross-posts to connected platforms automatically via Postiz.

**Caption rules:** Long storytelling captions (3x more views). Structure: Hook → Problem → Discovery → What it does → Result → max 5 hashtags.

### 4. Connect Post Analytics

**⚠️ Wait at least 1-2 hours after publishing before connecting.** TikTok API has indexing delay.

```bash
node scripts/check-analytics.js --config tiktok-marketing/config.json --days 3 --connect
```

The script:
1. Fetches Postiz posts from last N days
2. Skips posts published <2 hours ago
3. Matches posts to TikTok videos chronologically (TikTok IDs are sequential)
4. Connects via Postiz API
5. Pulls per-post analytics

**⚠️ Known Issue:** Once a Postiz post is connected to a TikTok video ID, it cannot be changed. The 2-hour wait is non-negotiable.

---

## The Feedback Loop (CRITICAL)

This is what separates "posting TikToks" from "running a marketing machine."

### The Daily Cron

Every morning before the first post, runs `scripts/daily-report.js`:

1. Pulls last 3 days of posts from Postiz
2. Fetches per-post analytics
3. If conversion tracking connected, pulls conversion events (24-72h attribution)
4. Cross-references views with conversions
5. Applies diagnostic framework
6. Generates `tiktok-marketing/reports/YYYY-MM-DD.md`
7. Messages user with summary + suggested hooks for today

### The Diagnostic Framework

**High views + High conversions** → 🟢 SCALE IT
* Make 3 variations of the winning hook immediately
* Test different posting times
* Don't change the CTA

**High views + Low conversions** → 🟡 FIX THE CTA
* Hook is working. Try different CTAs on slide 6
* Check if app landing page matches the slideshow promise
* Test different caption structures

**Low views + High conversions** → 🟡 FIX THE HOOKS
* Content converts but nobody sees it
* Test radically different hooks
* Keep CTA and content structure identical

**Low views + Low conversions** → 🔴 FULL RESET
* Try completely different format or approach
* Research what's trending RIGHT NOW
* Test new hook categories from scratch

**High views + High downloads + Low paying** → 🔴 APP ISSUE
* Marketing works. App onboarding/paywall/pricing needs fixing.
* Pause posting and fix the app experience first.

### Hook Evolution

Track in `tiktok-marketing/hook-performance.json`:

```json
{
  "hooks": [
    {
      "postId": "postiz-id",
      "text": "My boyfriend said our flat looks like a catalogue",
      "date": "2026-02-15",
      "views": 45000,
      "likes": 1200,
      "comments": 45,
      "shares": 89,
      "conversions": 4,
      "cta": "Download App — link in bio",
      "lastChecked": "2026-02-16"
    }
  ],
  "ctas": [
    {
      "text": "Download [App] — link in bio",
      "timesUsed": 5,
      "totalViews": 120000,
      "totalConversions": 8,
      "conversionRate": 0.067
    }
  ],
  "rules": {
    "doubleDown": ["person-conflict-ai"],
    "testing": ["listicle", "pov-format"],
    "dropped": ["self-complaint", "price-comparison"]
  }
}
```

**Decision rules:**
* 50K+ views → DOUBLE DOWN — make 3 variations immediately
* 10K-50K → Good — keep in rotation
* 1K-10K → Try 1 more variation
* <1K twice → DROP — try something radically different

---

## Posting Schedule

Optimal times (adjust for audience timezone):
* **7:30 AM** — catch early scrollers
* **4:30 PM** — afternoon break
* **9:00 PM** — evening wind-down

3x/day minimum. Consistency beats sporadic viral hits. 100 posts beats 1 viral.

---

## Cross-Posting

Postiz supports simultaneous cross-posting. Recommend:
* **Instagram Reels** — strong for beauty/lifestyle/home
* **YouTube Shorts** — long-tail discovery
* **Threads** — lightweight engagement driver

Same slides, different algorithms, more surface area.

---

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| 1536x1024 (landscape) | Use 1024x1536 (portrait) |
| Font at 5% | Use 6.5% of width |
| Text at bottom | Position at 28% from top |
| Different rooms per slide | Lock architecture in EVERY prompt |
| Labels not reactions | "Wait this is nice??" not "Modern style" |
| Only tracking views | Track conversions — views without revenue = vanity |
| Same hooks forever | Iterate based on data weekly |
| No cross-posting | Post everywhere simultaneously via Postiz |
| Connecting release ID too soon | Wait 2+ hours — TikTok API indexing delay |
| `spawnSync ETIMEDOUT` | Exec timeout too short — use 10 minutes |
